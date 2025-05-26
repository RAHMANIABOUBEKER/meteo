import { Request, Response, Router } from 'express';

export const healthRoutes: Router = Router();

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns basic server health metrics such as uptime, response time, and current timestamp.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uptime:
 *                   type: number
 *                   example: 1532.012
 *                 responseTime:
 *                   type: array
 *                   items:
 *                     type: number
 *                   example: [1234, 56789000]
 *                 message:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: integer
 *                   example: 1716641234567
 *       503:
 *         description: Service unavailable
 */
healthRoutes.get('', (_req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error as any;
    res.status(503).send();
  }
});
