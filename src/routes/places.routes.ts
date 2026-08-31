import { FastifyInstance } from 'fastify';
import { placesController } from '../controllers/places.controller';

export async function placesRoutes(app: FastifyInstance) {
  app.get('/search', {}, placesController.searchPlaces.bind(placesController));
  app.get('/:id', {}, placesController.getPlaceDetails.bind(placesController));
  app.get('/:id/price-analysis', {}, placesController.getItemPriceAnalysis.bind(placesController));
}
