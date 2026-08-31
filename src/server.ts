import { buildApp } from './app';
import { env } from './config/index';
import prisma from './config/database';

async function main() {
  const app = await buildApp();

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      app.log.info(`Received ${signal}, shutting down...`);
      await app.close();
      await prisma.$disconnect();
      process.exit(0);
    });
  });

  try {
    await prisma.$connect();
    app.log.info('✅ Database connected');

    await app.listen({ port: env.PORT, host: env.HOST });
    app.log.info(`🚀 Server running on http://${env.HOST}:${env.PORT}`);
    if (env.SWAGGER_ENABLED) {
      app.log.info(`📄 Swagger UI: http://${env.HOST}:${env.PORT}/docs`);
    }
  } catch (err) {
    app.log.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
