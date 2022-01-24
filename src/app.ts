import express from 'express';
import { Logger } from './logger';

export default async function buildApp(logger: Logger) {
  const app = express();
  app.use(express.json());

  logger.initMiddleware(app);

  return app;
}
