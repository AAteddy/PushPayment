export interface TopLevelConfig {
  NODE_ENV: string;
  MONGODB_URL: string;
  REDIS_URL: string;
  _VALS: Vals;
}

export interface Vals {
  MONGODB_URL?: string;
  SMSSender: string;
  _SESSIONTIMEOUT: number;
  _TEMPSESSIONTIMEOUT: number;
  _OTPEXPIRY: number;
  docDBCONNString: string;
  docDBNAME: string;
  secret: string;
  PWDSecretKey: string;
  PWDiv: string;
  _JWTSECRET: string;
  _JWTEXPIREY: number;
  _REFRESHSECRET: string;
  _REFRESHEXPIREY: number;
  APP_SESSIONEXPIREY: number;
  DASH_SESSIONEXPIREY: number;
  SESSION_THRESHOLD: number;
  SESSION_IDLETIME: number;
  baseURL: string;
  bankingURL: string;
  PORT?: number;
  KAFKA_ADDRESS?: string;
  KAFKA_MESSAGE_KEY?: string;
  PORT?: number;
  resourcePath: string;
  BANKING_URL: string;
  BANK_URL: string;
  FLAYGATE_SHORT_CODE: string;
  UTILITIES_URL: string;
  bankURL: {
    request: string;
    confirm: string;
  };
  RECEIPTASSETURL: string;
  DSTV_GLACCOUNT_NAME: string;
  DSTV_URL: string;

  // DASHENTRANSFER_VATPRD: string;
  // DASHENTRANSFER_SFPRD: string;
  // DASHENTRANSFER_PRD: string;
  TRAFFIC_CLIENT_ID: string;
  TRAFFIC_CLIENT_SECRET: string;
  TRAFFIC_BASE_URL: string;
  TRAFFIC_URL: string;
  TRAFFIC_PAYMENT_GL:string

  FLYGATE_PRD: string;
  FLYGATE_SFPRD: string;
  FLYGATE_VATPRD: string;
  FLYGATE_GL_ACCOUNT: string;

  SCHOOLFEE_PRD: string;
  SCHOOLFEE_SFPRD: string;
  SCHOOLFEE_VATPRD: string;

  DSTV_PRD: string;
  DSTV_SFPRD: string;
  DSTV_VATPRD: string;
  DSTV_GLACCOUNT: string;

  DASHENTRANSFER_VATPRD: string;
  DASHENTRANSFER_SFPRD: string;
  DASHENTRANSFER_PRD: string;

  VEHICLEPARKING_VATPRD: string;
  VEHICLEPARKING_SFPRD: string;
  VEHICLEPARKING_PRD: string;
  GL_UAT: string;

  TRAFFICPENALTY_PRD: string;
  TRAFFICPENALTY_VATPRD: string;
  TRAFFICPENALTY_SFPRD: string;

  //FLYGATE_PRD: string;
  FLYGATE_SFPRD: string;
  FLYGATE_VATPRD: string;
  FLYGATE_GL_ACCOUNT: string;

  SCHOOLFEE_PRD: string;
  SCHOOLFEE_SFPRD: string;
  SCHOOLFEE_VATPRD: string;

  DSTV_PRD: string;
  DSTV_SFPRD: string;
  DSTV_VATPRD: string;
  DSTV_GLACCOUNT: string;

  DASHENTRANSFER_VATPRD: string;
  DASHENTRANSFER_SFPRD: string;
  DASHENTRANSFER_PRD: string;

  VEHICLEPARKING_VATPRD: string;
  VEHICLEPARKING_SFPRD: string;
  VEHICLEPARKING_PRD: string;
  GL_UAT: string;

  TRAFFICPENALTY_PRD: string;
  TRAFFICPENALTY_VATPRD: string;
  TRAFFICPENALTY_SFPRD: string;

  //IFB
  IFB_FLYGATE_PRD: string;
  IFB_FLYGATE_SFPRD: string;
  IFB_FLYGATE_VATPRD: string;
  IFB_FLYGATE_GL_ACCOUNT: string;

  IFB_SCHOOLFEE_PRD: string;
  IFB_SCHOOLFEE_SFPRD: string;
  IFB_SCHOOLFEE_VATPRD: string;

  IFB_DSTV_PRD: string;
  IFB_DSTV_SFPRD: string;
  IFB_DSTV_VATPRD: string;
  IFB_DSTV_GLACCOUNT: string;

  IFB_DASHENTRANSFER_VATPRD: string;
  IFB_DASHENTRANSFER_SFPRD: string;
  IFB_DASHENTRANSFER_PRD: string;

  IFB_VEHICLEPARKING_VATPRD: string;
  IFB_VEHICLEPARKING_SFPRD: string;
  IFB_VEHICLEPARKING_PRD: string;
  IFB_GL_UAT: string;

  IFB_TRAFFICPENALTY_PRD: string;
  IFB_TRAFFICPENALTY_VATPRD: string;
  IFB_TRAFFICPENALTY_SFPRD: string;
  PORT_LOG: numbers;
  IP: string;
  REDIS_MODE: string;
  REDIS_PASSWORD: string;
  REDIS_URL?: string;
  REDIS_PORT: number;
  REDIS_BASICAUTH: string;
  REDIS_HOST: string;
  APPROOVE_SECRET: string;

  DSTV_CORE_URL?: string;
  DSTV_SOAP_ACTION?: string;
  DSTV_BUSINESS_UNIT?: string;
  DSTV_INTERFACE_TYPE?: string;
  DSTV_IPADDRESS?: string;
  DSTV_LANGUAGE?: string;
  DSTV_VENDOR_CODE?: string;
}
