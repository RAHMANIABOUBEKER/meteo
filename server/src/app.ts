import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '@core/swagger/swagger-config';

class AppServer {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public configure(clientUrl: string): Application {
    this.setupSecurity(clientUrl);
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
    return this.app;
  }

  private setupSecurity(clientUrl: string) {
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:'],
          },
        },
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      })
    );

    this.app.use(
      cors({
        origin: clientUrl,
        credentials: true,
      })
    );
  }

  private setupMiddlewares() {
    this.app.use(express.json());
  }

  private setupRoutes() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  }

  private setupErrorHandling() {
    this.app.use(errorHandler);
  }
}

const appServer = new AppServer();
export default appServer;
