import { placeRepository } from '../repositories/place.repository';
import { priceEngineService } from './price-engine.service';
import type { SearchParams, PlaceSearchResult, FairPriceBand, SafetyTag, IntelligenceProfile } from '../types/index';

export class SpatialSearchService {
  async searchPlaces(params: SearchParams): Promise<PlaceSearchResult[]> {
    const places = await placeRepository.findNearbyPlaces(params);

    const enrichedPlaces = await Promise.all(
      places.map(async (place) => this.enrichPlace(place))
    );

    if (params.maxBudget !== undefined) {
      return enrichedPlaces.filter((place) =>
        place.fairPriceBands.some((band) => band.lowerBound <= params.maxBudget!)
      );
    }

    return enrichedPlaces;
  }

  async getPlaceDetails(placeId: string): Promise<PlaceSearchResult | null> {
    const place = await placeRepository.findById(placeId);
    if (!place) return null;
    return this.enrichPlace(place);
  }

  async getItemPriceAnalysis(placeId: string, itemName: string, category: string): Promise<FairPriceBand | null> {
    const observations = await placeRepository.getPriceObservations(placeId);
    const stats = priceEngineService.getItemPriceStats(itemName, category, observations);
    if (!stats) return null;
    return {
      itemName,
      category,
      lowerBound: stats.lowerBound,
      upperBound: stats.upperBound,
      median: stats.median,
      observationCount: stats.validPrices.length + stats.outliers.length,
      outlierCount: stats.outliers.length,
    };
  }

  private async enrichPlace(place: PlaceSearchResult): Promise<PlaceSearchResult> {
    const observations = await placeRepository.getPriceObservations(place.id);
    const fairPriceBands = priceEngineService.calculateFairPriceBands(observations);
    const intelligenceProfile = await placeRepository.getIntelligenceProfile(place.id);

    return {
      ...place,
      fairPriceBands,
      intelligenceProfile,
      safetyTags: this.generateSafetyTags(intelligenceProfile),
    };
  }

  private generateSafetyTags(profile: IntelligenceProfile | null): SafetyTag[] {
    if (!profile) return [];
    const tags: SafetyTag[] = [];
    
    if (profile.safetyScore >= 8) tags.push({ label: 'Highly Safe', level: 'SAFE' });
    else if (profile.safetyScore >= 6) tags.push({ label: 'Moderately Safe', level: 'MODERATE' });
    else tags.push({ label: 'Exercise Caution', level: 'CAUTION' });

    if (profile.confidenceLevel >= 80) tags.push({ label: 'Verified Intel', level: 'SAFE' });
    
    return tags;
  }
}

export const spatialSearchService = new SpatialSearchService();
