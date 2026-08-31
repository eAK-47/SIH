// Core TypeScript interfaces for the Tourism Intelligence Platform

// ─── Enums ────────────────────────────────────────────────────────
export type EntityType = 'RESTAURANT' | 'HOTEL' | 'GUIDE' | 'TRANSPORT';
export type VerificationStatus = 'UNVERIFIED' | 'VERIFIED' | 'TRUSTED' | 'FLAGGED';

// ─── Domain Models ────────────────────────────────────────────────
export interface Place {
  id: string;
  name: string;
  entityType: EntityType;
  latitude: number;
  longitude: number;
  address: string;
  verificationStatus: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceObservation {
  id: string;
  placeId: string;
  itemName: string;
  category: string;
  reportedPrice: number;
  isVerified: boolean;
  recordedAt: Date;
}

export interface IntelligenceProfile {
  placeId: string;
  safetyScore: number;          // 0.00 – 10.00
  positiveHighlights: string[];
  thingsToKnow: string[];
  confidenceLevel: number;      // 0 – 100
  createdAt: Date;
  updatedAt: Date;
}

// ─── Search / API ─────────────────────────────────────────────────
export interface SearchParams {
  lat: number;
  lng: number;
  radiusMeters: number;
  category?: EntityType;
  maxBudget?: number;
}

export interface FairPriceBand {
  itemName: string;
  category: string;
  lowerBound: number;   // 25th percentile (fair-low)
  upperBound: number;   // 75th percentile (fair-high)
  median: number;
  observationCount: number;
  outlierCount: number;
}

export interface SafetyTag {
  label: string;
  level: 'SAFE' | 'MODERATE' | 'CAUTION';
}

export interface PlaceSearchResult extends Place {
  distanceMeters?: number;
  fairPriceBands: FairPriceBand[];
  safetyTags: SafetyTag[];
  intelligenceProfile: IntelligenceProfile | null;
}

export interface SearchResponse {
  places: PlaceSearchResult[];
  total: number;
  searchParams: SearchParams;
}

// ─── Price Engine ─────────────────────────────────────────────────
export interface PriceStatistics {
  median: number;
  mad: number;            // Median Absolute Deviation
  lowerBound: number;     // 25th percentile of valid prices
  upperBound: number;     // 75th percentile of valid prices
  outliers: number[];
  validPrices: number[];
}

export interface ModifiedZScoreResult {
  value: number;
  modifiedZScore: number;
  isOutlier: boolean;
}

// ─── Raw DB row from PostGIS query ────────────────────────────────
export interface NearbyPlaceRow {
  id: string;
  name: string;
  entityType: EntityType;
  address: string;
  verificationStatus: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
  distance_meters: number;
  lat: number;
  lng: number;
}
