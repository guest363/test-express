import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('JWT key must be setted');
}

export const config = {
  PORT: parseInt(String(process.env.PORT), 10),
  NODE_ENV: process.env.NODE_ENV || 'production',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_SECRET_EXPIRATION: process.env.JWT_SECRET_EXPIRATION,
  LOG_LEVEL: parseInt(String(process.env.LOG_LEVEL), 10) || 4,
  MONGO_PORT: Number(process.env.MONGO_PORT),
  MONGO_DB: process.env.MONGO_DB || 'test-task',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_URI_PREFIX: 'mongodb://',
};
