import "@babel/polyfill";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongooseLoader from "./loaders/mongoose";
import AppError from "./errors/AppError";
import errorHandler from "./errors/errorHandler";
import routes from "./routes";

dotenv.config();

const app = express();

//Mongoose Connection
await mongooseLoader.connectMongoose();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api/v1', routes);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `This endpoint ${req.originalUrl} does not exist on this server!`,
      404
    )
  );
});

app.use(errorHandler);

export default app;
