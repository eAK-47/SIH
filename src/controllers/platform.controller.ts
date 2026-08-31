import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../config/database';
import { verifyPresence, generatePopToken, verifyPopToken } from '../services/geo-validator.service';
import { generateAdvisory } from '../services/ai-synthesizer.service';
import { z } from 'zod';

const popVerifySchema = z.object({
  userLat: z.number().min(-90).max(90),
  userLng: z.number().min(-180).max(180),
  placeId: z.string().uuid(),
  maxRadiusMeters: z.number().optional().default(150),
});

const advisorySchema = z.object({
  placeId: z.string().uuid(),
  forceRefresh: z.boolean().optional().default(false),
});

const priceSubmitSchema = z.object({
  placeId: z.string().uuid(),
  itemName: z.string().min(1),
  category: z.string().min(1),
  reportedPrice: z.number().positive(),
  popToken: z.string(),
  userComment: z.string().optional(),
  photoUrl: z.string().optional(),
});

export class PlatformController {

  // 1. Verify PoP
  async verifyPop(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = popVerifySchema.parse(req.body);
      
      const place = await prisma.$queryRawUnsafe<any[]>(`
        SELECT ST_Y(location::geometry) as lat, ST_X(location::geometry) as lng FROM "Place" WHERE id = $1
      `, data.placeId);

      if (!place || place.length === 0) {
        return reply.status(404).send({ success: false, message: 'Place not found' });
      }

      const p = place[0];
      const result = verifyPresence(data.userLat, data.userLng, p.lat, p.lng, data.maxRadiusMeters);

      if (result.status === 'INVALID_INPUT') {
        return reply.status(400).send({ success: false, message: result.message });
      }

      const token = result.isVerified ? generatePopToken(data.userLat, data.userLng, data.placeId) : null;
      
      return reply.send({
        success: true,
        isVerified: result.isVerified,
        distanceMeters: result.distanceMeters,
        message: result.message,
        verificationToken: token
      });
    } catch (e: any) {
      if (e instanceof z.ZodError) return reply.status(400).send({ success: false, error: 'Validation Error' });
      return reply.status(500).send({ success: false, error: e.message });
    }
  }

  // 2. Generate Advisory
  async generateAdvisory(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { placeId } = advisorySchema.parse(req.body);
      
      const place = await prisma.place.findUnique({
        where: { id: placeId },
        include: { intelligenceProfile: true, priceObservations: true }
      });

      if (!place) return reply.status(404).send({ success: false, message: 'Place not found' });

      // Build context
      const context = {
        placeName: place.name,
        entityType: place.entityType,
        address: place.address,
        verificationStatus: place.verificationStatus,
        safetyScore: place.intelligenceProfile ? Number(place.intelligenceProfile.safetyScore) : undefined,
        priceObservations: [] // We can refine this later to group prices
      };

      const advisory = await generateAdvisory(context as any);

      if (!advisory) {
         return reply.status(500).send({ success: false, message: 'Failed to generate advisory (ensure OPENAI_API_KEY is set)' });
      }

      // Save to db
      await prisma.travelAdvisory.upsert({
        where: { placeId },
        create: {
          placeId,
          positiveHighlights: advisory.positive_highlights,
          thingsToKnow: advisory.things_to_know,
          riskLevel: advisory.risk_level,
          confidenceScore: advisory.confidence_score,
          reasoning: advisory.reasoning,
          validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        update: {
          positiveHighlights: advisory.positive_highlights,
          thingsToKnow: advisory.things_to_know,
          riskLevel: advisory.risk_level,
          confidenceScore: advisory.confidence_score,
          reasoning: advisory.reasoning,
          validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000)
        }
      });

      return reply.send({ success: true, advisory });
    } catch (e: any) {
      if (e instanceof z.ZodError) return reply.status(400).send({ success: false, error: 'Validation Error' });
      return reply.status(500).send({ success: false, error: e.message });
    }
  }

  // 3. Submit price
  async submitPrice(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = priceSubmitSchema.parse(req.body);
      
      const tokenPayload = verifyPopToken(data.popToken);
      if (!tokenPayload || tokenPayload.placeId !== data.placeId) {
         return reply.status(401).send({ success: false, message: 'Invalid or expired PoP token' });
      }

      const submission = await prisma.priceSubmission.create({
        data: {
          placeId: data.placeId,
          touristId: 'anonymous', // Would come from JWT normally
          itemName: data.itemName,
          category: data.category,
          reportedPrice: data.reportedPrice,
          popVerified: true,
          popDistance: 0, // In reality, we could embed distance in token
          userComment: data.userComment,
          photoUrl: data.photoUrl
        }
      });

      // Also create an observation directly so search finds it
      await prisma.priceObservation.create({
        data: {
          placeId: data.placeId,
          itemName: data.itemName,
          category: data.category,
          reportedPrice: data.reportedPrice,
          isVerified: false
        }
      });

      return reply.send({ success: true, submissionId: submission.id, message: 'Price submitted successfully' });

    } catch (e: any) {
      if (e instanceof z.ZodError) return reply.status(400).send({ success: false, error: 'Validation Error' });
      return reply.status(500).send({ success: false, error: e.message });
    }
  }

  // 4. Merchant Dashboard (Mock for now, returns structure)
  async getMerchantDashboard(req: FastifyRequest, reply: FastifyReply) {
    return reply.send({
      success: true,
      data: {
        message: 'Endpoint exists. Requires real auth integration.'
      }
    });
  }
}

export const platformController = new PlatformController();
