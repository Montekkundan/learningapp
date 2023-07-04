import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export function validateRequest(schema: ZodType<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).send(error.errors);
    }
  };
}
