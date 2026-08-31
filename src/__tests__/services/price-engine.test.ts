/**
 * Price Engine Unit Tests
 *
 * Tests for Median Absolute Deviation (MAD) algorithm implementation.
 * Validates outlier detection, fair price band calculation, and algorithm complexity.
 *
 * ALGORITHM COMPLEXITY ANALYSIS:
 * ────────────────────────────────
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 *
 * Run with: npm run test -- price-engine.test.ts
 */

import { describe, it, expect } from 'vitest';
import { PriceEngineService } from '../../services/price-engine.service';
import type { PriceObservation } from '../../types';

const priceEngineService = new PriceEngineService();

// Helper to create test observations
function createObservations(
  prices: number[],
  itemName = 'Test Item',
  category = 'food'
): PriceObservation[] {
  return prices.map(price => ({
    id: `obs-${Math.random()}`,
    placeId: 'place-123',
    itemName,
    category,
    reportedPrice: price,
    isVerified: true,
    recordedAt: new Date()
  } as PriceObservation));
}

describe('Price Engine — MAD Algorithm', () => {
  describe('Basic Fair Price Band Calculation', () => {
    it('should calculate fair price band for normal prices', () => {
      const prices = [100, 110, 105, 120, 115, 105, 110];
      const observations = createObservations(prices);
      const bands = priceEngineService.calculateFairPriceBands(observations);
      expect(bands.length).toBe(1);
      const band = bands[0];
      expect(band.lowerBound).toBeLessThanOrEqual(band.median);
      expect(band.upperBound).toBeGreaterThanOrEqual(band.median);
    });

    it('should identify median correctly', () => {
      const prices = [100, 200, 300];
      const observations = createObservations(prices);
      const bands = priceEngineService.calculateFairPriceBands(observations);
      expect(bands[0].median).toBe(200);
    });
  });

  describe('Outlier Detection & Filtering', () => {
    it('should filter high outliers', () => {
      const normalPrices = [200, 210, 220, 215, 225];
      const outlier = 750;
      const prices = [...normalPrices, outlier];
      const observations = createObservations(prices);
      const bands = priceEngineService.calculateFairPriceBands(observations);
      const band = bands[0];
      expect(band.upperBound).toBeLessThan(outlier);
      expect(band.outlierCount).toBeGreaterThan(0);
    });

    it('should filter low outliers', () => {
      const normalPrices = [200, 210, 220, 215, 225];
      const outlier = 10;
      const prices = [outlier, ...normalPrices];
      const observations = createObservations(prices);
      const bands = priceEngineService.calculateFairPriceBands(observations);
      const band = bands[0];
      expect(band.lowerBound).toBeGreaterThan(outlier);
    });

    it('should filter multiple outliers', () => {
      const normalPrices = [200, 210, 220, 215, 225];
      const outliers = [750, 800, 900];
      const prices = [...normalPrices, ...outliers];
      const observations = createObservations(prices);
      const bands = priceEngineService.calculateFairPriceBands(observations);
      const band = bands[0];
      expect(band.upperBound).toBeLessThan(750);
      expect(band.outlierCount).toBe(outliers.length);
    });
  });

  describe('Edge Cases', () => {
    it('should handle single price', () => {
      const prices = [500];
      const observations = createObservations(prices);
      const bands = priceEngineService.calculateFairPriceBands(observations);
      const band = bands[0];
      expect(band.median).toBe(500);
      expect(band.lowerBound).toBe(500);
      expect(band.upperBound).toBe(500);
    });

    it('should handle identical prices', () => {
      const prices = [200, 200, 200, 200];
      const observations = createObservations(prices);
      const bands = priceEngineService.calculateFairPriceBands(observations);
      const band = bands[0];
      expect(band.median).toBe(200);
      expect(band.lowerBound).toBe(200);
      expect(band.upperBound).toBe(200);
    });

    it('should handle empty observations', () => {
      const observations: PriceObservation[] = [];
      const bands = priceEngineService.calculateFairPriceBands(observations);
      expect(bands.length).toBe(0);
    });

    it('should handle decimal prices', () => {
      const prices = [99.99, 105.50, 110.25, 95.75];
      const observations = createObservations(prices);
      const bands = priceEngineService.calculateFairPriceBands(observations);
      const band = bands[0];
      expect(typeof band.median).toBe('number');
      expect(band.lowerBound).toBeLessThanOrEqual(band.upperBound);
    });
  });

  describe('Multi-Item Grouping', () => {
    it('should group observations by itemName and category', () => {
      const observations: PriceObservation[] = [
        ...createObservations([200, 210, 220], 'Fish Thali', 'food'),
        ...createObservations([50, 55, 60], 'Fresh Lime Soda', 'beverage')
      ];
      const bands = priceEngineService.calculateFairPriceBands(observations);
      expect(bands.length).toBe(2);
      expect(bands.map(b => b.itemName)).toContain('Fish Thali');
      expect(bands.map(b => b.itemName)).toContain('Fresh Lime Soda');
    });
  });

  describe('Real-World Scenarios', () => {
    it('should handle seafood restaurant prices with outliers', () => {
      const prices = [200, 220, 180, 240, 210, 750, 230];
      const observations = createObservations(prices, 'Fish Thali', 'food');
      const bands = priceEngineService.calculateFairPriceBands(observations);
      const band = bands[0];
      expect(band.lowerBound).toBeGreaterThan(150);
      expect(band.upperBound).toBeLessThan(300);
      expect(band.outlierCount).toBeGreaterThan(0);
    });

    it('should handle hotel room prices', () => {
      const prices = [2500, 2800, 2600, 2700, 8000];
      const observations = createObservations(prices, 'Standard Room', 'accommodation');
      const bands = priceEngineService.calculateFairPriceBands(observations);
      const band = bands[0];
      expect(band.lowerBound).toBeGreaterThan(2000);
      expect(band.upperBound).toBeLessThan(3500);
    });

    it('should handle auto taxi prices', () => {
      const prices = [900, 850, 950, 920, 2500];
      const observations = createObservations(prices, 'Auto to Trivandrum', 'transport');
      const bands = priceEngineService.calculateFairPriceBands(observations);
      const band = bands[0];
      expect(band.upperBound).toBeLessThan(1200);
    });
  });

  describe('Algorithm Complexity', () => {
    it('should complete efficiently for large datasets', () => {
      const size = 1000;
      const prices = Array.from({ length: size }, () =>
        100 + Math.random() * 50
      );
      const observations = createObservations(prices);
      const startTime = performance.now();
      const bands = priceEngineService.calculateFairPriceBands(observations);
      const endTime = performance.now();
      expect(bands.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(500);
    });
  });

  /**
   * ALGORITHM SUMMARY
   * ──────────────────
   *
   * Median Absolute Deviation (MAD) with Modified Z-Score (threshold > 3.5)
   *
   * Time Complexity: O(N log N)
   *   - Sorting prices for median: O(N log N)
   *   - Sorting deviations for MAD: O(N log N)
   *   - Total: O(N log N)
   *
   * Space Complexity: O(N)
   *   - Price arrays, deviation array, filtered prices
   *
   * Fair Price Band: 25th–75th percentile (IQR) of filtered prices
   * Confidence: Based on observation count and price variance
   */
});
