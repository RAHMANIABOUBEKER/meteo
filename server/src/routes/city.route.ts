import { Request, Response, Router } from 'express';

import { Database } from '@core/db/Database';

import { getCities, addCity, getForecast } from '@services/city.service';
export default function cityRoutes(db: Database): Router {
    const router: Router = Router();


    /**
 * @openapi
 * /api/cities:
 *   get:
 *     summary: Liste des villes
 *     description: Retourne toutes les villes disponibles dans la base
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: Liste des villes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   insee:
 *                     type: string
 *                   name:
 *                     type: string
 *                   zipcode:
 *                     type: string
 *                   population:
 *                     type: integer
 */
    router.get('/', (req, res) => getCities(req, res, db));

    /**
  * @openapi
  * /api/cities:
  *   post:
  *     summary: Ajoute une ville
  *     tags:
  *       - Cities
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - insee
  *             properties:
  *               insee:
  *                 type: string
  *     responses:
  *       201:
  *         description: Ville ajoutée (ou déjà présente)
  *       404:
  *         description: Ville non trouvée dans la base
  */
    router.post('/', (req, res) => addCity(req, res, db));

    /**
 * @openapi
 * /api/cities/{insee}/forecast:
 *   get:
 *     summary: Prévisions météo pour une ville
 *     tags:
 *       - Cities
 *     parameters:
 *       - name: insee
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Code INSEE de la ville
 *     responses:
 *       200:
 *         description: Prévisions météo pour 2 jours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   datetime:
 *                     type: string
 *                   tmin:
 *                     type: number
 *                   tmax:
 *                     type: number
 *                   weather:
 *                     type: number
 *                   icon:
 *                     type: string
 *       404:
 *         description: Ville introuvable ou erreur météo
 */
    router.get('/:insee/forecast', (req, res) => getForecast(req, res, db));

    return router;
}