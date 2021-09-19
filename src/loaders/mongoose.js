import mongoose from "mongoose";
import logger from './logger';

require('dotenv').config();

const mongoURI =
  process.env.NODE_ENV !== 'development'
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_TEST;

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