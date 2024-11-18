import dotenv from 'dotenv';
dotenv.config();

import { assertError } from '../utils/assert.utils';
import { logger } from '../utils/logger.utils';

async function preUndeploy(): Promise<void> {
	logger.info('Running preUndeploy hook');
}

async function run(): Promise<void> {
	try {
		await preUndeploy();
	} catch (error) {
		assertError(error);
		process.stderr.write(`Pre-undeploy failed: ${error.message}`);
		process.exitCode = 1;
	}
}

run();
