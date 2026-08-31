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

  // ── Varkala Heritage Walking Tours ─────────────────────────────
  { placeId: P[4], itemName: 'Cliff Walk Tour (2h)', category: 'service', reportedPrice: 300, isVerified: true,  daysAgo: 1 },
  { placeId: P[4], itemName: 'Cliff Walk Tour (2h)', category: 'service', reportedPrice: 350, isVerified: true,  daysAgo: 3 },
  { placeId: P[4], itemName: 'Cliff Walk Tour (2h)', category: 'service', reportedPrice: 320, isVerified: true,  daysAgo: 5 },
  { placeId: P[4], itemName: 'Cliff Walk Tour (2h)', category: 'service', reportedPrice: 1200, isVerified: false, daysAgo: 2 }, // OUTLIER
  { placeId: P[4], itemName: 'Cliff Walk Tour (2h)', category: 'service', reportedPrice: 310, isVerified: true,  daysAgo: 7 },
  { placeId: P[4], itemName: 'Temple & Beach Combo (4h)', category: 'service', reportedPrice: 600, isVerified: true,  daysAgo: 1 },
  { placeId: P[4], itemName: 'Temple & Beach Combo (4h)', category: 'service', reportedPrice: 650, isVerified: true,  daysAgo: 4 },
  { placeId: P[4], itemName: 'Temple & Beach Combo (4h)', category: 'service', reportedPrice: 580, isVerified: false, daysAgo: 6 },
  { placeId: P[4], itemName: 'Temple & Beach Combo (4h)', category: 'service', reportedPrice: 620, isVerified: true,  daysAgo: 8 },
  { placeId: P[4], itemName: 'Sunset Photo Walk (1.5h)', category: 'service', reportedPrice: 250, isVerified: true,  daysAgo: 2 },
  { placeId: P[4], itemName: 'Sunset Photo Walk (1.5h)', category: 'service', reportedPrice: 280, isVerified: true,  daysAgo: 5 },
  { placeId: P[4], itemName: 'Sunset Photo Walk (1.5h)', category: 'service', reportedPrice: 900, isVerified: false, daysAgo: 3 }, // OUTLIER

  // ── Martins Corner (Goa) ───────────────────────────────────────
  { placeId: P[5], itemName: 'Crab Curry with Rice', category: 'food', reportedPrice: 420, isVerified: true,  daysAgo: 1 },
  { placeId: P[5], itemName: 'Crab Curry with Rice', category: 'food', reportedPrice: 450, isVerified: true,  daysAgo: 3 },
  { placeId: P[5], itemName: 'Crab Curry with Rice', category: 'food', reportedPrice: 400, isVerified: true,  daysAgo: 5 },
  { placeId: P[5], itemName: 'Crab Curry with Rice', category: 'food', reportedPrice: 430, isVerified: false, daysAgo: 7 },
  { placeId: P[5], itemName: 'Crab Curry with Rice', category: 'food', reportedPrice: 1500, isVerified: false, daysAgo: 2 }, // OUTLIER
  { placeId: P[5], itemName: 'Fish Fry Plate',      category: 'food', reportedPrice: 350, isVerified: true,  daysAgo: 1 },
  { placeId: P[5], itemName: 'Fish Fry Plate',      category: 'food', reportedPrice: 380, isVerified: true,  daysAgo: 4 },
  { placeId: P[5], itemName: 'Fish Fry Plate',      category: 'food', reportedPrice: 360, isVerified: false, daysAgo: 6 },
  { placeId: P[5], itemName: 'Fish Fry Plate',      category: 'food', reportedPrice: 370, isVerified: true,  daysAgo: 8 },
  { placeId: P[5], itemName: 'Beer (Large)',        category: 'beverage', reportedPrice: 120, isVerified: true,  daysAgo: 2 },
  { placeId: P[5], itemName: 'Beer (Large)',        category: 'beverage', reportedPrice: 130, isVerified: true,  daysAgo: 5 },
  { placeId: P[5], itemName: 'Beer (Large)',        category: 'beverage', reportedPrice: 125, isVerified: false, daysAgo: 7 },
  { placeId: P[5], itemName: 'Beer (Large)',        category: 'beverage', reportedPrice: 450, isVerified: false, daysAgo: 3 }, // OUTLIER

  // ── Curlies Beach Shack (Goa) ──────────────────────────────────
  { placeId: P[6], itemName: 'Goan Fish Curry',     category: 'food', reportedPrice: 280, isVerified: true,  daysAgo: 1 },
  { placeId: P[6], itemName: 'Goan Fish Curry',     category: 'food', reportedPrice: 300, isVerified: true,  daysAgo: 3 },
  { placeId: P[6], itemName: 'Goan Fish Curry',     category: 'food', reportedPrice: 290, isVerified: false, daysAgo: 5 },
  { placeId: P[6], itemName: 'Goan Fish Curry',     category: 'food', reportedPrice: 250, isVerified: true,  daysAgo: 7 },
  { placeId: P[6], itemName: 'Goan Fish Curry',     category: 'food', reportedPrice: 1100, isVerified: false, daysAgo: 2 }, // OUTLIER
  { placeId: P[6], itemName: 'Prawn Fried Rice',    category: 'food', reportedPrice: 220, isVerified: true,  daysAgo: 1 },
  { placeId: P[6], itemName: 'Prawn Fried Rice',    category: 'food', reportedPrice: 240, isVerified: true,  daysAgo: 4 },
  { placeId: P[6], itemName: 'Prawn Fried Rice',    category: 'food', reportedPrice: 230, isVerified: false, daysAgo: 6 },
  { placeId: P[6], itemName: 'Prawn Fried Rice',    category: 'food', reportedPrice: 210, isVerified: true,  daysAgo: 8 },
  { placeId: P[6], itemName: 'Mojito',              category: 'beverage', reportedPrice: 180, isVerified: true,  daysAgo: 2 },
  { placeId: P[6], itemName: 'Mojito',              category: 'beverage', reportedPrice: 200, isVerified: true,  daysAgo: 5 },
  { placeId: P[6], itemName: 'Mojito',              category: 'beverage', reportedPrice: 190, isVerified: false, daysAgo: 7 },
  { placeId: P[6], itemName: 'Mojito',              category: 'beverage', reportedPrice: 650, isVerified: false, daysAgo: 3 }, // OUTLIER

  // ── Palolem Beach Resort (Goa) ─────────────────────────────────
  { placeId: P[7], itemName: 'Beach Hut (Single)',   category: 'accommodation', reportedPrice: 1500, isVerified: true,  daysAgo: 1 },
  { placeId: P[7], itemName: 'Beach Hut (Single)',   category: 'accommodation', reportedPrice: 1600, isVerified: true,  daysAgo: 5 },
  { placeId: P[7], itemName: 'Beach Hut (Single)',   category: 'accommodation', reportedPrice: 1550, isVerified: false, daysAgo: 10 },
  { placeId: P[7], itemName: 'Beach Hut (Single)',   category: 'accommodation', reportedPrice: 1700, isVerified: true,  daysAgo: 15 },
  { placeId: P[7], itemName: 'Beach Hut (Single)',   category: 'accommodation', reportedPrice: 5500, isVerified: false, daysAgo: 3 }, // OUTLIER
  { placeId: P[7], itemName: 'Standard Room (A/C)',  category: 'accommodation', reportedPrice: 3000, isVerified: true,  daysAgo: 2 },
  { placeId: P[7], itemName: 'Standard Room (A/C)',  category: 'accommodation', reportedPrice: 3200, isVerified: true,  daysAgo: 7 },
  { placeId: P[7], itemName: 'Standard Room (A/C)',  category: 'accommodation', reportedPrice: 3100, isVerified: false, daysAgo: 12 },
  { placeId: P[7], itemName: 'Standard Room (A/C)',  category: 'accommodation', reportedPrice: 2900, isVerified: true,  daysAgo: 14 },
  { placeId: P[7], itemName: 'Deluxe Sea-view',     category: 'accommodation', reportedPrice: 5000, isVerified: true,  daysAgo: 3 },
  { placeId: P[7], itemName: 'Deluxe Sea-view',     category: 'accommodation', reportedPrice: 5200, isVerified: true,  daysAgo: 8 },
  { placeId: P[7], itemName: 'Deluxe Sea-view',     category: 'accommodation', reportedPrice: 5100, isVerified: false, daysAgo: 13 },

  // ── Pilot Auto Taxi - Calangute (Goa) ──────────────────────────
  { placeId: P[8], itemName: 'Auto to Colva Beach',  category: 'transport', reportedPrice: 180, isVerified: true,  daysAgo: 1 },
  { placeId: P[8], itemName: 'Auto to Colva Beach',  category: 'transport', reportedPrice: 200, isVerified: true,  daysAgo: 2 },
  { placeId: P[8], itemName: 'Auto to Colva Beach',  category: 'transport', reportedPrice: 190, isVerified: true,  daysAgo: 4 },
  { placeId: P[8], itemName: 'Auto to Colva Beach',  category: 'transport', reportedPrice: 170, isVerified: false, daysAgo: 6 },
  { placeId: P[8], itemName: 'Auto to Colva Beach',  category: 'transport', reportedPrice: 700, isVerified: false, daysAgo: 3 }, // OUTLIER
  { placeId: P[8], itemName: 'Auto to Airport',      category: 'transport', reportedPrice: 500, isVerified: true,  daysAgo: 1 },
  { placeId: P[8], itemName: 'Auto to Airport',      category: 'transport', reportedPrice: 520, isVerified: true,  daysAgo: 3 },
  { placeId: P[8], itemName: 'Auto to Airport',      category: 'transport', reportedPrice: 480, isVerified: false, daysAgo: 5 },
  { placeId: P[8], itemName: 'Auto to Airport',      category: 'transport', reportedPrice: 510, isVerified: true,  daysAgo: 7 },
  { placeId: P[8], itemName: 'Auto to Panjim',       category: 'transport', reportedPrice: 300, isVerified: true,  daysAgo: 2 },
  { placeId: P[8], itemName: 'Auto to Panjim',       category: 'transport', reportedPrice: 320, isVerified: true,  daysAgo: 4 },
  { placeId: P[8], itemName: 'Auto to Panjim',       category: 'transport', reportedPrice: 290, isVerified: false, daysAgo: 6 },
  { placeId: P[8], itemName: 'Auto to Panjim',       category: 'transport', reportedPrice: 1200, isVerified: false, daysAgo: 1 }, // OUTLIER

  // ── Goa Heritage Trail Guides ──────────────────────────────────
  { placeId: P[9], itemName: 'Old Goa Walk (3h)',    category: 'service', reportedPrice: 400, isVerified: true,  daysAgo: 1 },
  { placeId: P[9], itemName: 'Old Goa Walk (3h)',    category: 'service', reportedPrice: 450, isVerified: true,  daysAgo: 3 },
  { placeId: P[9], itemName: 'Old Goa Walk (3h)',    category: 'service', reportedPrice: 420, isVerified: true,  daysAgo: 5 },
  { placeId: P[9], itemName: 'Old Goa Walk (3h)',    category: 'service', reportedPrice: 430, isVerified: false, daysAgo: 7 },
  { placeId: P[9], itemName: 'Old Goa Walk (3h)',    category: 'service', reportedPrice: 1400, isVerified: false, daysAgo: 2 }, // OUTLIER
  { placeId: P[9], itemName: 'Fort Aguada Tour (2h)', category: 'service', reportedPrice: 300, isVerified: true,  daysAgo: 1 },
  { placeId: P[9], itemName: 'Fort Aguada Tour (2h)', category: 'service', reportedPrice: 320, isVerified: true,  daysAgo: 4 },
  { placeId: P[9], itemName: 'Fort Aguada Tour (2h)', category: 'service', reportedPrice: 310, isVerified: false, daysAgo: 6 },
  { placeId: P[9], itemName: 'Fort Aguada Tour (2h)', category: 'service', reportedPrice: 290, isVerified: true,  daysAgo: 8 },
  { placeId: P[9], itemName: 'Spice Plantation Day', category: 'service', reportedPrice: 800, isVerified: true,  daysAgo: 2 },
  { placeId: P[9], itemName: 'Spice Plantation Day', category: 'service', reportedPrice: 850, isVerified: true,  daysAgo: 5 },
  { placeId: P[9], itemName: 'Spice Plantation Day', category: 'service', reportedPrice: 820, isVerified: false, daysAgo: 7 },
  { placeId: P[9], itemName: 'Spice Plantation Day', category: 'service', reportedPrice: 2600, isVerified: false, daysAgo: 3 }, // OUTLIER
];
