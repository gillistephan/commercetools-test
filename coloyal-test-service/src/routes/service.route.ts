import { Router } from 'express';
import { logger } from '../utils/logger.utils';

const serviceRouter = Router();

serviceRouter.post('/', async (req, res, next) => {
	logger.info('Service post message received');

	try {
		res.status(200).json({
			received: req.body,
		});
	} catch (error) {
		next(error);
	}
});

serviceRouter.get('/example', async (req, res, next) => {
	logger.info('Service example message received');

	try {
		res.status(200).json({
			message: 'Service example message received',
		});
	} catch (error) {
		next(error);
	}
});

export default serviceRouter;
