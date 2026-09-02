/**
 * Seed Data – Tourism Intelligence Platform
 *
 * Vallikavu Hub dataset.
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
  { id: '11111111-1111-1111-1111-111111111101', name: 'Vallikavu Auto Stand',               entityType: 'TRANSPORT',  lat: 9.0912,  lng: 76.5185, address: 'Vallikavu Junction, Clappana, Kerala 690546',    verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111102', name: 'Amritapuri Gate Stand',              entityType: 'TRANSPORT',  lat: 9.0905,  lng: 76.5170, address: 'Amritapuri Gate 1, Vallikavu, Kerala',           verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111103', name: 'Vavvakkavu Junction Auto Stand',     entityType: 'TRANSPORT',  lat: 9.0880,  lng: 76.5310, address: 'NH 66 Junction, Vavvakkavu, Kerala',             verificationStatus: 'UNVERIFIED' },
  { id: '11111111-1111-1111-1111-111111111104', name: 'Amritham Meals',                     entityType: 'RESTAURANT', lat: 9.0925,  lng: 76.5178, address: 'Amritapuri Road, Vallikavu, Kerala 690546',      verificationStatus: 'TRUSTED' },
  { id: '11111111-1111-1111-1111-111111111105', name: 'Kollam Feast Beach Restaurant',      entityType: 'RESTAURANT', lat: 9.0791,  lng: 76.5152, address: 'Azheekal Beach Road, Kerala',                    verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111106', name: 'Beachside Refreshments',             entityType: 'RESTAURANT', lat: 9.0780,  lng: 76.5148, address: 'Near Azheekal Light House, Kerala',              verificationStatus: 'UNVERIFIED' },
  { id: '11111111-1111-1111-1111-111111111107', name: 'Alumkadavu Boat Jetty',              entityType: 'GUIDE',      lat: 9.0831,  lng: 76.5342, address: 'Alumkadavu Boat Jetty Desk, Karunagappally',     verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111108', name: 'Backwater Kayak Hub',                entityType: 'GUIDE',      lat: 9.0855,  lng: 76.5360, address: 'Alumkadavu Backwater Hub, Karunagappally',       verificationStatus: 'TRUSTED' },
  { id: '11111111-1111-1111-1111-111111111109', name: 'Amrita Bike & Scooter Rentals',      entityType: 'HOTEL',      lat: 9.0918,  lng: 76.5172, address: 'Footbridge Road, Vallikavu, Kerala',             verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111110', name: 'Vallikavu Cycle Point',              entityType: 'HOTEL',      lat: 9.0930,  lng: 76.5189, address: 'Main Road, Vallikavu, Kerala',                   verificationStatus: 'TRUSTED' },

  // ═══ HOSPITALS & WELLNESS (medical — seeded under HOTEL backend type) ═══
  { id: '11111111-1111-1111-1111-111111111111', name: 'Amrita Ayurveda Hospital & Research Centre', entityType: 'HOTEL', lat: 9.0889, lng: 76.5167, address: 'Amritapuri, Clappana P.O, Vallikavu, Kerala 690525',      verificationStatus: 'TRUSTED' },
  { id: '11111111-1111-1111-1111-111111111112', name: 'Govt Taluk Head Quarters Hospital',           entityType: 'HOTEL', lat: 9.0525, lng: 76.5385, address: 'Hospital Road, Pada North, Karunagappally, Kerala 690518', verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111113', name: 'Parabrahma Speciality Hospital',              entityType: 'HOTEL', lat: 9.1295, lng: 76.5145, address: 'South Gate, Oachira, Kerala 690526',                      verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111114', name: 'KIMS Multispeciality Hospital Karunagappally', entityType: 'HOTEL', lat: 9.0610, lng: 76.5320, address: 'KIMS Junction, Karunagappally, Kerala 690518',            verificationStatus: 'VERIFIED' }
];
