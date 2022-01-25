import { Express } from 'express';
import photoRouter from './module-photo/photo.router';
import userRouter from './module-user/user.router';
/**
 * Инициализирует все роуты приложения
 * @param app инстанс экспресса
 */
export const createRoutes = (app: Express) => {
  app.use('/', userRouter);
  app.use('/', photoRouter);
};
