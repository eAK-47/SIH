const fs = require('fs');

const placesPath = '/home/om/Documents/sih/src/seeds/data.places.ts';
let placesContent = fs.readFileSync(placesPath, 'utf8');

const newPlaces = `
  { id: '11111111-1111-1111-1111-111111111111', name: 'Karunagappally KSRTC Auto Stand',     entityType: 'TRANSPORT',  lat: 9.0545,  lng: 76.5361, address: 'KSRTC Bus Station, Karunagappally', verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111112', name: 'Ochira Temple South Gate Stand',      entityType: 'TRANSPORT',  lat: 9.1312,  lng: 76.5160, address: 'Ochira Temple South Gate',          verificationStatus: 'TRUSTED' },
  { id: '11111111-1111-1111-1111-111111111113', name: 'Azheekal Harbour Auto Stand',         entityType: 'TRANSPORT',  lat: 9.1280,  lng: 76.4795, address: 'Azheekal Fishing Harbour',          verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111114', name: 'Clappana Junction Taxi & Auto Point', entityType: 'TRANSPORT',  lat: 9.1021,  lng: 76.5123, address: 'Clappana Junction',                 verificationStatus: 'UNVERIFIED' },
  { id: '11111111-1111-1111-1111-111111111115', name: 'Amma Canteen & Dining Hall',          entityType: 'RESTAURANT', lat: 9.0898,  lng: 76.5164, address: 'Amritapuri Ashram Complex',         verificationStatus: 'TRUSTED' },
  { id: '11111111-1111-1111-1111-111111111116', name: 'Hotel Annapoorna Vegetarian',         entityType: 'RESTAURANT', lat: 9.0552,  lng: 76.5358, address: 'Near KSRTC, Karunagappally',        verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111117', name: 'Malabar Bites & Sea Food',            entityType: 'RESTAURANT', lat: 9.0815,  lng: 76.5190, address: 'Vallikavu-Karunagappally Road',     verificationStatus: 'UNVERIFIED' },
  { id: '11111111-1111-1111-1111-111111111118', name: 'Azheekal Beach Walk Cafe',            entityType: 'RESTAURANT', lat: 9.1250,  lng: 76.4842, address: 'Azheekal Beach Walkway',            verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111119', name: 'Azheekal Pulimuttu Boating Desk',     entityType: 'GUIDE',      lat: 9.1265,  lng: 76.4811, address: 'Azheekal Harbour Promenade',        verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111120', name: 'Kayamkulam Kayal Boating Club',       entityType: 'GUIDE',      lat: 9.1350,  lng: 76.4950, address: 'Kayamkulam Kayal Municipal Desk',   verificationStatus: 'TRUSTED' },
  { id: '11111111-1111-1111-1111-111111111121', name: 'Clappana Two-Wheeler Services',       entityType: 'HOTEL',      lat: 9.1015,  lng: 76.5130, address: 'Clappana Main Road',                verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111122', name: 'Amritapuri Student Cycle Exchange',   entityType: 'HOTEL',      lat: 9.0910,  lng: 76.5175, address: 'Vallikavu University Road',         verificationStatus: 'VERIFIED' },
  { id: '11111111-1111-1111-1111-111111111123', name: 'Coastal Riders Azheekal',             entityType: 'HOTEL',      lat: 9.1240,  lng: 76.4860, address: 'Azheekal Beach Strip',              verificationStatus: 'UNVERIFIED' }
`;

placesContent = placesContent.replace(/\];$/, newPlaces + '\n];');
fs.writeFileSync(placesPath, placesContent);

const obsPath = '/home/om/Documents/sih/src/seeds/data.observations-1.ts';
let obsContent = fs.readFileSync(obsPath, 'utf8');

const additionalObs = `
  // Karunagappally KSRTC Auto Stand (P[10])
  { placeId: P[10], itemName: 'Auto to Amritapuri/Vallikavu', category: 'transport', reportedPrice: 280, isVerified: true,  daysAgo: 1 },
  { placeId: P[10], itemName: 'Auto to Amritapuri/Vallikavu', category: 'transport', reportedPrice: 280, isVerified: true,  daysAgo: 2 },
  { placeId: P[10], itemName: 'Auto to Amritapuri/Vallikavu', category: 'transport', reportedPrice: 290, isVerified: true,  daysAgo: 3 },
  { placeId: P[10], itemName: 'Auto to Amritapuri/Vallikavu', category: 'transport', reportedPrice: 550, isVerified: false, daysAgo: 1 },

  // Ochira Temple South Gate Stand (P[11])
  { placeId: P[11], itemName: 'Ochira to Vallikavu Footbridge', category: 'transport', reportedPrice: 140, isVerified: true,  daysAgo: 1 },
  { placeId: P[11], itemName: 'Ochira to Vallikavu Footbridge', category: 'transport', reportedPrice: 140, isVerified: true,  daysAgo: 4 },
  { placeId: P[11], itemName: 'Ochira to Vallikavu Footbridge', category: 'transport', reportedPrice: 150, isVerified: true,  daysAgo: 5 },
  { placeId: P[11], itemName: 'Ochira to Vallikavu Footbridge', category: 'transport', reportedPrice: 300, isVerified: false, daysAgo: 2 },

  // Azheekal Harbour Auto Stand (P[12])
  { placeId: P[12], itemName: 'Harbour to Karunagappally Town', category: 'transport', reportedPrice: 250, isVerified: true,  daysAgo: 2 },
  { placeId: P[12], itemName: 'Harbour to Karunagappally Town', category: 'transport', reportedPrice: 250, isVerified: true,  daysAgo: 3 },
  { placeId: P[12], itemName: 'Harbour to Karunagappally Town', category: 'transport', reportedPrice: 260, isVerified: true,  daysAgo: 6 },
  { placeId: P[12], itemName: 'Harbour to Karunagappally Town', category: 'transport', reportedPrice: 450, isVerified: false, daysAgo: 1 },

  // Clappana Junction Taxi & Auto Point (P[13])
  { placeId: P[13], itemName: 'Clappana to Ochira Railway Gate', category: 'transport', reportedPrice: 80,  isVerified: true,  daysAgo: 1 },
  { placeId: P[13], itemName: 'Clappana to Ochira Railway Gate', category: 'transport', reportedPrice: 80,  isVerified: true,  daysAgo: 3 },
  { placeId: P[13], itemName: 'Clappana to Ochira Railway Gate', category: 'transport', reportedPrice: 90,  isVerified: true,  daysAgo: 4 },
  { placeId: P[13], itemName: 'Clappana to Ochira Railway Gate', category: 'transport', reportedPrice: 180, isVerified: false, daysAgo: 2 },

  // Amma Canteen & Dining Hall (P[14])
  { placeId: P[14], itemName: 'Subsidized Simple Indian Meal', category: 'food', reportedPrice: 40, isVerified: true, daysAgo: 1 },
  { placeId: P[14], itemName: 'Subsidized Simple Indian Meal', category: 'food', reportedPrice: 40, isVerified: true, daysAgo: 2 },
  { placeId: P[14], itemName: 'Subsidized Simple Indian Meal', category: 'food', reportedPrice: 40, isVerified: true, daysAgo: 3 },
  { placeId: P[14], itemName: 'Western Bakery / Croissant',    category: 'food', reportedPrice: 60, isVerified: true, daysAgo: 1 },
  { placeId: P[14], itemName: 'Western Bakery / Croissant',    category: 'food', reportedPrice: 60, isVerified: true, daysAgo: 4 },
  
  // Hotel Annapoorna Vegetarian (P[15])
  { placeId: P[15], itemName: 'Ghee Roast Dosa',           category: 'food', reportedPrice: 80,  isVerified: true,  daysAgo: 2 },
  { placeId: P[15], itemName: 'Ghee Roast Dosa',           category: 'food', reportedPrice: 80,  isVerified: true,  daysAgo: 3 },
  { placeId: P[15], itemName: 'South Indian Mini Thali',   category: 'food', reportedPrice: 110, isVerified: true,  daysAgo: 1 },
  { placeId: P[15], itemName: 'South Indian Mini Thali',   category: 'food', reportedPrice: 110, isVerified: true,  daysAgo: 4 },
  { placeId: P[15], itemName: 'Bottled Mineral Water 1L',  category: 'beverage', reportedPrice: 20, isVerified: true,  daysAgo: 1 },
  { placeId: P[15], itemName: 'Bottled Mineral Water 1L',  category: 'beverage', reportedPrice: 20, isVerified: true,  daysAgo: 2 },
  { placeId: P[15], itemName: 'Bottled Mineral Water 1L',  category: 'beverage', reportedPrice: 30, isVerified: false, daysAgo: 1 },

  // Malabar Bites & Sea Food (P[16])
  { placeId: P[16], itemName: 'Kerala Parotta w/ Chicken', category: 'food', reportedPrice: 150, isVerified: true,  daysAgo: 1 },
  { placeId: P[16], itemName: 'Kerala Parotta w/ Chicken', category: 'food', reportedPrice: 150, isVerified: true,  daysAgo: 2 },
  { placeId: P[16], itemName: 'Ayala (Mackerel) Fry',      category: 'food', reportedPrice: 120, isVerified: true,  daysAgo: 3 },
  { placeId: P[16], itemName: 'Ayala (Mackerel) Fry',      category: 'food', reportedPrice: 120, isVerified: true,  daysAgo: 4 },
  { placeId: P[16], itemName: 'Nadan Crab Roast',          category: 'food', reportedPrice: 400, isVerified: true,  daysAgo: 1 }, // Added baseline valid
  { placeId: P[16], itemName: 'Nadan Crab Roast',          category: 'food', reportedPrice: 420, isVerified: true,  daysAgo: 2 }, // Added baseline valid
  { placeId: P[16], itemName: 'Nadan Crab Roast',          category: 'food', reportedPrice: 650, isVerified: false, daysAgo: 1 },

  // Azheekal Beach Walk Cafe (P[17])
  { placeId: P[17], itemName: 'Fried Ice Cream / Sundae', category: 'food', reportedPrice: 120, isVerified: true,  daysAgo: 1 },
  { placeId: P[17], itemName: 'Fried Ice Cream / Sundae', category: 'food', reportedPrice: 120, isVerified: true,  daysAgo: 3 },
  { placeId: P[17], itemName: 'Chilli Chicken Starter',   category: 'food', reportedPrice: 190, isVerified: true,  daysAgo: 1 },
  { placeId: P[17], itemName: 'Chilli Chicken Starter',   category: 'food', reportedPrice: 190, isVerified: true,  daysAgo: 2 },
  { placeId: P[17], itemName: 'Chilli Chicken Starter',   category: 'food', reportedPrice: 200, isVerified: true,  daysAgo: 4 },
  { placeId: P[17], itemName: 'Chilli Chicken Starter',   category: 'food', reportedPrice: 300, isVerified: false, daysAgo: 1 },

  // Azheekal Pulimuttu Boating Desk (P[18])
  { placeId: P[18], itemName: '15-Min Speedboat Ride', category: 'service', reportedPrice: 300, isVerified: true,  daysAgo: 1 },
  { placeId: P[18], itemName: '15-Min Speedboat Ride', category: 'service', reportedPrice: 300, isVerified: true,  daysAgo: 2 },
  { placeId: P[18], itemName: '15-Min Speedboat Ride', category: 'service', reportedPrice: 300, isVerified: true,  daysAgo: 4 },
  { placeId: P[18], itemName: '15-Min Speedboat Ride', category: 'service', reportedPrice: 600, isVerified: false, daysAgo: 1 },

  // Kayamkulam Kayal Boating Club (P[19])
  { placeId: P[19], itemName: '30-Min Pedal Boat', category: 'service', reportedPrice: 250,  isVerified: true,  daysAgo: 1 },
  { placeId: P[19], itemName: '30-Min Pedal Boat', category: 'service', reportedPrice: 250,  isVerified: true,  daysAgo: 2 },
  { placeId: P[19], itemName: '1-Hr Motor Cruise', category: 'service', reportedPrice: 1200, isVerified: true,  daysAgo: 3 },
  { placeId: P[19], itemName: '1-Hr Motor Cruise', category: 'service', reportedPrice: 1200, isVerified: true,  daysAgo: 4 },
  { placeId: P[19], itemName: '1-Hr Motor Cruise', category: 'service', reportedPrice: 1250, isVerified: true,  daysAgo: 5 },
  { placeId: P[19], itemName: '1-Hr Motor Cruise', category: 'service', reportedPrice: 2500, isVerified: false, daysAgo: 1 },

  // Clappana Two-Wheeler Services (P[20])
  { placeId: P[20], itemName: '1-Day TVS Jupiter Scooter', category: 'service', reportedPrice: 350, isVerified: true,  daysAgo: 1 },
  { placeId: P[20], itemName: '1-Day TVS Jupiter Scooter', category: 'service', reportedPrice: 350, isVerified: true,  daysAgo: 2 },
  { placeId: P[20], itemName: '1-Day TVS Jupiter Scooter', category: 'service', reportedPrice: 370, isVerified: true,  daysAgo: 3 },
  { placeId: P[20], itemName: '1-Day TVS Jupiter Scooter', category: 'service', reportedPrice: 650, isVerified: false, daysAgo: 1 },

  // Amritapuri Student Cycle Exchange (P[21])
  { placeId: P[21], itemName: '1-Week Geared Bicycle', category: 'service', reportedPrice: 400, isVerified: true,  daysAgo: 2 },
  { placeId: P[21], itemName: '1-Week Geared Bicycle', category: 'service', reportedPrice: 400, isVerified: true,  daysAgo: 3 },
  { placeId: P[21], itemName: '1-Week Geared Bicycle', category: 'service', reportedPrice: 420, isVerified: true,  daysAgo: 5 },
  { placeId: P[21], itemName: '1-Week Geared Bicycle', category: 'service', reportedPrice: 800, isVerified: false, daysAgo: 1 },

  // Coastal Riders Azheekal (P[22])
  { placeId: P[22], itemName: 'Royal Enfield Classic Day', category: 'service', reportedPrice: 900,  isVerified: true,  daysAgo: 1 },
  { placeId: P[22], itemName: 'Royal Enfield Classic Day', category: 'service', reportedPrice: 900,  isVerified: true,  daysAgo: 2 },
  { placeId: P[22], itemName: 'Royal Enfield Classic Day', category: 'service', reportedPrice: 950,  isVerified: true,  daysAgo: 4 },
  { placeId: P[22], itemName: 'Royal Enfield Classic Day', category: 'service', reportedPrice: 1600, isVerified: false, daysAgo: 2 },
`;

obsContent = obsContent.replace(/\];$/, additionalObs + '\n];');
fs.writeFileSync(obsPath, obsContent);

const profPath = '/home/om/Documents/sih/src/seeds/data.profiles.ts';
let profContent = fs.readFileSync(profPath, 'utf8');

const additionalProf = `
  {
    placeId: '11111111-1111-1111-1111-111111111111',
    safetyScore: 78,
    confidenceLevel: 85,
    positiveHighlights: ['Standard daytime display rates (approx 11 km distances)'],
    thingsToKnow: ['Late-night post-11 PM route quoting reported frequently refusing meter flag (1 report).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111112',
    safetyScore: 82,
    confidenceLevel: 88,
    positiveHighlights: ['Standard union board fare present', 'Convenient temple access'],
    thingsToKnow: ['Surge fare quoted strictly during monthly festival days (1 report).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111113',
    safetyScore: 75,
    confidenceLevel: 80,
    positiveHighlights: ['Reliable daytime harbour transit options'],
    thingsToKnow: ['Inflated pricing flagged aggressively targeting arriving tourists directly at the fishing harbour (1 report).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111114',
    safetyScore: 79,
    confidenceLevel: 82,
    positiveHighlights: ['Fixed short-drop rate transparency'],
    thingsToKnow: ['Rainy season surge fare observed without mandatory digital meter engagement (1 report).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111115',
    safetyScore: 92,
    confidenceLevel: 95,
    positiveHighlights: ['Fixed counter token rate inside ashram complex', 'Fixed prices printed accurately on daily bakery selections'],
    thingsToKnow: ['Strict timing rules; limited quantities during peak visitor loads.']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111116',
    safetyScore: 81,
    confidenceLevel: 86,
    positiveHighlights: ['Standard printed menu card rate for lunch meals'],
    thingsToKnow: ['Mineral water aggressively billed above MRP (₹20) occasionally citing cooling charges (2 reports).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111117',
    safetyScore: 76,
    confidenceLevel: 80,
    positiveHighlights: ['Authentic standard printed menu availability', 'Fixed daily rate on central display board'],
    thingsToKnow: ['Certain premium market catch items billed exceptionally high without pre-weighing clarification (1 report).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111118',
    safetyScore: 84,
    confidenceLevel: 85,
    positiveHighlights: ['Standard evening menu rates verified'],
    thingsToKnow: ['Holiday weekend menu markup applied systematically without explicit printed revisions (1 report).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111119',
    safetyScore: 77,
    confidenceLevel: 82,
    positiveHighlights: ['Official ticket counter availability across the harbour promenade'],
    thingsToKnow: ['Extreme spikes from unauthorized pier-side touts aggressively claiming private charter priority (1 report).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111120',
    safetyScore: 88,
    confidenceLevel: 89,
    positiveHighlights: ['Regulated municipal counter visibility', 'Official scheduled guided routes protected'],
    thingsToKnow: ['Private individual tout quotes sharply peak unpredictably during sunset hours (1 report).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111121',
    safetyScore: 83,
    confidenceLevel: 85,
    positiveHighlights: ['Stable daily 24-hour rate valid with standard documentation'],
    thingsToKnow: ['Sudden shortage surge price systematically charged to incoming volunteer cohorts (1 report).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111122',
    safetyScore: 87,
    confidenceLevel: 88,
    positiveHighlights: ['Regulated fixed student cooperative rates available exclusively via bookings'],
    thingsToKnow: ['Steep non-student walk-in markups established locally without prior booking registrations (1 report).']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111123',
    safetyScore: 73,
    confidenceLevel: 78,
    positiveHighlights: ['Base cruiser tariffs adhere to local median standard'],
    thingsToKnow: ['Peak season arbitrary inflation reported featuring highly disputed and unregistered scratch deposits (1 report).']
  }
`;

profContent = profContent.replace(/\];$/, additionalProf + '\n];');
fs.writeFileSync(profPath, profContent);
