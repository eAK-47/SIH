/**
 * Test Database Fixture
 *
 * Provides database setup/teardown and test data management for integration tests.
 * Usage:
 *   beforeAll(async () => setupTestDB())
 *   afterAll(async () => teardownTestDB())
 */

import { PrismaClient } from '@prisma/client';
import { places as seedPlaces } from '../../seeds/data.places';
import { observations as seedObservations } from '../../seeds/data.observations-1';
import { merchants } from "../../seeds/data.merchants";
import { profiles as seedProfiles } from '../../seeds/data.profiles';

let prisma: PrismaClient;

export async function setupTestDB(): Promise<PrismaClient> {
  // Create or reuse Prisma client for tests
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_TEST_URL || process.env.DATABASE_URL
      }
    }
  });

  try {
    // Verify connection
    await prisma.$executeRawUnsafe('SELECT 1');

    // Clear existing data (FK-aware deletion order)
    await prisma.intelligenceProfile.deleteMany({});
    await prisma.priceObservation.deleteMany({});
    await prisma.place.deleteMany({});

    // Insert test seed data
    await seedDatabase(prisma);

    console.log('✓ Test database initialized');
    return prisma;
  } catch (error) {
    console.error('Failed to setup test database:', error);
    await prisma.$disconnect();
    throw error;
  }
}

export async function teardownTestDB(): Promise<void> {
  try {
    if (prisma) {
      // Clear data before disconnecting
      await prisma.intelligenceProfile.deleteMany({});
      await prisma.priceObservation.deleteMany({});
      await prisma.place.deleteMany({});

      await prisma.$disconnect();
      console.log('✓ Test database cleaned up');
    }
  } catch (error) {
    console.error('Failed to teardown test database:', error);
    throw error;
  }
}

export async function seedDatabase(client: PrismaClient): Promise<void> {
  // Insert places using raw SQL for geography type
  for (const p of seedPlaces) {
    await client.$executeRawUnsafe(`
      INSERT INTO "Place" (id, name, "entityType", location, address, "verificationStatus", "createdAt", "updatedAt")
      VALUES ($1, $2, $3::"EntityType", ST_GeomFromText('POINT(${p.lng} ${p.lat})', 4326), $4, $5::"VerificationStatus", NOW(), NOW())
    `, p.id, p.name, p.entityType, p.address, p.verificationStatus);
  }

  // Insert observations
  for (const obs of seedObservations) {
    const recordedAt = new Date();
    recordedAt.setDate(recordedAt.getDate() - obs.daysAgo);

    await client.priceObservation.create({
      data: {
        placeId: obs.placeId,
        itemName: obs.itemName,
        category: obs.category,
        reportedPrice: obs.reportedPrice,
        isVerified: obs.isVerified,
        recordedAt
      }
    });
  }

  // Insert profiles
    for (const m of merchants) { await client.merchantProfile.create({ data: m }); }
  for (const profile of seedProfiles) {
    await client.intelligenceProfile.create({
      data: {
        placeId: profile.placeId,
        safetyScore: profile.safetyScore,
        positiveHighlights: profile.positiveHighlights,
        thingsToKnow: profile.thingsToKnow,
        confidenceLevel: profile.confidenceLevel
      }
    });
  }
}

export async function getSeededPlaces(): Promise<any[]> {
  if (!prisma) throw new Error('Test database not initialized');
  return prisma.place.findMany({
    include: {
      priceObservations: true,
      intelligenceProfile: true
    }
  });
}

export async function getTestDB(): Promise<PrismaClient> {
  if (!prisma) throw new Error('Test database not initialized. Call setupTestDB() first.');
  return prisma;
}
