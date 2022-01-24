import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const config = {
  PORT: parseInt(String(process.env.PORT), 10),
  NODE_ENV: process.env.NODE_ENV || 'production',
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  LOG_LEVEL: parseInt(String(process.env.LOG_LEVEL), 10) || 4,
  MONGO_PORT: Number(process.env.PGPORT),
};
