import { FastifyInstance } from 'fastify';
import { platformController } from '../controllers/platform.controller';

export async function platformRoutes(app: FastifyInstance) {
  app.post('/pop/verify', {}, platformController.verifyPop.bind(platformController));
  app.post('/advisory/generate', {}, platformController.generateAdvisory.bind(platformController));
  app.post('/prices/submit', {}, platformController.submitPrice.bind(platformController));
  app.get('/merchant/dashboard', {}, platformController.getMerchantDashboard.bind(platformController));
  app.post('/transit/audit-quote', {}, platformController.auditTransitQuote.bind(platformController));
  app.post('/chat/query', {}, platformController.handleChatQuery.bind(platformController));
}
