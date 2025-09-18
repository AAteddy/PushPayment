import mongoose from "mongoose";

import initConf from "../config/index";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const connect = async () => {
  const _CONFIG = await initConf();
  mongoose.set("strictPopulate", false);
  try {
    mongoose.set("strictPopulate", false);
    mongoose
      .connect(_CONFIG.MONGODB_URL)
      .then(() => {
        console.log("Mongo Connection Made");
      })
      .catch((err) => {
        console.log(err, "ERROR");
      });
    // await mongoose.connect(_CONFIG._VALS.docDBCONNString, {
    //   dbName: _CONFIG._VALS.docDBNAME,
    //   ssl: true,
    //   tlsAllowInvalidCertificates: true,
    //   tlsCAFile: path.join(__dirname, "rds-combined-ca-bundle.cer"),
    // });
    console.log("Connection Made");
  } catch (error) {
    console.error(error, "Error");
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log('🔌 MongoDB Disconnected');
  }
};


// Close connection when the process exits
// process.on('SIGINT', async () => {
//   await disconnect();
//   console.log('🛑 Process terminated on SIGINT');
//   process.exit(0);
// });
// process.on('SIGTERM', async () => { 
//       console.log('🛑 Process terminated on SIGTERM');
//       await disconnect();
//       process.exit(0);

//      })
// process.on('uncaughtException', async (err) => {
//       console.log('🛑 Process terminated on Uncaught Exception');
//       console.error('Uncaught Exception:', err)
//       await  disconnect()
//       process.exit(1);
       
//     })


export default {
  connect,
  disconnect,
};
