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

// ════════════════════════════════════════════════════════════════
// PART 2: PoP VERIFICATION & AI ADVISORY
// ════════════════════════════════════════════════════════════════

export interface PopVerificationRequest {
  userLat: number;
  userLng: number;
  placeId: string;
  userId?: string;       // optional – anonymous submissions allowed
  maxRadiusMeters?: number; // default 150m
}

export interface PopVerificationResponse {
  success: boolean;
  isVerified: boolean;
  distanceMeters: number;
  message: string;
  verificationToken?: string;
  expiresAt?: string;    // ISO date string
}

export interface AdvisoryRequest {
  placeId: string;
  forceRefresh?: boolean; // bypass cache
}

export interface AdvisoryResponse {
  success: boolean;
  advisory: {
    positiveHighlights: string[];
    thingsToKnow: string[];
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    confidenceScore: number;
    reasoning: string;
  } | null;
  cachedAt?: string;
  error?: string;
}

// ════════════════════════════════════════════════════════════════
// PART 3: PRICE SUBMISSION & MERCHANT MANAGEMENT
// ════════════════════════════════════════════════════════════════

export interface PriceSubmitRequest {
  placeId: string;
  itemName: string;
  category: string;
  reportedPrice: number;
  popToken: string;       // Proof-of-presence token from verification
  userComment?: string;
  photoUrl?: string;
}

export interface PriceSubmitResponse {
  success: boolean;
  submissionId?: string;
  message: string;
  popVerified?: boolean;
}

export interface MerchantRegisterRequest {
  businessName: string;
  email: string;
  phone: string;
  placeId: string;
  userId: string;
  businessLicensePath: string;
  taxIdPath: string;
  ownershipProofPath: string;
}

export interface MerchantDashboardResponse {
  success: boolean;
  merchant: {
    id: string;
    businessName: string;
    accountStatus: string;
  };
  place: {
    id: string;
    name: string;
    address: string;
    currentSafetyScore: number;
    verificationStatus: string;
  };
  recentSubmissions: Array<{
    id: string;
    itemName: string;
    category: string;
    reportedPrice: number;
    popVerified: boolean;
    isVerified: boolean;
    submittedAt: Date;
    userComment?: string | null;
  }>;
  submissionStats: {
    totalSubmissions: number;
    verifiedSubmissions: number;
    flaggedItems: number;
  };
  priceManagement: {
    itemCount: number;
    lastUpdated: Date | null;
    suggestedPrices: Array<{
      itemName: string;
      fairLow: number;
      fairHigh: number;
      currentMarketMedian: number;
    }>;
  };
  alerts: Array<{
    id: string;
    type: string;
    message: string;
    severity: string;
    createdAt: Date;
  }>;
}

// ════════════════════════════════════════════════════════════════
// PART 4: TRANSIT METER
// ════════════════════════════════════════════════════════════════

export interface AuditQuoteRequest {
  placeId: string;
  destLat: number;
  destLng: number;
  quotedPrice: number;
  isNightFare?: boolean;
}

export interface AuditQuoteResponse {
  success: boolean;
  audit: {
    distanceKm: number;
    durationMinutes: number;
    standardMeterFare: number;
    nightMeterFare: number;
    isGoogleLiveRouted: boolean;
    quotedPrice: number;
    regulatedFare: number;
    discrepancyPercent: number;
    status: 'FAIR' | 'MODERATE_SURGE' | 'SEVERE_GOUGING';
    recommendation: string;
  } | null;
  error?: string;
}
