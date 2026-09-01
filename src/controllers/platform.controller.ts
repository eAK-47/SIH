import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../config/database';
import { verifyPresence, generatePopToken, verifyPopToken } from '../services/geo-validator.service';
import { generateAdvisory } from '../services/ai-synthesizer.service';
import { calculateRegulatedFare } from '../services/transit-meter.service';
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

  // 4. Merchant Dashboard (real aggregated data)
  async getMerchantDashboard(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = (req.headers['x-user-id'] as string) || 'user-123';

      const merchant = await prisma.merchantProfile.findFirst({
        where: { userId },
      });

      if (!merchant) {
        return reply.send({
          success: true,
          data: {
            message: 'No merchant profile linked to this user. Register a business to see your dashboard.',
          },
        });
      }

      const placeId = merchant.placeId;
      const place = await prisma.place.findUnique({ where: { id: placeId } });

      const submissions = await prisma.priceSubmission.findMany({
        where: { placeId },
        orderBy: { submittedAt: 'desc' },
        take: 10,
      });

      const observations = await prisma.priceObservation.findMany({
        where: { placeId },
      });

      const totalSubmissions = submissions.length;
      const verifiedSubmissions = submissions.filter(s => s.isVerified).length;
      const flaggedItems = submissions.filter(s => s.popDistance > 200).length;

      const suggestedPrices: any[] = [];
      const byItem = new Map<string, number[]>();
      for (const obs of observations) {
        const key = obs.itemName;
        if (!byItem.has(key)) byItem.set(key, []);
        byItem.get(key)!.push(Number(obs.reportedPrice));
      }
      // placeholder for median calc

      for (const [itemName, prices] of byItem.entries()) {
        const sorted = [...prices].sort((a, b) => a - b);
        const median = sorted.length % 2 === 0 ? (sorted[(sorted.length / 2) - 1] + sorted[sorted.length / 2]) / 2 : sorted[Math.floor(sorted.length / 2)] || 0;
        const lower = sorted[Math.floor(sorted.length * 0.25)] ?? median;
        const upper = sorted[Math.floor(sorted.length * 0.75)] ?? median;
        suggestedPrices.push({ itemName, fairLow: lower, fairHigh: upper, currentMarketMedian: median });
      }

      const intel = await prisma.intelligenceProfile.findUnique({ where: { placeId } });

      return reply.send({
        success: true,
        data: {
          merchant: { id: merchant.id, businessName: merchant.businessName, accountStatus: merchant.accountStatus },
          place: {
            id: place?.id, name: place?.name, address: place?.address,
            currentSafetyScore: intel ? Number(intel.safetyScore) : 0,
            verificationStatus: place?.verificationStatus,
          },
          recentSubmissions: submissions.map(s => ({
            id: s.id, itemName: s.itemName, category: s.category,
            reportedPrice: Number(s.reportedPrice), popVerified: s.popVerified,
            isVerified: s.isVerified, submittedAt: s.submittedAt, userComment: s.userComment,
          })),
          submissionStats: { totalSubmissions, verifiedSubmissions, flaggedItems },
          priceManagement: {
            itemCount: suggestedPrices.length,
            lastUpdated: observations.length ? observations[observations.length - 1].recordedAt : null,
            suggestedPrices,
          },
          alerts: [],
        },
      });
    } catch (e: any) {
      return reply.status(500).send({ success: false, error: e.message });
    }
  }

  // 5. Transit Audit Quote
  async auditTransitQuote(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { placeId, destLat, destLng, quotedPrice, isNightFare } = req.body as any;

      const place = await prisma.$queryRawUnsafe<any[]>(
        'SELECT ST_Y(location::geometry) as lat, ST_X(location::geometry) as lng FROM "Place" WHERE id = $1',
        placeId
      );

      if (!place || place.length === 0) {
        return reply.status(404).send({ success: false, error: 'Origin Place not found' });
      }

      const origin = place[0];
      const fareDetails = await calculateRegulatedFare(origin.lat, origin.lng, destLat, destLng);
      
      const activeFare = isNightFare ? fareDetails.nightMeterFare : fareDetails.standardMeterFare;
      const margin = ((quotedPrice - activeFare) / activeFare) * 100;

      let status: 'FAIR' | 'MODERATE_SURGE' | 'SEVERE_GOUGING' = 'FAIR';
      if (quotedPrice > activeFare * 1.5) status = 'SEVERE_GOUGING';
      else if (quotedPrice > activeFare * 1.15) status = 'MODERATE_SURGE';

      return reply.send({
        success: true,
        audit: {
          ...fareDetails,
          quotedPrice,
          regulatedFare: activeFare,
          discrepancyPercent: Math.round(margin),
          status,
          recommendation: status === 'FAIR' ? 'This appears to be a fair rate. You can accept with confidence.' :
            status === 'MODERATE_SURGE' ? 'Negotiate down to the standard meter fare or ask for shared pooling to drop the per-head price.' :
            'Significant overcharging detected! Refer the driver to the official stand fare board or use public transport alternatives.'
        }
      });
    } catch (e: any) {
      return reply.status(500).send({ success: false, error: e.message });
    }
  }
}

export const platformController = new PlatformController();
