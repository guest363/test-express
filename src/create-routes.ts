import { Express } from 'express';
import userRouter from './module-user/user.router';

/**
 * Инициализирует все роуты приложения
 * @param app инстанс экспресса
 */
export const createRoutes = (app: Express) => {
  app.use('/', userRouter);
};
