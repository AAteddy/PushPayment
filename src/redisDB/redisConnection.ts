import { Redis, RedisOptions, Cluster, ClusterNode } from "ioredis";
import dotenv from "dotenv";
import utils from "../lib/utils/utils";
import initConfig from "../config";

dotenv.config();

let redisClient: Redis | Cluster;

export const connectRedis = async () => {
  const config = await initConfig();

  // Return if already connected
  if (redisClient && redisClient.status === "ready") return;

  try {
    console.log(`***** Connecting to Redis **** On ${process.env.NODE_ENV}`);

    const redisMode = (config._VALS.REDIS_MODE || "docker").toLowerCase();
    const env = process.env.NODE_ENV || "";


    // Helper to decode basic auth if needed
    const getCredentials = () => {
      const _cipherauth = utils.getcipherauth(config._VALS.REDIS_BASICAUTH);
      const _token = utils.decrypt(_cipherauth.cipher, _cipherauth.auth);
      const auth = Buffer.from(_token, "base64").toString();
      const [username, ...rest] = auth.split(":");
      return { username, password: rest.join(":") };
    };

    
    if (redisMode === "cluster") {
      // -------- Production  Redis Cluster -----------
      const clusterMasters = String(config._VALS.REDIS_HOST)
        .split(",") // e.g., "10.224.222.40,10.224.222.13,10.224.222.49"
        .map((host) => ({ host, port: Number(config._VALS.REDIS_PORT) || 6379 }));

      console.log("Connecting in Cluster mode:", clusterMasters);

      console.log("redis password--->>", config._VALS.REDIS_PASSWORD || "")

      redisClient = new Cluster(clusterMasters, {
        redisOptions: {
          password: config._VALS.REDIS_PASSWORD || "",
          maxRetriesPerRequest: 3,
        },
        clusterRetryStrategy: (times) => Math.min(times * 200, 2000),
      });

    } else if (redisMode === "sentinel") {
      // -------- Sentinel Mode (Only if you really use it) ----------
      const ipparts = String(config._VALS.REDIS_HOST).split(",");
      const sentinelhosts = ipparts.map((_host) => ({
        host: _host,
        port: Number(config._VALS.REDIS_PORT),
      }));

      const { username, password } = getCredentials();

      if (["uat", "dev"].includes(env)) {
        // UAT/DEV Single Node
        redisClient = new Redis({
          host: sentinelhosts[0].host,
          port: Number(config._VALS.REDIS_PORT),
          password: config._VALS.REDIS_PASSWORD || password,
        });
      } else {
        // Sentinel Production
        redisClient = new Redis({
          sentinels: sentinelhosts,
          name: username, // usually "mymaster"
          password: config._VALS.REDIS_PASSWORD || password,
        });
      }

    } else {
      // -------- Local Docker / Standalone -----------
      const isRunningInDocker = !!process.env.DOCKER_ENV;
      redisClient = new Redis({
        host: isRunningInDocker ? "ussd_redis" : process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || "",
        maxRetriesPerRequest: 3,
        retryStrategy: (times) => {
          if (times <= 3) {
            console.log(`Retrying Redis connection (attempt ${times + 1})`);
            return Math.min(times * 100, 2000); // Exponential backoff
          }
          return null; // Stop retrying
        },
      });
    }

    // ---------------- Events -------------------
    redisClient.on("connect", () => {
      console.log(
        `** Successfully connected to Redis (${redisMode}) on ${env} Environment *****`
      );
    });

    redisClient.on("error", (err: any) => {
      console.error(
        `** Redis connection error (${redisMode}) on ${env} Environment: `,
        err
      );
    });

    // Optional: Ping only for standalone / cluster (cluster supports ping on any node)
    try {
      const pong = await (redisClient as any).ping?.();
      if (pong && pong !== "PONG") {
        throw new Error("Redis connection failed to respond to PING");
      }
    } catch (err) {
      console.warn("Redis ping skipped or failed (cluster may handle internally):", err.message);
    }
  } catch (err) {
    console.error(
      `** Redis connection failed on ${process.env.NODE_ENV}: `,
      err
    );
    throw new Error("Redis connection failed");
  }
};

export default connectRedis;