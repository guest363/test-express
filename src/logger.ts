import { Request, Response } from 'express';
import expressPino from 'express-pino-logger';
import pino, { DestinationStream } from 'pino';

enum logLevels {
  error = 0, // (ошибка)
  warn = 1, // (предупреждение)
  info = 2, // (информация)
  debug = 3, // (отладочное сообщение)
  trace = 4, // (все сообщения)
}

/**
 * Куда писать какие логи
 */
const targets = [
  /** Все остальное пишем в info.log */
  {
    level: logLevels[logLevels.trace] as pino.LevelWithSilent,
    options: { destination: './log/info.log', mkdir: true },
    target: 'pino/file',
  },
  {
    level: logLevels[logLevels.error] as pino.LevelWithSilent,
    options: { destination: './log/error.log', mkdir: true },
    target: 'pino/file',
  },
];

/**
 * Класс отвечающий за логирование в приложении
 */
export class Logger {
  logLevel = 0;

  pino;

  /**
   * @param logLevel - Уровни логировани от 0 до 4
   */
  constructor(logLevel: logLevels) {
    this.logLevel = logLevel;
    this.pino = pino(
      {
        level: logLevels[this.logLevel],
        prettyPrint: true,
        serializers: {
          res(reply: Response) {
            return {
              statusCode: reply.statusCode,
            };
          },
          req(request: Request) {
            return {
              method: request.method,
              url: request.url,
              path: request.path,
              parameters: request.params,
            };
          },
        },
      },
      pino.transport({ targets }) as DestinationStream
    );
  }

  /**
   * Инициализирует middleware для логирование тела запросса
   *
   * @param app - инстанс express
   */
  public initMiddleware(app: Express) {
    const loggerMiddleware = expressPino({
      logger: this.pino,
    });
    app.use(loggerMiddleware);
  }

  /**
   * Возвращает логер
   */
  public getLogger() {
    return this.pino;
  }

  /**
   * Логирует ошибку
   *
   * @param error - инстанс ошибки или сообщение об ошибки
   */
  public error(error: Error | string) {
    if (error instanceof Error) {
      this.pino.error(error);
    } else {
      this.pino.error(`Unhandled error - ${error}`);
    }
  }

  /**
   * Логирует info
   *
   * @param info - сообщение для записи в лог
   */
  public info(error: string) {
    this.pino.info(error);
  }
}
