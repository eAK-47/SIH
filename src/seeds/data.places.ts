/**
 * Seed Data – Tourism Intelligence Platform
 *
 * 10 realistic places (Varkala & Goa), price observations with deliberate
 * outliers for MAD testing, and intelligence profiles.
 */
import { EntityType, VerificationStatus } from '@prisma/client';

export interface SeedPlace {
  id: string;
  name: string;
  entityType: EntityType;
  lat: number;
  lng: number;
  address: string;
  verificationStatus: VerificationStatus;
}
export interface SeedObs {
  placeId: string;
  itemName: string;
  category: string;
  reportedPrice: number;
  isVerified: boolean;
  daysAgo: number;
}
export interface SeedProfile {
  placeId: string;
  safetyScore: number;
  positiveHighlights: string[];
  thingsToKnow: string[];
  confidenceLevel: number;
}

export const places: SeedPlace[] = [
  { id: '11111111-1111-1111-1111-111111111101', name: 'Clafouti Beach Restaurant',     entityType: 'RESTAURANT', lat: 8.7333,  lng: 76.7166, address: 'North Cliff, Varkala, Kerala 695141',    verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111102', name: 'Darjeeling Café',               entityType: 'RESTAURANT', lat: 8.7347,  lng: 76.7153, address: 'Cliff Rd, Varkala, Kerala 695141',       verificationStatus: 'TRUSTED'  },
  { id: '11111111-1111-1111-1111-111111111103', name: 'Varkala Marine Palace Hotel',    entityType: 'HOTEL',      lat: 8.7329,  lng: 76.7171, address: 'Temple Junction, Varkala, Kerala 695141', verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111104', name: 'Rajesh Auto Stand - Varkala',    entityType: 'TRANSPORT',  lat: 8.7322,  lng: 76.7195, address: 'Varkala Railway Stn, Kerala 695141',     verificationStatus: 'UNVERIFIED' },
  { id: '11111111-1111-1111-1111-111111111105', name: 'Varkala Heritage Walking Tours', entityType: 'GUIDE',      lat: 8.7340,  lng: 76.7160, address: 'Papanasam Beach, Varkala 695141',        verificationStatus: 'VERIFIED' },
  { id: '22222222-2222-2222-2222-222222222201', name: 'Martins Corner',                 entityType: 'RESTAURANT', lat: 15.2832, lng: 73.9862, address: 'Betalbatim, Salcete, Goa 403713',        verificationStatus: 'TRUSTED'  },
  { id: '22222222-2222-2222-2222-222222222202', name: 'Curlies Beach Shack',            entityType: 'RESTAURANT', lat: 15.5549, lng: 73.7423, address: 'Anjuna Beach, Bardez, Goa 403509',        verificationStatus: 'FLAGGED'  },
  { id: '22222222-2222-2222-2222-222222222203', name: 'Palolem Beach Resort',           entityType: 'HOTEL',      lat: 15.0100, lng: 74.0232, address: 'Palolem Beach Rd, Canacona, Goa 403702',  verificationStatus: 'VERIFIED' },
  { id: '22222222-2222-2222-2222-222222222204', name: 'Pilot Auto Taxi - Calangute',    entityType: 'TRANSPORT',  lat: 15.5437, lng: 73.7546, address: 'Calangute Junction, Bardez, Goa 403516',  verificationStatus: 'UNVERIFIED' },
  { id: '22222222-2222-2222-2222-222222222205', name: 'Goa Heritage Trail Guides',      entityType: 'GUIDE',      lat: 15.4989, lng: 73.8278, address: 'Old Goa, Tiswadi, Goa 403402',           verificationStatus: 'TRUSTED'  },
];
