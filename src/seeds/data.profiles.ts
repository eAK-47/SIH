import { SeedProfile } from './data.places';

export const profiles: SeedProfile[] = [
  {
    placeId: '11111111-1111-1111-1111-111111111101', // P[0] Vallikavu Auto Stand
    safetyScore: 80,
    confidenceLevel: 88,
    positiveHighlights: ['Official board rates for railway station drops', 'Regulated central stand location'],
    thingsToKnow: ['Late-night post-10 PM fares diverge up to ₹450 without meter usage (3 reports)', 'Confirm temple drop rates during festival days (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111102', // P[1] Amritapuri Gate Stand
    safetyScore: 82,
    confidenceLevel: 85,
    positiveHighlights: ['Convenient location right outside main gate'],
    thingsToKnow: ['Standard pricing during normal hours']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111103', // P[2] Vavvakkavu Junction Auto Stand
    safetyScore: 78,
    confidenceLevel: 80,
    positiveHighlights: ['Crucial transport link from NH 66'],
    thingsToKnow: ['Always confirm rate before boarding due to unverified status']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111104', // P[3] Amritham Meals
    safetyScore: 86,
    confidenceLevel: 90,
    positiveHighlights: ['Traditional Kerala Sadya at fixed ₹100 rate', 'Quick service and clean dining'],
    thingsToKnow: ['Daily fish specials (Karimeen) billed at premium flat rates; confirm rate per piece prior to cooking (3 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111105', // P[4] Kollam Feast Beach Restaurant
    safetyScore: 83,
    confidenceLevel: 86,
    positiveHighlights: ['Great quality seafood', 'Nice view of the beach'],
    thingsToKnow: ['Special items can have inflated prices during peak season based on reports']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111106', // P[5] Beachside Refreshments
    safetyScore: 80,
    confidenceLevel: 82,
    positiveHighlights: ['Quick refreshments right on the beach'],
    thingsToKnow: ['Check prices for tender coconut as some outliers reported']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111107', // P[6] Alumkadavu Boat Jetty
    safetyScore: 74,
    confidenceLevel: 85,
    positiveHighlights: ['Government-regulated counter rates for canoes and shikaras', 'Direct backwater access'],
    thingsToKnow: ['Roadside agents 200m before main gate quote up to 2.5x commission; proceed directly to the official jetty desk (4 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111108', // P[7] Backwater Kayak Hub
    safetyScore: 88,
    confidenceLevel: 84,
    positiveHighlights: ['Safe equipment', 'Beautiful kayaking routes'],
    thingsToKnow: ['Arrive early during holiday weekends to ensure availability']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111109', // P[8] Amrita Bike & Scooter Rentals
    safetyScore: 84,
    confidenceLevel: 82,
    positiveHighlights: ['Standard ₹400 daily Activa rate', 'Helmets and vehicle documentation provided'],
    thingsToKnow: ['Confirm written rental agreement card during weekend peak rush to prevent disputed return surcharges (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111110', // P[9] Vallikavu Cycle Point
    safetyScore: 85,
    confidenceLevel: 88,
    positiveHighlights: ['Eco-friendly and affordable transport'],
    thingsToKnow: ['Ensure cycle condition before renting']
  }
];
