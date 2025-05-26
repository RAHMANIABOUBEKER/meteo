import { Request, Response } from 'express';
import axios from 'axios';
import { Database } from '@core/db/Database';
import { config } from '@core/config/config';

import { WeatherUtils } from '@core/utils/WeatherUtils';

/**
 * GET /cities
 */
export async function getCities(req: Request, res: Response, db: Database) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const data = await db.all(
      'SELECT insee, name, zipcode, population FROM city ORDER BY name ASC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const totalRow = await db.get('SELECT COUNT(*) as count FROM city');
    const total = totalRow?.count || 0;

    res.json({
      data,
      total,
      page,
      limit,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve cities' });
  }
}


/**
 * POST /cities
 * Body: { insee: string }
 */
export async function addCity(req: Request, res: Response, db: Database) {
  const { insee } = req.body;
  if (!insee) {
    return res.status(400).json({ error: 'Missing insee code' });
  }

  try {
    const city = await db.get('SELECT insee, name, zipcode, population FROM city WHERE insee = ?', [
      insee,
    ]);
    if (!city) {
      return res.status(404).json({ error: 'City not found in database' });
    }

    return res.status(201).json(city);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add city' });
  }
}

/**
 * GET /cities/:insee/forecast
 */
export async function getForecast(req: Request, res: Response, db: Database) {
  const { insee } = req.params;
  if (!insee) {
    return res.status(400).json({ error: 'Missing insee code' });
  }


  try {
    const cached = await db.all(
      'SELECT date, details FROM forecast WHERE insee = ? AND date IN (?, ?)',
      [insee]
    );

    if (cached.length === 2) {
      const forecasts = cached.map(entry => {
        const details = JSON.parse(entry.details);
        return {
          datetime: entry.date,
          tmin: details.tmin,
          tmax: details.tmax,
          probarain: details.probarain,
          icon: details.icon ?? WeatherUtils.getIconByCode(details.weather)
        };
      });

      return res.json({ forecasts });
    }

    const TOKEN = config.weatherAPIKey;
    const apiRes = await axios.get(
      `https://api.meteo-concept.com/api/forecast/daily?token=${TOKEN}&insee=${insee}`
    );

    const fullForecasts = apiRes.data.forecast;

    const forecasts = fullForecasts.slice(0, 2).map((f: any) => {
      const simplified = {
        datetime: f.datetime,
        tmin: f.tmin,
        tmax: f.tmax,
        probarain: f.probarain,
        icon: WeatherUtils.getIconByCode(f.weather)
      };

      db.run(
        'INSERT OR REPLACE INTO forecast (date, insee, details) VALUES (?, ?, ?)',
        [f.datetime, insee, JSON.stringify(simplified)]
      );

      return simplified;
    });

    return res.json({ forecasts });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch forecast' });
  }
}

