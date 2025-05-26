import 'source-map-support/register';
import 'module-alias/register';

export interface ProcessEnv {
  [key: string]: string | boolean | number;
}

(process.env as ProcessEnv).PORT = 4000;
(process.env as ProcessEnv).NODE_ENV = 'test';
