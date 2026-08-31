import { EntityType, Prisma } from '@prisma/client';
import prisma from '../config/database';
import type {
  PriceObservation,
  IntelligenceProfile,
  SearchParams,
  PlaceSearchResult,
  NearbyPlaceRow
} from '../types/index';

export class PlaceRepository {
  /**
   * Find places within a radius using PostGIS ST_DWithin
   */
  async findNearbyPlaces(params: SearchParams): Promise<PlaceSearchResult[]> {
    const { lat, lng, radiusMeters, category, maxBudget } = params;

    const whereConditions = [
      `ST_DWithin(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3)`,
    ];
    // Values mapped to postgres parameter indexes $1, $2, $3, etc.
    const queryParams: any[] = [lng, lat, radiusMeters];
    let paramIndex = 4;

    if (category) {
      whereConditions.push(`"entityType"::text = $${paramIndex}`);
      queryParams.push(category);
      paramIndex++;
    }

    if (maxBudget !== undefined) {
      whereConditions.push(`EXISTS (
        SELECT 1 FROM "PriceObservation" po 
        WHERE po."placeId" = p.id AND po."reportedPrice" <= $${paramIndex}
      )`);
      queryParams.push(maxBudget);
      paramIndex++;
    }

    const whereClause = whereConditions.join(' AND ');

    const query = `
      SELECT 
        id, name, "entityType", address, "verificationStatus", "createdAt", "updatedAt",
        ST_Y(location::geometry) as lat,
        ST_X(location::geometry) as lng,
        ST_Distance(
          location, 
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
        ) as distance_meters
      FROM "Place" p
      WHERE ${whereClause}
      ORDER BY distance_meters ASC
    `;

    const rows = await prisma.$queryRawUnsafe<NearbyPlaceRow[]>(query, ...queryParams);
    
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      entityType: row.entityType as unknown as EntityType,
      latitude: Number(row.lat),
      longitude: Number(row.lng),
      address: row.address,
      verificationStatus: row.verificationStatus,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      distanceMeters: Number(row.distance_meters),
      fairPriceBands: [],
      safetyTags: [],
      intelligenceProfile: null,
    }));
  }

  async findById(id: string): Promise<PlaceSearchResult | null> {
    const query = `
      SELECT 
        id, name, "entityType", address, "verificationStatus", "createdAt", "updatedAt",
        ST_Y(location::geometry) as lat,
        ST_X(location::geometry) as lng
      FROM "Place"
      WHERE id = $1
    `;
    const rows = await prisma.$queryRawUnsafe<NearbyPlaceRow[]>(query, id);
    if (!rows.length) return null;
    
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      entityType: row.entityType as unknown as EntityType,
      latitude: Number(row.lat),
      longitude: Number(row.lng),
      address: row.address,
      verificationStatus: row.verificationStatus,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      fairPriceBands: [],
      safetyTags: [],
      intelligenceProfile: null,
    };
  }

  async getPriceObservations(placeId: string): Promise<PriceObservation[]> {
    const obs = await prisma.priceObservation.findMany({
      where: { placeId },
      orderBy: { recordedAt: 'desc' },
    });
    return obs.map(o => ({
      id: o.id,
      placeId: o.placeId,
      itemName: o.itemName,
      category: o.category,
      reportedPrice: Number(o.reportedPrice),
      isVerified: o.isVerified,
      recordedAt: o.recordedAt,
    }));
  }

  async getIntelligenceProfile(placeId: string): Promise<IntelligenceProfile | null> {
    const profile = await prisma.intelligenceProfile.findUnique({
      where: { placeId },
    });
    if (!profile) return null;
    return {
      placeId: profile.placeId,
      safetyScore: Number(profile.safetyScore),
      positiveHighlights: profile.positiveHighlights,
      thingsToKnow: profile.thingsToKnow,
      confidenceLevel: profile.confidenceLevel,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  async create(data: Prisma.PlaceCreateInput, lat: number, lng: number) {
    const pk = await prisma.place.create({ data });
    // Update location with raw query since Prisma cannot easily handle geography
    await prisma.$executeRawUnsafe(
      `UPDATE "Place" SET location = ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography WHERE id = $3`,
      lng, lat, pk.id
    );
    return pk;
  }
}

export const placeRepository = new PlaceRepository();
