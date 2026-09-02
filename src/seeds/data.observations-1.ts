import { places, SeedObs } from './data.places';

const P = places.map(p => p.id);

export const observations: SeedObs[] = [
  // Vallikavu Auto Stand (P[0])
  { placeId: P[0], itemName: 'Drop to Karunagappally Rly', category: 'transport', reportedPrice: 200, isVerified: true,  daysAgo: 1 },
  { placeId: P[0], itemName: 'Drop to Karunagappally Rly', category: 'transport', reportedPrice: 200, isVerified: true,  daysAgo: 2 },
  { placeId: P[0], itemName: 'Drop to Karunagappally Rly', category: 'transport', reportedPrice: 210, isVerified: true,  daysAgo: 3 },
  { placeId: P[0], itemName: 'Drop to Karunagappally Rly', category: 'transport', reportedPrice: 190, isVerified: true,  daysAgo: 4 },
  { placeId: P[0], itemName: 'Drop to Karunagappally Rly', category: 'transport', reportedPrice: 450, isVerified: false, daysAgo: 1 },
  { placeId: P[0], itemName: 'Drop to Ochira Temple',      category: 'transport', reportedPrice: 230, isVerified: true,  daysAgo: 2 },
  { placeId: P[0], itemName: 'Drop to Ochira Temple',      category: 'transport', reportedPrice: 240, isVerified: true,  daysAgo: 3 },
  { placeId: P[0], itemName: 'Drop to Ochira Temple',      category: 'transport', reportedPrice: 220, isVerified: true,  daysAgo: 5 },
  { placeId: P[0], itemName: 'Drop to Ochira Temple',      category: 'transport', reportedPrice: 500, isVerified: false, daysAgo: 1 },

  // Amritapuri Gate Stand (P[1])
  { placeId: P[1], itemName: 'Amritapuri to Azheekal Beach', category: 'transport', reportedPrice: 160, isVerified: true,  daysAgo: 1 },
  { placeId: P[1], itemName: 'Amritapuri to Azheekal Beach', category: 'transport', reportedPrice: 150, isVerified: true,  daysAgo: 2 },
  { placeId: P[1], itemName: 'Amritapuri to Azheekal Beach', category: 'transport', reportedPrice: 170, isVerified: true,  daysAgo: 4 },
  { placeId: P[1], itemName: 'Amritapuri to Azheekal Beach', category: 'transport', reportedPrice: 350, isVerified: false, daysAgo: 2 },

  // Vavvakkavu Junction Auto Stand (P[2])
  { placeId: P[2], itemName: 'Vavvakkavu to Vallikavu', category: 'transport', reportedPrice: 50,  isVerified: true,  daysAgo: 2 },
  { placeId: P[2], itemName: 'Vavvakkavu to Vallikavu', category: 'transport', reportedPrice: 50,  isVerified: true,  daysAgo: 3 },
  { placeId: P[2], itemName: 'Vavvakkavu to Vallikavu', category: 'transport', reportedPrice: 60,  isVerified: true,  daysAgo: 4 },
  { placeId: P[2], itemName: 'Vavvakkavu to Vallikavu', category: 'transport', reportedPrice: 120, isVerified: false, daysAgo: 1 },

  // Amritham Meals (P[3])
  { placeId: P[3], itemName: 'Standard Veg Meals',     category: 'food', reportedPrice: 100, isVerified: true,  daysAgo: 1 },
  { placeId: P[3], itemName: 'Standard Veg Meals',     category: 'food', reportedPrice: 100, isVerified: true,  daysAgo: 2 },
  { placeId: P[3], itemName: 'Standard Veg Meals',     category: 'food', reportedPrice: 110, isVerified: true,  daysAgo: 3 },
  { placeId: P[3], itemName: 'Standard Veg Meals',     category: 'food', reportedPrice: 100, isVerified: true,  daysAgo: 4 },
  { placeId: P[3], itemName: 'Karimeen Pollichathu',   category: 'food', reportedPrice: 350, isVerified: true,  daysAgo: 1 },
  { placeId: P[3], itemName: 'Karimeen Pollichathu',   category: 'food', reportedPrice: 380, isVerified: true,  daysAgo: 3 },
  { placeId: P[3], itemName: 'Karimeen Pollichathu',   category: 'food', reportedPrice: 360, isVerified: true,  daysAgo: 5 },
  { placeId: P[3], itemName: 'Karimeen Pollichathu',   category: 'food', reportedPrice: 750, isVerified: false, daysAgo: 2 },
  { placeId: P[3], itemName: 'Fresh Lime Water',       category: 'beverage', reportedPrice: 30,  isVerified: true,  daysAgo: 1 },
  { placeId: P[3], itemName: 'Fresh Lime Water',       category: 'beverage', reportedPrice: 30,  isVerified: true,  daysAgo: 2 },
  { placeId: P[3], itemName: 'Fresh Lime Water',       category: 'beverage', reportedPrice: 35,  isVerified: true,  daysAgo: 4 },

  // Kollam Feast Beach Restaurant (P[4])
  { placeId: P[4], itemName: 'Fish Curry Meals (Mackerel)', category: 'food', reportedPrice: 160, isVerified: true,  daysAgo: 1 },
  { placeId: P[4], itemName: 'Fish Curry Meals (Mackerel)', category: 'food', reportedPrice: 160, isVerified: true,  daysAgo: 2 },
  { placeId: P[4], itemName: 'Fish Curry Meals (Mackerel)', category: 'food', reportedPrice: 170, isVerified: true,  daysAgo: 4 },
  { placeId: P[4], itemName: 'Fish Curry Meals (Mackerel)', category: 'food', reportedPrice: 150, isVerified: true,  daysAgo: 5 },
  { placeId: P[4], itemName: 'Special Tiger Prawns Fry',    category: 'food', reportedPrice: 400, isVerified: true,  daysAgo: 1 },
  { placeId: P[4], itemName: 'Special Tiger Prawns Fry',    category: 'food', reportedPrice: 420, isVerified: true,  daysAgo: 3 },
  { placeId: P[4], itemName: 'Special Tiger Prawns Fry',    category: 'food', reportedPrice: 450, isVerified: true,  daysAgo: 5 },
  { placeId: P[4], itemName: 'Special Tiger Prawns Fry',    category: 'food', reportedPrice: 850, isVerified: false, daysAgo: 2 },

  // Beachside Refreshments (P[5])
  { placeId: P[5], itemName: 'Tender Coconut', category: 'beverage', reportedPrice: 40, isVerified: true,  daysAgo: 1 },
  { placeId: P[5], itemName: 'Tender Coconut', category: 'beverage', reportedPrice: 40, isVerified: true,  daysAgo: 2 },
  { placeId: P[5], itemName: 'Tender Coconut', category: 'beverage', reportedPrice: 45, isVerified: true,  daysAgo: 4 },
  { placeId: P[5], itemName: 'Tender Coconut', category: 'beverage', reportedPrice: 80, isVerified: false, daysAgo: 1 },

  // Alumkadavu Boat Jetty (P[6])
  { placeId: P[6], itemName: '1-Hr Country Canoe Ride', category: 'service', reportedPrice: 500,  isVerified: true,  daysAgo: 1 },
  { placeId: P[6], itemName: '1-Hr Country Canoe Ride', category: 'service', reportedPrice: 500,  isVerified: true,  daysAgo: 2 },
  { placeId: P[6], itemName: '1-Hr Country Canoe Ride', category: 'service', reportedPrice: 550,  isVerified: true,  daysAgo: 4 },
  { placeId: P[6], itemName: '1-Hr Country Canoe Ride', category: 'service', reportedPrice: 480,  isVerified: true,  daysAgo: 5 },
  { placeId: P[6], itemName: '1-Hr Country Canoe Ride', category: 'service', reportedPrice: 1400, isVerified: false, daysAgo: 1 },
  { placeId: P[6], itemName: '1-Hr Shikara Boat Ride',  category: 'service', reportedPrice: 900,  isVerified: true,  daysAgo: 2 },
  { placeId: P[6], itemName: '1-Hr Shikara Boat Ride',  category: 'service', reportedPrice: 950,  isVerified: true,  daysAgo: 3 },
  { placeId: P[6], itemName: '1-Hr Shikara Boat Ride',  category: 'service', reportedPrice: 900,  isVerified: true,  daysAgo: 4 },
  { placeId: P[6], itemName: '1-Hr Shikara Boat Ride',  category: 'service', reportedPrice: 2200, isVerified: false, daysAgo: 2 },

  // Backwater Kayak Hub (P[7])
  { placeId: P[7], itemName: 'Single Kayak Rental (1 Hr)', category: 'service', reportedPrice: 400, isVerified: true,  daysAgo: 1 },
  { placeId: P[7], itemName: 'Single Kayak Rental (1 Hr)', category: 'service', reportedPrice: 400, isVerified: true,  daysAgo: 3 },
  { placeId: P[7], itemName: 'Single Kayak Rental (1 Hr)', category: 'service', reportedPrice: 450, isVerified: true,  daysAgo: 4 },
  { placeId: P[7], itemName: 'Single Kayak Rental (1 Hr)', category: 'service', reportedPrice: 800, isVerified: false, daysAgo: 1 },

  // Amrita Bike & Scooter Rentals (P[8])
  { placeId: P[8], itemName: '1-Day Honda Activa Rental', category: 'service', reportedPrice: 400, isVerified: true,  daysAgo: 1 },
  { placeId: P[8], itemName: '1-Day Honda Activa Rental', category: 'service', reportedPrice: 400, isVerified: true,  daysAgo: 2 },
  { placeId: P[8], itemName: '1-Day Honda Activa Rental', category: 'service', reportedPrice: 420, isVerified: true,  daysAgo: 3 },
  { placeId: P[8], itemName: '1-Day Honda Activa Rental', category: 'service', reportedPrice: 380, isVerified: true,  daysAgo: 5 },
  { placeId: P[8], itemName: '1-Day Honda Activa Rental', category: 'service', reportedPrice: 750, isVerified: false, daysAgo: 1 },

  // Vallikavu Cycle Point (P[9])
  { placeId: P[9], itemName: '1-Day Bicycle Rental', category: 'service', reportedPrice: 120, isVerified: true,  daysAgo: 1 },
  { placeId: P[9], itemName: '1-Day Bicycle Rental', category: 'service', reportedPrice: 120, isVerified: true,  daysAgo: 2 },
  { placeId: P[9], itemName: '1-Day Bicycle Rental', category: 'service', reportedPrice: 130, isVerified: true,  daysAgo: 4 },
  { placeId: P[9], itemName: '1-Day Bicycle Rental', category: 'service', reportedPrice: 250, isVerified: false, daysAgo: 1 },

  // ─── Popular dish enrichment (high-coverage keyword search) ───

  // Amritham Meals (P[3]) — sadya coverage
  { placeId: P[3], itemName: 'Onam Sadya Thali',      category: 'food', reportedPrice: 150, isVerified: true,  daysAgo: 2 },
  { placeId: P[3], itemName: 'Onam Sadya Thali',      category: 'food', reportedPrice: 150, isVerified: true,  daysAgo: 6 },

  // Kollam Feast Beach Restaurant (P[4]) — biriyani & porotta coverage
  { placeId: P[4], itemName: 'Chicken Biriyani',      category: 'food', reportedPrice: 180, isVerified: true,  daysAgo: 1 },
  { placeId: P[4], itemName: 'Chicken Biriyani',      category: 'food', reportedPrice: 180, isVerified: true,  daysAgo: 3 },
  { placeId: P[4], itemName: 'Chicken Biriyani',      category: 'food', reportedPrice: 350, isVerified: false, daysAgo: 2 },
  { placeId: P[4], itemName: 'Kerala Porotta (2 pcs)', category: 'food', reportedPrice: 40, isVerified: true,  daysAgo: 1 },
  { placeId: P[4], itemName: 'Kerala Porotta (2 pcs)', category: 'food', reportedPrice: 45, isVerified: true,  daysAgo: 4 },

  // ═══ HOSPITALS & WELLNESS (medical) ═══

  // Amrita Ayurveda Hospital & Research Centre (P[10])
  { placeId: P[10], itemName: 'General Ayurveda OP Consultation',          category: 'medical', reportedPrice: 150,  isVerified: true,  daysAgo: 2 },
  { placeId: P[10], itemName: 'Panchakarma (Abhyangam 1 Session)',         category: 'medical', reportedPrice: 900,  isVerified: true,  daysAgo: 4 },
  { placeId: P[10], itemName: 'Specialized Wellness Package (Single Day)', category: 'medical', reportedPrice: 2800, isVerified: false, daysAgo: 1 },

  // Govt Taluk Head Quarters Hospital (P[11])
  { placeId: P[11], itemName: 'General OP Ticket Fee',                     category: 'medical', reportedPrice: 10,   isVerified: true,  daysAgo: 3 },
  { placeId: P[11], itemName: 'Casualty Emergency Assessment',             category: 'medical', reportedPrice: 20,   isVerified: true,  daysAgo: 5 },
  { placeId: P[11], itemName: 'Private Pharmacy Prescription Run',         category: 'medical', reportedPrice: 450,  isVerified: false, daysAgo: 1 },

  // Parabrahma Speciality Hospital (P[12])
  { placeId: P[12], itemName: 'Specialist Doctor OP Consultation',         category: 'medical', reportedPrice: 300,  isVerified: true,  daysAgo: 2 },
  { placeId: P[12], itemName: 'Emergency Observation (2 Hrs)',             category: 'medical', reportedPrice: 800,  isVerified: true,  daysAgo: 3 },
  { placeId: P[12], itemName: 'Emergency Observation (2 Hrs)',             category: 'medical', reportedPrice: 1600, isVerified: false, daysAgo: 1 },

  // KIMS Multispeciality Hospital (P[13])
  { placeId: P[13], itemName: 'Emergency Casualty Registration',           category: 'medical', reportedPrice: 400,  isVerified: true,  daysAgo: 2 },
  { placeId: P[13], itemName: 'Basic Blood Chemistry Panel',               category: 'medical', reportedPrice: 650,  isVerified: true,  daysAgo: 4 }
];
