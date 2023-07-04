import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export function validateRequest(schema: ZodType<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      console.log('Inside validateRequest middleware', req.body);
      try {
        schema.parse(req.body);
        next();
      } catch (error: any) {
        console.log('Validation error:', error);
        res.status(400).send(error.errors);
      }
    };
  }
  
