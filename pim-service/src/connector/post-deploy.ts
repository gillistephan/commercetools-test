import dotenv from 'dotenv';
dotenv.config();

import { logger } from '../lib/logger';

const CONNECT_APPLICATION_URL_KEY = 'CONNECT_SERVICE_URL';

async function postDeploy(properties: Map<string, unknown>): Promise<void> {
  const applicationUrl = properties.get(CONNECT_APPLICATION_URL_KEY);

  logger.info(`Running postDeploy hook. Application URL: ${applicationUrl}`);
}

async function run(): Promise<void> {
  try {
    const properties = new Map(Object.entries(process.env));
    await postDeploy(properties);
  } catch (error) {
    process.stderr.write(`Post-deploy failed: ${error}`);
    process.exitCode = 1;
  }
}

run();
