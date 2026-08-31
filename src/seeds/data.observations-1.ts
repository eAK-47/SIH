import { places, SeedObs } from './data.places';

const P = places.map(p => p.id); // shorthand for place ids

export const observations: SeedObs[] = [
  // ── Clafouti Beach Restaurant (Varkala) ─────────────────────────
  { placeId: P[0], itemName: 'Fish Thali',      category: 'food',     reportedPrice: 200,  isVerified: true,  daysAgo: 1 },
  { placeId: P[0], itemName: 'Fish Thali',      category: 'food',     reportedPrice: 220,  isVerified: true,  daysAgo: 3 },
  { placeId: P[0], itemName: 'Fish Thali',      category: 'food',     reportedPrice: 180,  isVerified: true,  daysAgo: 5 },
  { placeId: P[0], itemName: 'Fish Thali',      category: 'food',     reportedPrice: 240,  isVerified: false, daysAgo: 7 },
  { placeId: P[0], itemName: 'Fish Thali',      category: 'food',     reportedPrice: 210,  isVerified: true,  daysAgo: 10 },
  { placeId: P[0], itemName: 'Fish Thali',      category: 'food',     reportedPrice: 750,  isVerified: false, daysAgo: 2 }, // OUTLIER
  { placeId: P[0], itemName: 'Fish Thali',      category: 'food',     reportedPrice: 230,  isVerified: true,  daysAgo: 4 },
  { placeId: P[0], itemName: 'Fresh Lime Soda', category: 'beverage', reportedPrice: 50,   isVerified: true,  daysAgo: 1 },
  { placeId: P[0], itemName: 'Fresh Lime Soda', category: 'beverage', reportedPrice: 60,   isVerified: true,  daysAgo: 5 },
  { placeId: P[0], itemName: 'Fresh Lime Soda', category: 'beverage', reportedPrice: 55,   isVerified: false, daysAgo: 8 },
  { placeId: P[0], itemName: 'Fresh Lime Soda', category: 'beverage', reportedPrice: 200,  isVerified: false, daysAgo: 3 }, // OUTLIER

  // ── Darjeeling Café ────────────────────────────────────────────
  { placeId: P[1], itemName: 'Filter Coffee',   category: 'beverage', reportedPrice: 80,   isVerified: true,  daysAgo: 1 },
  { placeId: P[1], itemName: 'Filter Coffee',   category: 'beverage', reportedPrice: 90,   isVerified: true,  daysAgo: 2 },
  { placeId: P[1], itemName: 'Filter Coffee',   category: 'beverage', reportedPrice: 85,   isVerified: true,  daysAgo: 4 },
  { placeId: P[1], itemName: 'Filter Coffee',   category: 'beverage', reportedPrice: 350,  isVerified: false, daysAgo: 6 }, // OUTLIER
  { placeId: P[1], itemName: 'Banana Pancake',  category: 'food',     reportedPrice: 120,  isVerified: true,  daysAgo: 1 },
  { placeId: P[1], itemName: 'Banana Pancake',  category: 'food',     reportedPrice: 130,  isVerified: true,  daysAgo: 3 },
  { placeId: P[1], itemName: 'Banana Pancake',  category: 'food',     reportedPrice: 140,  isVerified: false, daysAgo: 5 },
  { placeId: P[1], itemName: 'Banana Pancake',  category: 'food',     reportedPrice: 125,  isVerified: true,  daysAgo: 8 },

  // ── Varkala Marine Palace Hotel ────────────────────────────────
  { placeId: P[2], itemName: 'Standard Room',   category: 'accommodation', reportedPrice: 2500, isVerified: true,  daysAgo: 1 },
  { placeId: P[2], itemName: 'Standard Room',   category: 'accommodation', reportedPrice: 2800, isVerified: true,  daysAgo: 5 },
  { placeId: P[2], itemName: 'Standard Room',   category: 'accommodation', reportedPrice: 2600, isVerified: false, daysAgo: 10 },
  { placeId: P[2], itemName: 'Standard Room',   category: 'accommodation', reportedPrice: 2700, isVerified: true,  daysAgo: 15 },
  { placeId: P[2], itemName: 'Standard Room',   category: 'accommodation', reportedPrice: 8000, isVerified: false, daysAgo: 3 }, // OUTLIER
  { placeId: P[2], itemName: 'Deluxe Sea-view', category: 'accommodation', reportedPrice: 4500, isVerified: true,  daysAgo: 2 },
  { placeId: P[2], itemName: 'Deluxe Sea-view', category: 'accommodation', reportedPrice: 4800, isVerified: true,  daysAgo: 7 },
  { placeId: P[2], itemName: 'Deluxe Sea-view', category: 'accommodation', reportedPrice: 4600, isVerified: false, daysAgo: 12 },

  // ── Rajesh Auto Stand ──────────────────────────────────────────
  { placeId: P[3], itemName: 'Auto to Cliff',      category: 'transport', reportedPrice: 100, isVerified: true,  daysAgo: 1 },
  { placeId: P[3], itemName: 'Auto to Cliff',      category: 'transport', reportedPrice: 120, isVerified: false, daysAgo: 2 },
  { placeId: P[3], itemName: 'Auto to Cliff',      category: 'transport', reportedPrice: 80,  isVerified: true,  daysAgo: 4 },
  { placeId: P[3], itemName: 'Auto to Cliff',      category: 'transport', reportedPrice: 500, isVerified: false, daysAgo: 3 }, // OUTLIER
  { placeId: P[3], itemName: 'Auto to Cliff',      category: 'transport', reportedPrice: 110, isVerified: true,  daysAgo: 6 },
  { placeId: P[3], itemName: 'Auto to Cliff',      category: 'transport', reportedPrice: 90,  isVerified: true,  daysAgo: 8 },
  { placeId: P[3], itemName: 'Auto to Trivandrum', category: 'transport', reportedPrice: 900, isVerified: true,  daysAgo: 2 },
  { placeId: P[3], itemName: 'Auto to Trivandrum', category: 'transport', reportedPrice: 850, isVerified: false, daysAgo: 5 },
  { placeId: P[3], itemName: 'Auto to Trivandrum', category: 'transport', reportedPrice: 950, isVerified: true,  daysAgo: 7 },
  { placeId: P[3], itemName: 'Auto to Trivandrum', category: 'transport', reportedPrice: 2500,isVerified: false, daysAgo: 1 }, // OUTLIER
];
