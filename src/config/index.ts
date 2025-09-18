// const env = process.env.NODE_ENV ?? 'development'
import dotenv from "dotenv";
dotenv.config();

import vault from "node-vault";
import { TopLevelConfig, Vals } from "./types/config";
import path from "node:path";

const vaultClient = vault({
  apiVersion: "v1",
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN,
});

async function loadConfig() {
  try {
    const result = await vaultClient.read(
      process.env.VAULT_PATH_STAGING as string
    );
    // console.log("result ", result.data.data);

    return result.data.data;
  } catch (error) {
    console.error("Error reading from Vault:", error);
    throw error;
  }
}

const getConfig = (config: Vals): TopLevelConfig => ({
  // MONGODB_URL: 'mongodb://10.1.15.163/CBEIB-Sandbox-DB',
  NODE_ENV: process.env.NODE_ENV as string,
  MONGODB_URL: config.MONGODB_URL as string,
  REDIS_URL: config.REDIS_URL as string,

  _VALS: {
    SMSSender: config.SMSSender,

    _SESSIONTIMEOUT: config._SESSIONTIMEOUT,
    _TEMPSESSIONTIMEOUT: config._TEMPSESSIONTIMEOUT,
    _OTPEXPIRY: config._OTPEXPIRY,
    BANKING_URL: config.BANKING_URL,
    UTILITIES_URL: config.UTILITIES_URL,

    docDBCONNString: config.docDBCONNString,
    docDBNAME: config.docDBNAME,
    secret: config.secret,

    PWDSecretKey: config.PWDSecretKey,
    PWDiv: config.PWDiv,

    _JWTSECRET: config._JWTSECRET,
    _JWTEXPIREY: config._JWTEXPIREY,
    _REFRESHSECRET: config._REFRESHSECRET,
    _REFRESHEXPIREY: config._REFRESHEXPIREY,
    APP_SESSIONEXPIREY: config.APP_SESSIONEXPIREY,
    DASH_SESSIONEXPIREY: config.DASH_SESSIONEXPIREY,
    SESSION_THRESHOLD: config.SESSION_THRESHOLD,
    SESSION_IDLETIME: config.SESSION_IDLETIME,

    KAFKA_ADDRESS: config.KAFKA_ADDRESS,
    KAFKA_MESSAGE_KEY: config.KAFKA_MESSAGE_KEY,
    BANK_URL: config.BANK_URL,
    FLAYGATE_SHORT_CODE: config.FLAYGATE_SHORT_CODE,

    // BANK_URL: config.BANK_URL,
    baseURL: config.baseURL,
    bankingURL: config.bankingURL,
    PORT: config.PORT,
    resourcePath: path.resolve(__dirname, "..", "..", "..", "_resources"),
    bankURL: {
      request: "http://localhost:3000/bank/api/request",
      confirm: "http://localhost:3000/bank/api/confirm",
    },

    RECEIPTASSETURL: config.RECEIPTASSETURL,
    DSTV_GLACCOUNT_NAME: config.DSTV_GLACCOUNT_NAME,
    DSTV_URL: config.DSTV_URL,
    TRAFFIC_CLIENT_ID: config.TRAFFIC_CLIENT_ID,
    TRAFFIC_CLIENT_SECRET: config.TRAFFIC_CLIENT_SECRET,
    TRAFFIC_BASE_URL: config.TRAFFIC_BASE_URL,
    TRAFFIC_URL: config.TRAFFIC_URL,

    FLYGATE_PRD: config.FLYGATE_PRD,
    FLYGATE_SFPRD: config.FLYGATE_SFPRD,
    FLYGATE_VATPRD: config.FLYGATE_VATPRD,
    FLYGATE_GL_ACCOUNT: config.FLYGATE_GL_ACCOUNT,

    SCHOOLFEE_PRD: config.SCHOOLFEE_PRD,
    SCHOOLFEE_SFPRD: config.SCHOOLFEE_SFPRD,
    SCHOOLFEE_VATPRD: config.SCHOOLFEE_VATPRD,

    DSTV_PRD: config.DSTV_PRD,
    DSTV_SFPRD: config.DSTV_SFPRD,
    DSTV_VATPRD: config.DSTV_VATPRD,
    DSTV_GLACCOUNT: config.DSTV_GLACCOUNT,

    DASHENTRANSFER_VATPRD: config.DASHENTRANSFER_VATPRD,
    DASHENTRANSFER_SFPRD: config.DASHENTRANSFER_SFPRD,
    DASHENTRANSFER_PRD: config.DASHENTRANSFER_PRD,

    VEHICLEPARKING_VATPRD: config.VEHICLEPARKING_VATPRD,
    VEHICLEPARKING_SFPRD: config.VEHICLEPARKING_SFPRD,
    VEHICLEPARKING_PRD: config.VEHICLEPARKING_PRD,
    GL_UAT: config.GL_UAT,

    TRAFFICPENALTY_PRD: config.TRAFFICPENALTY_PRD,
    TRAFFICPENALTY_VATPRD: config.TRAFFICPENALTY_VATPRD,
    TRAFFICPENALTY_SFPRD: config.TRAFFICPENALTY_SFPRD,

    // IFB
    IFB_FLYGATE_PRD: config.IFB_FLYGATE_PRD,
    IFB_FLYGATE_SFPRD: config.IFB_FLYGATE_SFPRD,
    IFB_FLYGATE_VATPRD: config.IFB_FLYGATE_VATPRD,
    IFB_FLYGATE_GL_ACCOUNT: config.IFB_FLYGATE_GL_ACCOUNT,

    IFB_SCHOOLFEE_PRD: config.IFB_SCHOOLFEE_PRD,
    IFB_SCHOOLFEE_SFPRD: config.IFB_SCHOOLFEE_SFPRD,
    IFB_SCHOOLFEE_VATPRD: config.IFB_SCHOOLFEE_VATPRD,

    IFB_DSTV_PRD: config.IFB_DSTV_PRD,
    IFB_DSTV_SFPRD: config.IFB_DSTV_SFPRD,
    IFB_DSTV_VATPRD: config.IFB_DSTV_VATPRD,
    IFB_DSTV_GLACCOUNT: config.IFB_DSTV_GLACCOUNT,

    IFB_DASHENTRANSFER_VATPRD: config.IFB_DASHENTRANSFER_VATPRD,
    IFB_DASHENTRANSFER_SFPRD: config.IFB_DASHENTRANSFER_SFPRD,
    IFB_DASHENTRANSFER_PRD: config.IFB_DASHENTRANSFER_PRD,

    IFB_VEHICLEPARKING_VATPRD: config.IFB_VEHICLEPARKING_VATPRD,
    IFB_VEHICLEPARKING_SFPRD: config.IFB_VEHICLEPARKING_SFPRD,
    IFB_VEHICLEPARKING_PRD: config.IFB_VEHICLEPARKING_PRD,
    IFB_GL_UAT: config.IFB_GL_UAT,

    IFB_TRAFFICPENALTY_PRD: config.IFB_TRAFFICPENALTY_PRD,
    IFB_TRAFFICPENALTY_VATPRD: config.IFB_TRAFFICPENALTY_VATPRD,
    IFB_TRAFFICPENALTY_SFPRD: config.IFB_TRAFFICPENALTY_SFPRD,
    PORT_LOG: config.PORT_LOG,
    IP: config.IP,
    REDIS_URL: config.REDIS_URL,
    REDIS_PORT: config.REDIS_PORT,
    REDIS_HOST: config.REDIS_HOST,
    REDIS_BASICAUTH: config.REDIS_BASICAUTH,
    DSTV_CORE_URL: config.DSTV_CORE_URL,
    DSTV_SOAP_ACTION: config.DSTV_SOAP_ACTION,
    DSTV_BUSINESS_UNIT: config.DSTV_BUSINESS_UNIT,
    DSTV_INTERFACE_TYPE: config.DSTV_INTERFACE_TYPE,
    DSTV_IPADDRESS: config.DSTV_IPADDRESS,
    DSTV_VENDOR_CODE: config.DSTV_VENDOR_CODE,

    APPROOVE_SECRET: config.APPROOVE_SECRET,
    TRAFFIC_PAYMENT_GL: config.TRAFFIC_PAYMENT_GL,
  },
});
async function initConfig(): Promise<TopLevelConfig> {
  const config = await loadConfig();
  const initConf = getConfig(config);
  return initConf;
}

export default initConfig;
