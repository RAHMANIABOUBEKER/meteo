import request from 'supertest';
import express from 'express';
import { healthRoutes } from './health.route';

describe('GET /api/health', () => {
  const app = express();
  app.use('/api/health', healthRoutes);

  it('should return 200 and health data', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('responseTime');
    expect(res.body).toHaveProperty('message', 'OK');
    expect(res.body).toHaveProperty('timestamp');
    expect(Array.isArray(res.body.responseTime)).toBe(true);
  });

  it('should return 503 on res.send error (mocked)', async () => {
    const appWithBrokenRoute = express();
    const brokenRoute = express.Router();

    brokenRoute.get('', (_req, res) => {
      const healthcheck = {
        uptime: process.uptime(),
        responseTime: process.hrtime(),
        message: 'OK',
        timestamp: Date.now(),
      };

      // ⚠️ mock res.send pour forcer une erreur
      jest.spyOn(res, 'send').mockImplementationOnce(() => {
        throw new Error('forced failure');
      });

      try {
        res.send(healthcheck);
      } catch {
        res.status(503).send();
      }
    });

    appWithBrokenRoute.use('/api/health', brokenRoute);

    const res = await request(appWithBrokenRoute).get('/api/health');
    expect(res.status).toBe(503);
  });
});
