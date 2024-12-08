import { Router } from 'express';
import { AssertError, Value } from '@sinclair/typebox/value';
import { logger } from '../lib/logger';
import { Catalog } from '../model';
import { HttpError } from '../model/error';

export const router = Router();

router.post('/catalog', async (req, res, next) => {
  logger.info('received new catalog');
  const body = req.body;

  try {
    const catalog = Value.Parse(Catalog, body);
    logger.info('received new catalog for tenant', { tenant: catalog.tenant });

    // handle the catalog

    res.status(200).json(catalog);
  } catch (error) {
    if (error instanceof AssertError) {
      next(new HttpError(400, 'Invalid catalog', error.error));
    }
    next(error);
  }
});
