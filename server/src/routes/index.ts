import { Router } from 'express';
import { healthRoutes } from './health.route';


import { Database } from '@core/db/Database';
import { Application } from 'express';
import cityRoutes from './city.route';

export function configureRoutes(app: Application, db: Database) {
  const router: Router = Router();
  router.use('/health', healthRoutes);
  router.use('/cities', cityRoutes(db));

  app.use('/api', router);
}