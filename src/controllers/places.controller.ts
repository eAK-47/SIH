import { FastifyRequest, FastifyReply } from 'fastify';
import { spatialSearchService } from '../services/spatial-search.service';
import { z } from 'zod';
import { EntityType } from '../types/index';

const searchParamsSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radiusMeters: z.coerce.number().min(1).max(50000).default(5000),
  category: z.enum(['RESTAURANT', 'HOTEL', 'GUIDE', 'TRANSPORT'] as const).optional(),
  maxBudget: z.coerce.number().positive().optional(),
});

const placeIdSchema = z.object({ id: z.string().uuid() });
const itemAnalysisSchema = z.object({
  id: z.string().uuid(),
  itemName: z.string().min(1),
  category: z.string().min(1),
});

export class PlacesController {
  async searchPlaces(request: FastifyRequest<{ Querystring: any }>, reply: FastifyReply) {
    try {
      const params = searchParamsSchema.parse(request.query);
      const places = await spatialSearchService.searchPlaces(params as any);
      return reply.send({ success: true, data: { places, total: places.length, searchParams: params } });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ success: false, error: 'Validation Error', details: error.errors });
      }
      return reply.status(500).send({ success: false, error: 'Internal Server Error' });
    }
  }

  async getPlaceDetails(request: FastifyRequest<{ Params: any }>, reply: FastifyReply) {
    try {
      const { id } = placeIdSchema.parse(request.params);
      const place = await spatialSearchService.getPlaceDetails(id);
      if (!place) return reply.status(404).send({ success: false, error: 'Place not found' });
      return reply.send({ success: true, data: place });
    } catch (error: any) {
      if (error instanceof z.ZodError) return reply.status(400).send({ success: false, error: 'Validation Error' });
      return reply.status(500).send({ success: false, error: 'Internal Server Error' });
    }
  }

  async getItemPriceAnalysis(request: FastifyRequest<{ Params: any }>, reply: FastifyReply) {
    try {
      const { id, itemName, category } = itemAnalysisSchema.parse(request.params);
      const analysis = await spatialSearchService.getItemPriceAnalysis(id, itemName, category);
      if (!analysis) return reply.status(404).send({ success: false, error: 'Price data not found' });
      return reply.send({ success: true, data: analysis });
    } catch (error: any) {
      if (error instanceof z.ZodError) return reply.status(400).send({ success: false, error: 'Validation Error' });
      return reply.status(500).send({ success: false, error: 'Internal Server Error' });
    }
  }
}

export const placesController = new PlacesController();
