import * as dotenv from 'dotenv';
dotenv.config();

// Import logger
import { logger } from './lib/logger';

import app from './app';

const PORT = 8080;

// Listen the application
const server = app.listen(PORT, () => {
  logger.info(`⚡️ Service application listening on port ${PORT}`);
});

export default server;
