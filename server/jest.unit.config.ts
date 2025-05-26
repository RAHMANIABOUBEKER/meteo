import { Config } from '@jest/types';
import basedConfig from './jest.config';

const config: Config.InitialOptions = {
  ...basedConfig,
  testRegex: './src/.*.spec.ts$',
};

export default config;
