import crypto from "node:crypto";

const getRandomArbitrary = () => {
  const min = 100000;
  const max = 999999;

  const generatedNumber = crypto.randomInt(min, max);
  return String(generatedNumber);
};

const formatPhoneNumber = (phoneNumber: string) => {
  if (String(phoneNumber).startsWith("0"))
    return `+251${String(phoneNumber).substring(1)}`;
  if (
    String(phoneNumber).startsWith("9") ||
    String(phoneNumber).startsWith("7")
  )
    return `+251${String(phoneNumber)}`;
  if (String(phoneNumber).startsWith("+")) return String(phoneNumber);
  if (String(phoneNumber).startsWith("251")) return `+${String(phoneNumber)}`;
};

const formatToCurrency = (amount: number) => {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const localEncryptPassword = (password: string) => {
  const PWDSecretKey = global._CONFIG._VALS.PWDSecretKey;
  const PWDiv = global._CONFIG._VALS.PWDiv;
  const cipher = crypto.createCipheriv("aes-256-cbc", PWDSecretKey, PWDiv);

  let encrypted = cipher.update(password, "utf8", "hex");

  encrypted += cipher.final("hex");
  console.log("THIS ENCRYPTED PWD: ", encrypted);

  return encrypted;
};

const localDecryptPassword = (encryptedPassword: string) => {
  const PWDSecretKey = global._CONFIG._VALS.PWDSecretKey;
  const PWDiv = global._CONFIG._VALS.PWDiv;
  const decipher = crypto.createDecipheriv("aes-256-cbc", PWDSecretKey, PWDiv);

  let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

const getcipherauth = (
  encryptedtext: string
): { auth: string; cipher: string } => {
  const parts = encryptedtext.split(".");
  if (parts.length !== 2)
    throw new Error("Invalid format: expected 'cipher.authTag'");
  return {
    cipher: parts[0],
    auth: parts[1],
  };
};

const decrypt = (encryptedPassword: string, authtag: string) => {
  const PWDSecretKey = global._CONFIG._VALS.PWDSecretKey;
  const PWDiv = global._CONFIG._VALS.PWDiv;

  const decipher = crypto.createDecipheriv("aes-256-gcm", PWDSecretKey, PWDiv);

  // Set the auth tag explicitly
  decipher.setAuthTag(Buffer.from(authtag, "hex"));

  let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

export default {
  formatPhoneNumber,
  getRandomArbitrary,
  localEncryptPassword,
  localDecryptPassword,
  formatToCurrency,
  getcipherauth,
  decrypt,
};
