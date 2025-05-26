export type EnvType = 'dev' | 'demo' | 'prod';

export class Config {
  port: number;
  env: EnvType;
  logDir: string;
  clientURL: string;
  baseURL: string;
  weatherAPIKey: string;
  constructor() {
    this.port = process.env.PORT ? +process.env.PORT : 3000;
    this.logDir = process.env.LOG_DIR ?? '../../logs';
    this.env = (process.env.NODE_ENV || 'dev') as EnvType;
    this.clientURL = process.env.CLIENT_URL || 'http://localhost:3000';
    this.baseURL = process.env.BASE_URL || `http://localhost:${this.port}`;
    this.weatherAPIKey = process.env.WEATHER_API_KEY || '';
  }

  get isDevelopmentMode() {
    return this.env === 'dev';
  }
}

const instance = new Config();

export const config = instance;
