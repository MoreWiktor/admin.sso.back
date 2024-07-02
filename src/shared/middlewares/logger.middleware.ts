import type { NestMiddleware } from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = console;

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body } = request;
    const now = Date.now();

    response.on('close', () => {
      const { statusCode } = response;
      const message = `${method} ${originalUrl} ${statusCode} ${
        Date.now() - now
      }ms - ${JSON.stringify(body)}`;

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(message);
      } else {
        this.logger.info(message);
      }
    });

    next();
  }
}
