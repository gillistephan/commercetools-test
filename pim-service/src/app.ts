import * as dotenv from 'dotenv';
import './lib/env';
dotenv.config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { router } from './routes';

import { basicAuthMiddleware } from './middleware/basic-auth';
import { errorMiddleware } from './middleware/error';
import { HttpError } from './model/error';

const app: Express = express();
app.disable('x-powered-by');

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(basicAuthMiddleware);

app.use('/service', router);
app.use('*', () => {
  throw new HttpError(404, 'Route not found');
});

app.use(errorMiddleware);

export default app;
