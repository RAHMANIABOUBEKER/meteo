import 'source-map-support/register';

import './module-paths';

import { config } from 'dotenv';
import appServer from './app';

config();

import { ValidateEnv } from '@core/utils/validate-env';

ValidateEnv();

import { config as conf } from '@core/config/config';
import { Database } from './core/db/Database';
import { InitDb } from './core/db/InitDb';
import { configureRoutes } from './routes';


async function launch() {
  try {
    const database = new Database(':memory:');
    const initDb = new InitDb(database);
    await initDb.initialize();

   
    const app = appServer.configure(conf.clientURL);

    configureRoutes(app, database);

    const PORT = conf.port;
    const baseURL = conf.baseURL || `http://localhost:${PORT}`;
    app.listen(PORT, () => {
      console.log(`Server running on ${baseURL}`);
      console.log(`Swagger docs available at ${baseURL}/api-docs`);
    });
  } catch (err) {
    console.error('Failed to launch app:', err);
  }
}

launch().catch((err) => {
  console.error('Error during app launch:', err);
  process.exit(1);
});