import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateBodyRequest<T extends object>(dto: new () => T) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(dto, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const formattedErrors = errors.map(err => ({
        field: err.property,
        constraints: err.constraints,
      }));
      res.status(400).json({
        status: 'error',
        message: 'Validation Failed',
        errors: formattedErrors,
      });

      return;
    }
    req.body = dtoInstance;

    next();
  };
}