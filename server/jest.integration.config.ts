import basedConfig from './jest.config';

const config = {
  ...basedConfig,
  testRegex: './test/integration/.*.test.ts$',
};

export default config;
