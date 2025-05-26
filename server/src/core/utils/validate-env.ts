import { EnvError, EnvMissingError, ReporterOptions, cleanEnv, port, str } from 'envalid';
import logger from './logger';

const validation = {
  NODE_ENV: str({
    choices: ['dev' , 'demo' , 'prod'],
  }),
  PORT: port(),
  LOG_DIR: str(),
};

const reporter: (opts: ReporterOptions<any>) => void = ({ errors, env }) => {
  for (const [envVar, err] of Object.entries(errors)) {
    if (err instanceof EnvError) {
      logger.error(`${err.message}`);
    } else if (err instanceof EnvMissingError) {
      logger.error(`${envVar} is missing`);
    } else {
      logger.error(`${envVar} ${err}`);
    }
  }
  logger.info(`Env file content: ${JSON.stringify(env)}`);
};

export const ValidateEnv = () => {
  cleanEnv(process.env, validation, { reporter });
};
