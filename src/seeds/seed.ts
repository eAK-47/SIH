/**
 * Seed Script — Tourism Intelligence Platform
 *
 * Orchestrates database initialization:
 * 1. Verify environment
 * 2. Connect to database
 * 3. Run migrations
 * 4. Clear existing data (respecting FK constraints)
 * 5. Insert seed data (places → observations → profiles)
 * 6. Report summary
 */

import { PrismaClient } from '@prisma/client';
import { places } from './data.places';
import { observations } from './data.observations-1';
import { profiles } from './data.profiles';
import { merchants } from './data.merchants';

const prisma = new PrismaClient();

async function verifiyEnvironment(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL environment variable is not set. ' +
      'Please configure it in .env or your environment.'
    );
  }
  console.log('✓ Environment verified');
}

async function runMigrations(): Promise<void> {
  try {
    console.log('⏳ Running database migrations...');
    await prisma.$executeRawUnsafe('SELECT 1'); // Test connection
    console.log('✓ Database connection successful');
  } catch (error) {
    throw new Error(`Failed to connect to database: ${error}`);
  }
}

async function clearExistingData(): Promise<void> {
  try {
    console.log('⏳ Clearing existing data (respecting FK constraints)...');

    // Order matters due to foreign key constraints:
    // IntelligenceProfile → PriceObservation → Place
    const merchantsDeleted = await prisma.merchantProfile.deleteMany({});
    console.log(`  • Deleted ${merchantsDeleted.count} merchants`);
    const profilesDeleted = await prisma.intelligenceProfile.deleteMany({});
    console.log(`  • Deleted ${profilesDeleted.count} intelligence profiles`);

    const observationsDeleted = await prisma.priceObservation.deleteMany({});
    console.log(`  • Deleted ${observationsDeleted.count} price observations`);

    const placesDeleted = await prisma.place.deleteMany({});
    console.log(`  • Deleted ${placesDeleted.count} places`);
  } catch (error) {
    throw new Error(`Failed to clear existing data: ${error}`);
  }
}

async function insertPlaces(): Promise<void> {
  try {
    console.log('⏳ Inserting places...');

    // Use raw SQL for geography type insertion
    for (const p of places) {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "Place" (id, name, "entityType", location, address, "verificationStatus", "createdAt", "updatedAt")
        VALUES ($1, $2, $3::"EntityType", ST_GeomFromText('POINT(${p.lng} ${p.lat})', 4326), $4, $5::"VerificationStatus", NOW(), NOW())
      `, p.id, p.name, p.entityType, p.address, p.verificationStatus);
    }

    console.log(`✓ Inserted ${places.length} places`);
  } catch (error) {
    throw new Error(`Failed to insert places: ${error}`);
  }
}

async function insertObservations(): Promise<void> {
  try {
    console.log('⏳ Inserting price observations...');

    const createdObservations = await prisma.priceObservation.createMany({
      data: observations.map(obs => {
        const recordedAt = new Date();
        recordedAt.setDate(recordedAt.getDate() - obs.daysAgo);

        return {
          placeId: obs.placeId,
          itemName: obs.itemName,
          category: obs.category,
          reportedPrice: obs.reportedPrice,
          isVerified: obs.isVerified,
          recordedAt
        };
      })
    });

    console.log(`✓ Inserted ${createdObservations.count} price observations`);
  } catch (error) {
    throw new Error(`Failed to insert price observations: ${error}`);
  }
}

async function insertProfiles(): Promise<void> {
  try {
    console.log('⏳ Inserting intelligence profiles...');

    const createdProfiles = await prisma.intelligenceProfile.createMany({
      data: profiles.map(profile => ({
        placeId: profile.placeId,
        safetyScore: profile.safetyScore,
        positiveHighlights: profile.positiveHighlights,
        thingsToKnow: profile.thingsToKnow,
        confidenceLevel: profile.confidenceLevel
      }))
    });

    console.log(`✓ Inserted ${createdProfiles.count} intelligence profiles`);
  } catch (error) {
    throw new Error(`Failed to insert intelligence profiles: ${error}`);
  }
}

async function reportSummary(): Promise<void> {
  try {
    const placesCount = await prisma.place.count();
    const observationsCount = await prisma.priceObservation.count();
    const profilesCount = await prisma.intelligenceProfile.count();

    console.log('\n' + '═'.repeat(60));
    console.log('✅ SEED COMPLETE');
    console.log('═'.repeat(60));
    console.log(`  Places:      ${placesCount}`);
    console.log(`  Observations: ${observationsCount}`);
    console.log(`  Profiles:    ${profilesCount}`);
    console.log('═'.repeat(60));
  } catch (error) {
    throw new Error(`Failed to report summary: ${error}`);
  }
}

async function main(): Promise<void> {
  try {
    console.log('\n🌍 Tourism Intelligence Platform — Database Seeding\n');

    await verifiyEnvironment();
    await runMigrations();
    await clearExistingData();
    await insertPlaces();
    await insertObservations();
    await insertProfiles();
    await insertMerchants();
    await reportSummary();

    console.log('\n✨ All done! Database is ready for testing.\n');
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

async function insertMerchants(): Promise<void> {
  try {
    console.log('⏳ Inserting merchant profiles...');
    await prisma.merchantProfile.createMany({ data: merchants });
    console.log(`✓ Inserted ${merchants.length} merchant profiles`);
  } catch (error) {
    throw new Error(`Failed to insert merchant profiles: ${error}`);
  }
}
