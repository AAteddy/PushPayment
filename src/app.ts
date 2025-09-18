declare global {
  var _CONFIG: TopLevelConfig;
}

import express, { Request, Response, NextFunction, Express } from "express";
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import timeout from "connect-timeout";
import chalk from "chalk";

import { TopLevelConfig } from "./config/types/config";
import initConfig from "./config";

import router from './api/index';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(timeout("10s"));
app.use((err: any, req: any, res:any, next: any) => {
  if (err.code === 'ETIMEDOUT' && req.timedout) {
    return res.status(500).json({
      status: 500,
      message: 'request timeout',
    });
  }
  next(err); // pass other errors along
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, access-control-allow-origin, x-api-applicationid, authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  next();
});

// Routes
router(app);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  return res.status(500).json({ message: err.message });
});

const initApp = async () => {
  try {
    const _CONFIG: TopLevelConfig = await initConfig();
    global._CONFIG = _CONFIG;

    app.listen(_CONFIG._VALS.PORT, function connectionListener() {
      console.log(
        chalk.blue.italic(
          `Hi there! I'm listening on port ${_CONFIG._VALS.PORT} in `
        )
      );
    });

    if (global._CONFIG.NODE_ENV === "production") {
      console.log = function () {};
    }
    // try {
    //   await initializeKafka("chatbirr-notification");
    //   void fetchCurrency();
    // } catch (err) {
    //   console.error(
    //     "Failed to initialize Kafka for chatbirr-notification:",
    //     err
    //   );
    // }

    // void connectRedis();

    // try {
    //   await initializeKafka("budget-expense");
    // } catch (err) {
    //   console.error("Failed to initialize Kafka for budget-expense:", err);
    // }
  } catch (err) {
    console.error("Failed to load configuration and start the server:", err);
    process.exit(1); // Exit the process with an error code
  }
};

initApp();

export default app;

