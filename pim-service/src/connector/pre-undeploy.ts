import dotenv from 'dotenv';
dotenv.config();

import { logger } from '../lib/logger';

async function preUndeploy(): Promise<void> {
  logger.info('Running preUndeploy hook');
}

async function run(): Promise<void> {
  try {
    await preUndeploy();
  } catch (error) {
    process.stderr.write(`Pre-undeploy failed: ${error}`);
    process.exitCode = 1;
  }
}

run();
