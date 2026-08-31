import Fastify from 'fastify';
import cors from '@fastify/cors';
import { env } from './config/index';
import { placesRoutes } from './routes/places.routes';
import { platformRoutes } from "./routes/platform.routes";

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'development' ? 'info' : 'warn',
    },
  });

  // ─── Plugins ────────────────────────────────────────────────────
  await app.register(cors, { origin: true });

  if (env.SWAGGER_ENABLED) {
    const { default: swagger } = await import('@fastify/swagger');
    const { default: swaggerUi } = await import('@fastify/swagger-ui');

    await app.register(swagger, {
      openapi: {
        info: {
          title: 'Tourism Intelligence Platform',
          description: 'Trusted Local Services & Price Intelligence API',
          version: '1.0.0',
        },
        servers: [{ url: `http://${env.HOST}:${env.PORT}` }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
            },
          },
        },
      },
    });

    await app.register(swaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
      },
    });
  }

  // ─── Health check ───────────────────────────────────────────────
  app.get('/health', async (_req, reply) => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // ─── API v1 routes ─────────────────────────────────────────────
  await app.register(placesRoutes, { prefix: '/api/v1/places' });
  
  // Register Part 2+3 Platform routes (PoP, Advisory, Price Submission, Merchant)
  await app.register(platformRoutes, { prefix: '/api/v1/platform' });

  // ─── Global error handler ──────────────────────────────────────
  app.setErrorHandler((error, _request, reply) => {
    const statusCode = error.statusCode ?? 500;
    const message = statusCode === 500 ? 'Internal Server Error' : error.message;

    app.log.error(error);
    reply.status(statusCode).send({
      success: false,
      error: message,
      ...(env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
    });
  });

  return app;
}
