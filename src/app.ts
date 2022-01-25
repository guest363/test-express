import express from 'express';
import mongoose from 'mongoose';
import { config } from './common/config';
import { createRoutes } from './create-routes';
import { Logger } from './logger';

export default async function buildApp(logger: Logger) {
  const app = express();
  app.use(express.json());

  logger.initMiddleware(app);

  await mongoose.connect(
    `${config.MONGO_URI_PREFIX}${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB}`
  );

  createRoutes(app);

  return app;
}
