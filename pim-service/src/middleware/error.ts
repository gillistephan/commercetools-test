import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpError } from '../model/error';
import { env } from '../lib/env';
import { logger } from '../lib/logger';

export const errorMiddleware: ErrorRequestHandler = (
  error: Error,
  _: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(error);
  if (error instanceof HttpError) {
    res.status(error.status as number).json({
      message: error.message.trim(),
      details: error.details,
      stack: env.isDevelopment ? error.stack : undefined,
    });

    return;
  }

  res
    .status(500)
    .send(
      env.isDevelopment
        ? { messge: error.message }
        : { message: 'Internal server error' }
    );
};
