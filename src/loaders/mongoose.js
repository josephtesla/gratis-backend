import mongoose from "mongoose";
import logger from './logger';

require('dotenv').config();

const environment = String(process.env.NODE_ENV).trim();
const mongoURI = environment === "development" ? process.env.MONGO_URI_DEV:
  environment === "test" ? process.env.MONGO_URI_TEST: process.env.MONGO_URI_PROD;

console.log(environment, mongoURI);

class MongooseLoader {
  static connectMongoose = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });

      console.log(`
     ################################################
      🛡️  Mongo Database Connected! 🛡️
      ################################################
  `);

    } catch (err) {
      logger.error('DB Connection not successful!', err);
      //process.exit(1);
    }
  };
}

export default MongooseLoader;