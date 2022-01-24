import { default as buildApp } from './app';
import { config } from './common/config';
import { Logger } from './logger';

const logger = new Logger(config.LOG_LEVEL);

/**
 * Анонимная функция инициализирующая работу сервера
 */
(async () => {
  const app = await buildApp(logger);
  try {
    app.listen(config.PORT, '0.0.0.0', () =>
      logger.info(`App is running on http://localhost:${String(config.PORT)}`)
    );
    /* throw new Error('') */
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error);
    } else logger.error(`Can't init app - ` + error);
    process.exit(1);
  }
})().catch((error: Error) => {
  logger.error(`Can't buildApp ${error?.message}`);
  process.exit(1);
});

/**
 * Логируем uncaughtException
 */
process.on('uncaughtException', (error) => {
  logger.error(`uncaughtException - ${error?.message}`);
  process.exit(1);
});
/**
 * Логируем unhandledRejection
 */
process.on('unhandledRejection', (error) => {
  if (error instanceof Error) {
    logger.error(`unhandledRejection - ${error?.message}`);
  } else logger.error(`unhandledRejection`);
  process.exit(1);
});
