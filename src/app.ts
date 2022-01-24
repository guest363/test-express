import express from 'express';
import mongoose from 'mongoose';
import { config } from './common/config';
import { Logger } from './logger';
import userRouter from './module-user/user.router';

export default async function buildApp(logger: Logger) {
  const app = express();
  app.use(express.json());

  logger.initMiddleware(app);

  await mongoose.connect(
    `${config.MONGO_URI_PREFIX}${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB}`
  );

  app.use('/', userRouter);

  return app;
}
