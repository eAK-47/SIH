import type {
  PriceObservation,
  FairPriceBand,
  PriceStatistics,
  ModifiedZScoreResult,
} from '../types';

/**
 * Price Engine Service
 * Implements Median Absolute Deviation (MAD) based fair price calculation
 * Time Complexity: O(N log N) - due to sorting for median and percentiles
 * Space Complexity: O(N) - storing price arrays
 */
export class PriceEngineService {
  public static readonly MODIFIED_Z_SCORE_THRESHOLD = 3.5;
  public static readonly MAD_CONSTANT = 1.4826; // For normal distribution consistency

  /**
   * Calculate fair price bands for a set of price observations
   * Groups by item name and category, then computes statistics for each group
   */
  calculateFairPriceBands(observations: PriceObservation[]): FairPriceBand[] {
    // Group observations by itemName and category
    const grouped = new Map<string, PriceObservation[]>();

    for (const obs of observations) {
      const key = `${obs.itemName}|${obs.category}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(obs);
    }

    const bands: FairPriceBand[] = [];

    for (const [key, obsGroup] of grouped) {
      const [itemName, category] = key.split('|');
      const prices = obsGroup.map((o) => o.reportedPrice);

      if (prices.length === 0) continue;

      const stats = this.calculatePriceStatistics(prices);

      bands.push({
        itemName,
        category,
        lowerBound: stats.lowerBound,
        upperBound: stats.upperBound,
        median: stats.median,
        observationCount: prices.length,
        outlierCount: stats.outliers.length,
      });
    }

    return bands;
  }

  /**
   * Core statistical calculation using MAD for outlier detection
   * Time: O(N log N) - sorting dominates
   * Space: O(N) - storing sorted arrays
   */
  calculatePriceStatistics(prices: number[]): PriceStatistics {
    if (prices.length === 0) {
      return {
        median: 0,
        mad: 0,
        lowerBound: 0,
        upperBound: 0,
        outliers: [],
        validPrices: [],
      };
    }

    // Sort prices - O(N log N)
    const sortedPrices = [...prices].sort((a, b) => a - b);
    const n = sortedPrices.length;

    // Calculate median - O(1) after sort
    const median = this.calculateMedian(sortedPrices);

    // Calculate MAD (Median Absolute Deviation) - O(N) for deviations + O(N log N) for median of deviations
    const absoluteDeviations = sortedPrices.map((price) => Math.abs(price - median));
    absoluteDeviations.sort((a, b) => a - b);
    const mad = this.calculateMedian(absoluteDeviations) * PriceEngineService.MAD_CONSTANT;

    // Calculate Modified Z-Scores and identify outliers - O(N)
    const modifiedZScores: ModifiedZScoreResult[] = sortedPrices.map((price) => {
      const modifiedZScore = mad === 0 ? 0 : (0.6745 * (price - median)) / mad;
      return {
        value: price,
        modifiedZScore,
        isOutlier: Math.abs(modifiedZScore) > PriceEngineService.MODIFIED_Z_SCORE_THRESHOLD,
      };
    });

    // Separate outliers from valid prices
    const outliers = modifiedZScores
      .filter((r) => r.isOutlier)
      .map((r) => r.value);

    const validPrices = modifiedZScores
      .filter((r) => !r.isOutlier)
      .map((r) => r.value);

    // Calculate percentiles on valid prices (25th and 75th) - O(N log N) for sort
    const sortedValidPrices = [...validPrices].sort((a, b) => a - b);
    const lowerBound = this.calculatePercentile(sortedValidPrices, 25);
    const upperBound = this.calculatePercentile(sortedValidPrices, 75);

    return {
      median,
      mad,
      lowerBound,
      upperBound,
      outliers,
      validPrices: sortedValidPrices,
    };
  }

  /**
   * Calculate median of a sorted array - O(1)
   */
  private calculateMedian(sortedArray: number[]): number {
    const n = sortedArray.length;
    if (n === 0) return 0;
    if (n % 2 === 0) {
      return (sortedArray[n / 2 - 1] + sortedArray[n / 2]) / 2;
    }
    return sortedArray[Math.floor(n / 2)];
  }

  /**
   * Calculate percentile of a sorted array - O(1) after sort
   * Uses linear interpolation (method similar to numpy.percentile)
   */
  private calculatePercentile(sortedArray: number[], percentile: number): number {
    const n = sortedArray.length;
    if (n === 0) return 0;
    if (n === 1) return sortedArray[0];

    const index = (percentile / 100) * (n - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;

    if (lower === upper) return sortedArray[lower];

    return sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight;
  }

  /**
   * Detect if a specific price is an outlier for a given item/category
   */
  isPriceOutlier(price: number, observations: PriceObservation[]): boolean {
    const prices = observations.map((o) => o.reportedPrice);
    const stats = this.calculatePriceStatistics(prices);
    return stats.outliers.includes(price);
  }

  /**
   * Get price statistics for a specific item/category
   */
  getItemPriceStats(itemName: string, category: string, observations: PriceObservation[]): PriceStatistics | null {
    const filtered = observations.filter(
      (o) => o.itemName === itemName && o.category === category
    );

    if (filtered.length === 0) return null;

    const prices = filtered.map((o) => o.reportedPrice);
    return this.calculatePriceStatistics(prices);
  }
}

export const priceEngineService = new PriceEngineService();