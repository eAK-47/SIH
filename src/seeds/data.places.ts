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
  { id: '11111111-1111-1111-1111-111111111114', name: 'KIMS Multispeciality Hospital Karunagappally', entityType: 'HOTEL', lat: 9.0610, lng: 76.5320, address: 'KIMS Junction, Karunagappally, Kerala 690518',            verificationStatus: 'VERIFIED' },

  // ═══ LOCAL RESTAURANTS & DINING (seeded RESTAURANT) ═══
  { id: '11111111-1111-1111-1111-111111111115', name: 'Green Park Family Restaurant',      entityType: 'RESTAURANT', lat: 9.0917, lng: 76.5181, address: 'Near Bus Stand, Vallikavu, Kerala',                 verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111116', name: 'Hot Pot Restaurant',                entityType: 'RESTAURANT', lat: 9.0906, lng: 76.5171, address: 'Amritapuri Road, Vallikavu, Kerala',               verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111117', name: 'Chill Out Restaurant',              entityType: 'RESTAURANT', lat: 9.0913, lng: 76.5174, address: 'Main Road, Vallikavu, Kerala',                    verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111118', name: 'Chick Hub',                         entityType: 'RESTAURANT', lat: 9.0924, lng: 76.5183, address: 'Near Footbridge, Vallikavu, Kerala',              verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111119', name: 'Avila Kitchen',                     entityType: 'RESTAURANT', lat: 9.0885, lng: 76.5290, address: 'Vavvakkavu Road, Vallikavu, Kerala',               verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111120', name: 'Karthika Hotel',                    entityType: 'RESTAURANT', lat: 9.0931, lng: 76.5187, address: 'Karthika Junction, Vallikavu, Kerala',             verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111121', name: 'Bhuwaneshwari Hotel',               entityType: 'RESTAURANT', lat: 9.0909, lng: 76.5172, address: 'Bhuwaneshwari, Vallikavu, Kerala',                 verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111122', name: 'Campus Cafe 3.0',                   entityType: 'RESTAURANT', lat: 9.0895, lng: 76.5165, address: 'Amritapuri Campus Road, Vallikavu, Kerala',         verificationStatus: 'TRUSTED' },
  { id: '11111111-1111-1111-1111-111111111123', name: 'Mathas Hotel',                      entityType: 'RESTAURANT', lat: 9.0933, lng: 76.5189, address: 'Main Road, Vallikavu, Kerala',                    verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111124', name: 'Usthad Hotel',                      entityType: 'RESTAURANT', lat: 9.0911, lng: 76.5173, address: 'Amritapuri Road, Vallikavu, Kerala',               verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111125', name: 'Lake View Hotel',                   entityType: 'RESTAURANT', lat: 9.0870, lng: 76.5330, address: 'Lake View, Alumkadavu, Kerala',                    verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111126', name: 'Nadan Swath',                       entityType: 'RESTAURANT', lat: 9.0942, lng: 76.5196, address: 'Nadan Swath Road, Vallikavu, Kerala',              verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111127', name: 'Lalitha Hotel',                     entityType: 'RESTAURANT', lat: 9.0926, lng: 76.5184, address: 'Near Footbridge, Vallikavu, Kerala',               verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111128', name: 'Ohamkaram Hotel',                   entityType: 'RESTAURANT', lat: 9.0890, lng: 76.5210, address: 'Ohamkaram Road, Vallikavu, Kerala',                verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111129', name: 'Ananda Tea Stall',                  entityType: 'RESTAURANT', lat: 9.0918, lng: 76.5179, address: 'Near Bus Stand, Vallikavu, Kerala',                verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111130', name: 'North Indian Dhaba Vallikavu',      entityType: 'RESTAURANT', lat: 9.0922, lng: 76.5182, address: 'NH 66 Main Road, Vallikavu, Kerala',             verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111131', name: 'Vallikavu Chicken Centre',          entityType: 'RESTAURANT', lat: 9.0936, lng: 76.5191, address: 'Chicken Centre Road, Vallikavu, Kerala',          verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111132', name: 'Namo Bakkala',                      entityType: 'RESTAURANT', lat: 9.0898, lng: 76.5164, address: 'Near Amritapuri Gate, Vallikavu, Kerala',          verificationStatus: 'TRUSTED' },
  { id: '11111111-1111-1111-1111-111111111133', name: 'Amritam Restaurant',                entityType: 'RESTAURANT', lat: 9.0904, lng: 76.5169, address: 'Amritapuri Road, Vallikavu, Kerala',               verificationStatus: 'VERIFIED' },

// ═══ LOCAL RENTALS (seeded HOTEL backend type) ═══
  { id: '11111111-1111-1111-1111-111111111134', name: 'Vallikavu Royal Rides',             entityType: 'HOTEL',      lat: 9.0915, lng: 76.5178, address: 'Near Bus Stand, Vallikavu, Kerala',                verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111135', name: 'Alumkadavu Lake Scooters',          entityType: 'HOTEL',      lat: 9.0835, lng: 76.5345, address: 'Alumkadavu Lake, Karunagappally, Kerala',         verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111136', name: 'Vavvakkavu Bike Point',             entityType: 'HOTEL',      lat: 9.0875, lng: 76.5305, address: 'NH 66, Vavvakkavu, Kerala',                        verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111137', name: 'Amritapuri Student Scooters',       entityType: 'HOTEL',      lat: 9.0901, lng: 76.5166, address: 'Amritapuri Gate 1, Vallikavu, Kerala',           verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111138', name: 'Clappana Ride Rentals',             entityType: 'HOTEL',      lat: 9.0820, lng: 76.5280, address: 'Clappana Junction, Kerala',                        verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111139', name: 'Azheekal Coast Wheels',             entityType: 'HOTEL',      lat: 9.0782, lng: 76.5142, address: 'Azheekal Beach Road, Kerala',                     verificationStatus: 'VERIFIED' },

  // ═══ BUS STOPS & KSRTC (seeded TRANSPORT backend type) ═══
  { id: '11111111-1111-1111-1111-111111111140', name: 'Vallikavu Junction Bus Stop',             entityType: 'TRANSPORT', lat: 9.0915, lng: 76.5186, address: 'Vallikavu Bridge Jn, Clappana P.O, Kerala 690546',    verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111141', name: 'Karunagappally KSRTC Bus Operating Centre', entityType: 'TRANSPORT', lat: 9.0540, lng: 76.5365, address: 'KSRTC Bus Stand Rd, Karunagappally, Kerala 690518',    verificationStatus: 'VERIFIED' }
];