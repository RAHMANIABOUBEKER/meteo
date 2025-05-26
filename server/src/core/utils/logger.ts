import { config } from '@core/config/config';
import { HttpException } from '@core/exceptions/http-exception';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import winston, { LoggerOptions, format } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = join(__dirname, config.logDir);
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const option: LoggerOptions = {
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.splat(),
    logFormat
  ),
};

(option as any).transport = [
  new winstonDaily({
    level: 'debug',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/debug',
    filename: '%DATE%.log',
    maxFiles: 30,
    json: false,
    zippedArchive: true,
  }),
  new winstonDaily({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + '/error',
    filename: '%DATE%.log',
    maxFiles: 30,
    handleExceptions: true,
    json: false,
    zippedArchive: true,
  }),
];

export const logger = winston.createLogger(option);

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  })
);

export const responseLogger = (request: any) => {
  const { query } = request.request;
  logger.info(query);
};

export const errorLogger = (error: any) => {
  const { validationErrors } = error.extensions.exception;

  let message = '';
  if (validationErrors) {
    message = validationErrors.map((error: any) => Object.values(error.constraints)).join(', ');
  } else {
    message = error.message;
  }

  logger.error(message);
  throw new HttpException(400, message);
};

export default logger;
