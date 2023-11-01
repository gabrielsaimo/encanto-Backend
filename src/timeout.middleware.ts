/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TimeoutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const timeout = 600000; // 10 minutos
    req.setTimeout(timeout, () => {
      console.log('Timeout de solicitação!');
    });
    next();
  }
}