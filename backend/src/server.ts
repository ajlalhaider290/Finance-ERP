import http from 'http';
import { app } from './app';
import { env } from './config/env';
import { sequelize } from './config/db';
import logger from './logger';

const server = http.createServer(app);

server.on('error', (err) => {
  logger.error(err);
});

async function main() {
  try {
    await sequelize.authenticate();
    logger.info('sql connected');
  } catch (err) {
    logger.error({ err }, 'Failed to connect to database on boot');
    process.exit(1);
  }

  server.listen(env.PORT, () => {
    logger.info(`Server running on http://localhost:${env.PORT}`);
  });
}

void main();

// Graceful shutdown
async function shutdown(signal: string) {
  logger.info(`${signal} received. Shutting down gracefully...`);
  server.close(() => {
    logger.info('HTTP server closed');
  });

  logger.info('Graceful shutdown complete');
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

