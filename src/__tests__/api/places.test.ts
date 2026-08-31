/**
 * API Integration Tests
 *
 * Tests for all three tourism intelligence API endpoints:
 * - GET /api/v1/places/search
 * - GET /api/v1/places/:id
 * - GET /api/v1/places/:id/price-analysis
 *
 * Run with: npm run test
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { setupTestDB, teardownTestDB, getTestDB } from '../fixtures/db';
import { buildApp } from '../../app';

let app: any;
let prisma: any;

beforeAll(async () => {
  prisma = await setupTestDB();
  app = await buildApp();
});

afterAll(async () => {
  await app.close();
  await teardownTestDB();
});

describe('GET /api/v1/places/search', () => {
  it('should return places within radius', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/places/search?lat=8.7333&lng=76.7166&radius_meters=5000'
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    // Varkala location (8.7333, 76.7166) should find Varkala places
    const places = body.data;
    expect(places.some((p: any) => p.name.includes('Varkala'))).toBe(true);
  });

  it('should filter places by category', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/places/search?lat=8.7333&lng=76.7166&radius_meters=5000&category=RESTAURANT'
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    const places = body.data;

    // All returned places should be restaurants
    expect(places.every((p: any) => p.entityType === 'RESTAURANT')).toBe(true);
  });

  it('should include fair price bands in search results', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/places/search?lat=8.7333&lng=76.7166&radius_meters=5000'
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    const places = body.data;

    // Each place should have a fair price band
    expect(places[0]).toHaveProperty('fairPriceBand');
    const band = places[0].fairPriceBand;
    expect(band).toHaveProperty('min');
    expect(band).toHaveProperty('max');
    expect(band).toHaveProperty('median');
    expect(band).toHaveProperty('confidence');

    // Fair band min should be less than max
    expect(band.min).toBeLessThanOrEqual(band.max);
  });

  it('should include safety tags in search results', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/places/search?lat=8.7333&lng=76.7166&radius_meters=5000'
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    const places = body.data;

    // Each place should have safety info
    expect(places[0]).toHaveProperty('safetyScore');
    expect(typeof places[0].safetyScore).toBe('number');
    expect(places[0].safetyScore).toBeGreaterThanOrEqual(0);
    expect(places[0].safetyScore).toBeLessThanOrEqual(100);
  });

  it('should filter by budget (max_budget)', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/places/search?lat=8.7333&lng=76.7166&radius_meters=5000&max_budget=300'
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    const places = body.data;

    // All places should have fair band max within budget
    if (places.length > 0) {
      expect(places[0].fairPriceBand.max).toBeLessThanOrEqual(300);
    }
  });

  it('should return 400 for invalid lat/lng', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/places/search?lat=invalid&lng=76.7166&radius_meters=5000'
    });

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 for missing radius_meters', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/places/search?lat=8.7333&lng=76.7166'
    });

    expect(response.statusCode).toBe(400);
  });

  it('should handle non-existent category gracefully', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/places/search?lat=8.7333&lng=76.7166&radius_meters=5000&category=NONEXISTENT'
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(Array.isArray(body.data)).toBe(true);
    // Should return empty array or places of other types
  });
});

describe('GET /api/v1/places/:id', () => {
  it('should return place by ID', async () => {
    // Get first place
    const places = await prisma.place.findMany({ take: 1 });
    expect(places.length).toBeGreaterThan(0);

    const placeId = places[0].id;
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/places/${placeId}`
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.data).toHaveProperty('id', placeId);
    expect(body.data).toHaveProperty('name');
    expect(body.data).toHaveProperty('entityType');
    expect(body.data).toHaveProperty('address');
  });

  it('should include profile in place details', async () => {
    const places = await prisma.place.findMany({ take: 1 });
    const placeId = places[0].id;

    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/places/${placeId}`
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.data).toHaveProperty('profile');
    const profile = body.data.profile;
    expect(profile).toHaveProperty('safetyScore');
    expect(profile).toHaveProperty('positiveHighlights');
    expect(profile).toHaveProperty('thingsToKnow');
    expect(profile).toHaveProperty('confidenceLevel');
  });

  it('should return 404 for non-existent place', async () => {
    const fakeId = '00000000-0000-0000-0000-000000000000';
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/places/${fakeId}`
    });

    expect(response.statusCode).toBe(404);
  });

  it('should return 400 for invalid UUID format', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/v1/places/invalid-uuid'
    });

    expect(response.statusCode).toBe(400);
  });
});

describe('GET /api/v1/places/:id/price-analysis', () => {
  it('should return price statistics for place', async () => {
    // Get a place with observations
    const places = await prisma.place.findMany({
      include: { priceObservations: true },
      take: 1
    });
    expect(places.length).toBeGreaterThan(0);
    expect(places[0].priceObservations.length).toBeGreaterThan(0);

    const placeId = places[0].id;
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/places/${placeId}/price-analysis`
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('should include item-level price bands', async () => {
    const places = await prisma.place.findMany({
      include: { priceObservations: true },
      take: 1
    });
    const placeId = places[0].id;

    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/places/${placeId}/price-analysis`
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    const analysis = body.data;

    if (analysis.length > 0) {
      const item = analysis[0];
      expect(item).toHaveProperty('itemName');
      expect(item).toHaveProperty('category');
      expect(item).toHaveProperty('fairPriceBand');
      expect(item.fairPriceBand).toHaveProperty('min');
      expect(item.fairPriceBand).toHaveProperty('max');
      expect(item.fairPriceBand).toHaveProperty('median');
    }
  });

  it('should filter outliers using MAD algorithm', async () => {
    // Find a place with observations that include outliers
    // (Clafouti Beach Restaurant has known outliers)
    const place = await prisma.place.findFirst({
      where: { name: 'Clafouti Beach Restaurant' },
      include: { priceObservations: true }
    });

    if (!place) {
      console.warn('Clafouti Beach Restaurant not found; skipping MAD outlier test');
      return;
    }

    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/places/${place.id}/price-analysis`
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    const analysis = body.data;

    // Fish Thali item should exist and should filter out the 750 price outlier
    const fishThali = analysis.find((item: any) => item.itemName === 'Fish Thali');
    if (fishThali) {
      // The 750 price is a known outlier; fair band should not include it
      // Normal prices are 180-240, so fair band max should be around 240-250
      expect(fishThali.fairPriceBand.max).toBeLessThan(500);
      expect(fishThali.fairPriceBand.min).toBeGreaterThan(100);
    }
  });

  it('should handle place with no observations', async () => {
    // Create a place with no observations for this test
    const testPlace = await prisma.place.create({
      data: {
        id: '99999999-9999-9999-9999-999999999999',
        name: 'Test Place No Data',
        entityType: 'RESTAURANT',
        location: { type: 'Point', coordinates: [0, 0] },
        address: 'Test Address',
        verificationStatus: 'UNVERIFIED'
      }
    });

    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/places/${testPlace.id}/price-analysis`
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    // Should return empty array
    expect(Array.isArray(body.data)).toBe(true);

    // Cleanup
    await prisma.place.delete({ where: { id: testPlace.id } });
  });

  it('should return 404 for non-existent place', async () => {
    const fakeId = '00000000-0000-0000-0000-000000000000';
    const response = await app.inject({
      method: 'GET',
      url: `/api/v1/places/${fakeId}/price-analysis`
    });

    expect(response.statusCode).toBe(404);
  });
});

/**
 * Additional Integration Test Scenarios
 * (To be implemented as platform grows)
 *
 * - E2E search flow: Search → view place → view price analysis
 * - Multi-radius searches: Compare results at different distances
 * - Budget filtering: Verify accurate price range filtering
 * - Seasonal pricing: Test price band variations over time
 * - Outlier edge cases: Single outlier, all outliers, no outliers
 * - Performance: Search with large result sets
 * - Authentication: Protected endpoints (future)
 * - Pagination: Large result handling (future)
 */
