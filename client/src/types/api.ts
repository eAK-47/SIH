// ═══════════════════════════════════════════════════════════
// Tourism Intelligence Platform — Frontend API Types
// ═══════════════════════════════════════════════════════════

export type EntityType = 'RESTAURANT' | 'HOTEL' | 'GUIDE' | 'TRANSPORT';
export type VerificationStatus = 'UNVERIFIED' | 'VERIFIED' | 'TRUSTED' | 'FLAGGED';

export interface FairPriceBand {
  itemName: string;
  category: string;
  lowerBound: number;
  upperBound: number;
  median: number;
  observationCount: number;
  outlierCount: number;
}

export interface SafetyTag {
  label: string;
  level: 'SAFE' | 'MODERATE' | 'CAUTION';
}

export interface IntelligenceProfile {
  placeId: string;
  safetyScore: number;
  positiveHighlights: string[];
  thingsToKnow: string[];
  confidenceLevel: number;
}

export interface PlaceSearchResult {
  id: string;
  name: string;
  entityType: EntityType;
  latitude: number;
  longitude: number;
  address: string;
  verificationStatus: VerificationStatus;
  distanceMeters?: number;
  fairPriceBands: FairPriceBand[];
  safetyTags: SafetyTag[];
  intelligenceProfile: IntelligenceProfile | null;
}

export interface SearchResponse {
  success: boolean;
  data: {
    places: PlaceSearchResult[];
    total: number;
    searchParams: Record<string, unknown>;
  };
}

export interface PlaceDetailsResponse {
  success: boolean;
  data: PlaceSearchResult;
}

export interface PriceAnalysisResponse {
  success: boolean;
  data: FairPriceBand[];
}

export interface PopVerificationResponse {
  success: boolean;
  isVerified: boolean;
  distanceMeters: number;
  message: string;
  verificationToken?: string;
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
  error?: string;
}

export interface PriceSubmitResponse {
  success: boolean;
  submissionId?: string;
  message: string;
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
