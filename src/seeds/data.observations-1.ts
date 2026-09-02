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
  { placeId: P[10], itemName: 'General Ayurveda OP Consultation',          category: 'medical', reportedPrice: 160,  isVerified: true,  daysAgo: 4 },
  { placeId: P[10], itemName: 'General Ayurveda OP Consultation',          category: 'medical', reportedPrice: 150,  isVerified: true,  daysAgo: 6 },
  { placeId: P[10], itemName: 'General Ayurveda OP Consultation',          category: 'medical', reportedPrice: 170,  isVerified: true,  daysAgo: 8 },
  { placeId: P[10], itemName: 'Panchakarma (Abhyangam 1 Session)',         category: 'medical', reportedPrice: 900,  isVerified: true,  daysAgo: 4 },
  { placeId: P[10], itemName: 'Panchakarma (Abhyangam 1 Session)',         category: 'medical', reportedPrice: 900,  isVerified: true,  daysAgo: 5 },
  { placeId: P[10], itemName: 'Panchakarma (Abhyangam 1 Session)',         category: 'medical', reportedPrice: 950,  isVerified: true,  daysAgo: 7 },
  { placeId: P[10], itemName: 'Panchakarma (Abhyangam 1 Session)',         category: 'medical', reportedPrice: 1000, isVerified: true,  daysAgo: 8 },
  { placeId: P[10], itemName: 'Specialized Wellness Package (Single Day)', category: 'medical', reportedPrice: 2400, isVerified: true,  daysAgo: 3 },
  { placeId: P[10], itemName: 'Specialized Wellness Package (Single Day)', category: 'medical', reportedPrice: 2600, isVerified: true,  daysAgo: 5 },
  { placeId: P[10], itemName: 'Specialized Wellness Package (Single Day)', category: 'medical', reportedPrice: 2700, isVerified: true,  daysAgo: 7 },
  { placeId: P[10], itemName: 'Specialized Wellness Package (Single Day)', category: 'medical', reportedPrice: 2800, isVerified: false, daysAgo: 1 },

  // Govt Taluk Head Quarters Hospital (P[11])
  { placeId: P[11], itemName: 'General OP Ticket Fee',                     category: 'medical', reportedPrice: 10,   isVerified: true,  daysAgo: 3 },
  { placeId: P[11], itemName: 'General OP Ticket Fee',                     category: 'medical', reportedPrice: 10,   isVerified: true,  daysAgo: 6 },
  { placeId: P[11], itemName: 'Casualty Emergency Assessment',             category: 'medical', reportedPrice: 20,   isVerified: true,  daysAgo: 5 },
  { placeId: P[11], itemName: 'Casualty Emergency Assessment',             category: 'medical', reportedPrice: 20,   isVerified: true,  daysAgo: 7 },
  { placeId: P[11], itemName: 'Private Pharmacy Prescription Run',         category: 'medical', reportedPrice: 120,  isVerified: true,  daysAgo: 2 },
  { placeId: P[11], itemName: 'Private Pharmacy Prescription Run',         category: 'medical', reportedPrice: 150,  isVerified: true,  daysAgo: 4 },
  { placeId: P[11], itemName: 'Private Pharmacy Prescription Run',         category: 'medical', reportedPrice: 180,  isVerified: true,  daysAgo: 6 },
  { placeId: P[11], itemName: 'Private Pharmacy Prescription Run',         category: 'medical', reportedPrice: 450,  isVerified: false, daysAgo: 1 },

  // Parabrahma Speciality Hospital (P[12])
  { placeId: P[12], itemName: 'Specialist Doctor OP Consultation',         category: 'medical', reportedPrice: 300,  isVerified: true,  daysAgo: 2 },
  { placeId: P[12], itemName: 'Specialist Doctor OP Consultation',         category: 'medical', reportedPrice: 300,  isVerified: true,  daysAgo: 4 },
  { placeId: P[12], itemName: 'Specialist Doctor OP Consultation',         category: 'medical', reportedPrice: 350,  isVerified: true,  daysAgo: 6 },
  { placeId: P[12], itemName: 'Specialist Doctor OP Consultation',         category: 'medical', reportedPrice: 400,  isVerified: true,  daysAgo: 8 },
  { placeId: P[12], itemName: 'Emergency Observation (2 Hrs)',             category: 'medical', reportedPrice: 800,  isVerified: true,  daysAgo: 3 },
  { placeId: P[12], itemName: 'Emergency Observation (2 Hrs)',             category: 'medical', reportedPrice: 850,  isVerified: true,  daysAgo: 5 },
  { placeId: P[12], itemName: 'Emergency Observation (2 Hrs)',             category: 'medical', reportedPrice: 900,  isVerified: true,  daysAgo: 7 },
  { placeId: P[12], itemName: 'Emergency Observation (2 Hrs)',             category: 'medical', reportedPrice: 1600, isVerified: false, daysAgo: 1 },

  // KIMS Multispeciality Hospital (P[13])
  { placeId: P[13], itemName: 'Emergency Casualty Registration',           category: 'medical', reportedPrice: 400,  isVerified: true,  daysAgo: 2 },
  { placeId: P[13], itemName: 'Emergency Casualty Registration',           category: 'medical', reportedPrice: 400,  isVerified: true,  daysAgo: 5 },
  { placeId: P[13], itemName: 'Emergency Casualty Registration',           category: 'medical', reportedPrice: 450,  isVerified: true,  daysAgo: 7 },
  { placeId: P[13], itemName: 'Emergency Casualty Registration',           category: 'medical', reportedPrice: 500,  isVerified: true,  daysAgo: 8 },
  { placeId: P[13], itemName: 'Basic Blood Chemistry Panel',               category: 'medical', reportedPrice: 650,  isVerified: true,  daysAgo: 4 },
  { placeId: P[13], itemName: 'Basic Blood Chemistry Panel',               category: 'medical', reportedPrice: 650,  isVerified: true,  daysAgo: 6 },
  { placeId: P[13], itemName: 'Basic Blood Chemistry Panel',               category: 'medical', reportedPrice: 700,  isVerified: true,  daysAgo: 7 },
  { placeId: P[13], itemName: 'Basic Blood Chemistry Panel',               category: 'medical', reportedPrice: 750,  isVerified: true,  daysAgo: 8 },

  // ═══ LOCAL RESTAURANTS & DINING (P[14]–P[32]) ═══

  // Green Park Family Restaurant (P[14])
  { placeId: P[14], itemName: 'Chicken Fried Rice & Chili Chicken',        category: 'food', reportedPrice: 230, isVerified: true,  daysAgo: 2 },
  { placeId: P[14], itemName: 'Special Seafood Tandoori Platter',          category: 'food', reportedPrice: 550, isVerified: false, daysAgo: 1 },

  // Hot Pot Restaurant (P[15])
  { placeId: P[15], itemName: 'Veg Meals Thali',                           category: 'food', reportedPrice: 90,  isVerified: true,  daysAgo: 1 },
  { placeId: P[15], itemName: 'Fish Curry Add-on',                         category: 'food', reportedPrice: 180, isVerified: false, daysAgo: 3 },

  // Chill Out Restaurant (P[16])
  { placeId: P[16], itemName: 'Shawarma Roll & Fresh Juice',               category: 'food', reportedPrice: 140, isVerified: true,  daysAgo: 2 },
  { placeId: P[16], itemName: 'Late Night Delivery Charge',                category: 'food', reportedPrice: 220, isVerified: false, daysAgo: 1 },

  // Chick Hub (P[17])
  { placeId: P[17], itemName: 'Crispy Fried Chicken Combo',                category: 'food', reportedPrice: 190, isVerified: true,  daysAgo: 1 },
  { placeId: P[17], itemName: 'Dine-in Service Surcharge',                 category: 'food', reportedPrice: 250, isVerified: false, daysAgo: 2 },

  // Avila Kitchen (P[18])
  { placeId: P[18], itemName: 'Home Style Kerala Lunch',                   category: 'food', reportedPrice: 110, isVerified: true,  daysAgo: 2 },
  { placeId: P[18], itemName: 'Special Prawn Roast',                       category: 'food', reportedPrice: 320, isVerified: false, daysAgo: 1 },

  // Karthika Hotel (P[19])
  { placeId: P[19], itemName: 'Kerala Parotta & Beef Fry',                 category: 'food', reportedPrice: 160, isVerified: true,  daysAgo: 1 },
  { placeId: P[19], itemName: 'Special Mutton Curry',                      category: 'food', reportedPrice: 340, isVerified: false, daysAgo: 4 },

  // Bhuwaneshwari Hotel (P[20])
  { placeId: P[20], itemName: 'Vegetarian Breakfast Set',                  category: 'food', reportedPrice: 70,  isVerified: true,  daysAgo: 2 },
  { placeId: P[20], itemName: 'Special Festival Meal',                     category: 'food', reportedPrice: 150, isVerified: false, daysAgo: 1 },

  // Campus Cafe 3.0 (P[21])
  { placeId: P[21], itemName: 'Cold Coffee & Muffin',                      category: 'food', reportedPrice: 110, isVerified: true,  daysAgo: 1 },

  // Mathas Hotel (P[22])
  { placeId: P[22], itemName: 'Fish Meal & Side Fry',                      category: 'food', reportedPrice: 150, isVerified: true,  daysAgo: 2 },
  { placeId: P[22], itemName: 'Seafood Special (Karimeen)',                category: 'food', reportedPrice: 480, isVerified: false, daysAgo: 1 },

  // Usthad Hotel (P[23])
  { placeId: P[23], itemName: 'Malabar Chicken Biryani',                   category: 'food', reportedPrice: 170, isVerified: true,  daysAgo: 1 },
  { placeId: P[23], itemName: 'Chicken Biryani (Peak Rush)',               category: 'food', reportedPrice: 250, isVerified: false, daysAgo: 3 },

  // Lake View Hotel (P[24])
  { placeId: P[24], itemName: 'Duck Curry & Appam',                        category: 'food', reportedPrice: 210, isVerified: true,  daysAgo: 2 },
  { placeId: P[24], itemName: 'Lake View Fresh Catch',                     category: 'food', reportedPrice: 600, isVerified: false, daysAgo: 1 },

  // Nadan Swath (P[25])
  { placeId: P[25], itemName: 'Traditional Kerala Meals',                  category: 'food', reportedPrice: 100, isVerified: true,  daysAgo: 1 },

  // Lalitha Hotel (P[26])
  { placeId: P[26], itemName: 'Tea & Snacks Plate',                        category: 'food', reportedPrice: 45,  isVerified: true,  daysAgo: 2 },

  // Ohamkaram Hotel (P[27])
  { placeId: P[27], itemName: 'Nadan Fish Curry Meal',                     category: 'food', reportedPrice: 130, isVerified: true,  daysAgo: 1 },

  // Ananda Tea Stall (P[28])
  { placeId: P[28], itemName: 'Hot Tea & Banana Fritter (Pazham Pori)',    category: 'food', reportedPrice: 35,  isVerified: true,  daysAgo: 1 },

  // North Indian Dhaba Vallikavu (P[29])
  { placeId: P[29], itemName: 'Paneer Butter Masala & Roti',               category: 'food', reportedPrice: 180, isVerified: true,  daysAgo: 2 },
  { placeId: P[29], itemName: 'Paneer Butter Masala & Roti',               category: 'food', reportedPrice: 280, isVerified: false, daysAgo: 1 },

  // Vallikavu Chicken Centre (P[30])
  { placeId: P[30], itemName: 'Grilled Chicken (Half)',                    category: 'food', reportedPrice: 220, isVerified: true,  daysAgo: 1 },
  { placeId: P[30], itemName: 'Grilled Chicken (Half)',                    category: 'food', reportedPrice: 320, isVerified: false, daysAgo: 2 },

  // Namo Bakkala (P[31])
  { placeId: P[31], itemName: 'Vegetarian Combo Meal',                     category: 'food', reportedPrice: 120, isVerified: true,  daysAgo: 1 },

  // Amritam Restaurant (P[32])
  { placeId: P[32], itemName: 'South Indian Pure Veg Thali',               category: 'food', reportedPrice: 90,  isVerified: true,  daysAgo: 1 },

  // ═══ LOCAL RENTALS (P[33]–P[38]) ═══

  // Vallikavu Royal Rides (P[33])
  { placeId: P[33], itemName: '1-Day Suzuki Access 125',                   category: 'service', reportedPrice: 450,  isVerified: true,  daysAgo: 1 },
  { placeId: P[33], itemName: '1-Day Suzuki Access 125',                   category: 'service', reportedPrice: 800,  isVerified: false, daysAgo: 2 },

  // Alumkadavu Lake Scooters (P[34])
  { placeId: P[34], itemName: '1-Day TVS Jupiter Rental',                  category: 'service', reportedPrice: 400,  isVerified: true,  daysAgo: 2 },
  { placeId: P[34], itemName: '1-Day TVS Jupiter Rental',                  category: 'service', reportedPrice: 700,  isVerified: false, daysAgo: 1 },

  // Vavvakkavu Bike Point (P[35])
  { placeId: P[35], itemName: '1-Day Pulsar 150 Rental',                   category: 'service', reportedPrice: 650,  isVerified: true,  daysAgo: 1 },
  { placeId: P[35], itemName: '1-Day Pulsar 150 Rental',                   category: 'service', reportedPrice: 1200, isVerified: false, daysAgo: 3 },

  // Amritapuri Student Scooters (P[36])
  { placeId: P[36], itemName: '1-Day Electric Scooter (Ather/iQube)',      category: 'service', reportedPrice: 500,  isVerified: true,  daysAgo: 1 },
  { placeId: P[36], itemName: '1-Day Electric Scooter (Ather/iQube)',      category: 'service', reportedPrice: 900,  isVerified: false, daysAgo: 2 },

  // Clappana Ride Rentals (P[37])
  { placeId: P[37], itemName: '1-Day Yamaha FZ Rental',                    category: 'service', reportedPrice: 700,  isVerified: true,  daysAgo: 1 },
  { placeId: P[37], itemName: '1-Day Yamaha FZ Rental',                    category: 'service', reportedPrice: 1300, isVerified: false, daysAgo: 2 },

  // Azheekal Coast Wheels (P[38])
  { placeId: P[38], itemName: '1-Day Bicycle Rental',                      category: 'service', reportedPrice: 100,  isVerified: true,  daysAgo: 1 },
  { placeId: P[38], itemName: '1-Day Bicycle Rental',                      category: 'service', reportedPrice: 250,  isVerified: false, daysAgo: 2 },

  // ═══ BUS TIMING & FARE CARDS (KSRTC & Private Shuttles) ═══

  // Vallikavu Junction Bus Stop (P[39])
  { placeId: P[39], itemName: 'KSRTC Ordinary – Karunagappally to Kollam (Full)', category: 'transport', reportedPrice: 48, isVerified: true,  daysAgo: 2 },
  { placeId: P[39], itemName: 'KSRTC Ordinary – Karunagappally to Kollam (Full)', category: 'transport', reportedPrice: 48, isVerified: true,  daysAgo: 4 },
  { placeId: P[39], itemName: 'KSRTC Ordinary – Karunagappally to Kollam (Full)', category: 'transport', reportedPrice: 50, isVerified: true,  daysAgo: 6 },
  { placeId: P[39], itemName: 'KSRTC Ordinary – Karunagappally to Kollam (Full)', category: 'transport', reportedPrice: 55, isVerified: true,  daysAgo: 8 },
  { placeId: P[39], itemName: 'Private Shuttle – Vallikavu to Karunagappally',      category: 'transport', reportedPrice: 15, isVerified: true,  daysAgo: 1 },
  { placeId: P[39], itemName: 'Private Shuttle – Vallikavu to Karunagappally',      category: 'transport', reportedPrice: 15, isVerified: true,  daysAgo: 3 },
  { placeId: P[39], itemName: 'Private Shuttle – Vallikavu to Karunagappally',      category: 'transport', reportedPrice: 20, isVerified: true,  daysAgo: 5 },
  { placeId: P[39], itemName: 'Private Shuttle – Vallikavu to Karunagappally',      category: 'transport', reportedPrice: 40, isVerified: false, daysAgo: 2 },

  // Karunagappally KSRTC Bus Operating Centre (P[40])
  { placeId: P[40], itemName: 'KSRTC Fast Passenger – Karunagappally to Kollam',    category: 'transport', reportedPrice: 60, isVerified: true,  daysAgo: 1 },
  { placeId: P[40], itemName: 'KSRTC Fast Passenger – Karunagappally to Kollam',    category: 'transport', reportedPrice: 60, isVerified: true,  daysAgo: 4 },
  { placeId: P[40], itemName: 'KSRTC Fast Passenger – Karunagappally to Kollam',    category: 'transport', reportedPrice: 65, isVerified: true,  daysAgo: 6 },
  { placeId: P[40], itemName: 'KSRTC Super Fast – Karunagappally to Kollam',        category: 'transport', reportedPrice: 70, isVerified: true,  daysAgo: 2 },
  { placeId: P[40], itemName: 'KSRTC Super Fast – Karunagappally to Kollam',        category: 'transport', reportedPrice: 70, isVerified: true,  daysAgo: 5 },
  { placeId: P[40], itemName: 'KSRTC Super Fast – Karunagappally to Kollam',        category: 'transport', reportedPrice: 75, isVerified: true,  daysAgo: 7 },
  { placeId: P[40], itemName: 'KSRTC Ordinary – Karunagappally to Kottarakkara',    category: 'transport', reportedPrice: 42, isVerified: true,  daysAgo: 3 },
  { placeId: P[40], itemName: 'KSRTC Ordinary – Karunagappally to Kottarakkara',    category: 'transport', reportedPrice: 42, isVerified: true,  daysAgo: 6 },
  { placeId: P[40], itemName: 'KSRTC Ordinary – Karunagappally to Kottarakkara',    category: 'transport', reportedPrice: 45, isVerified: true,  daysAgo: 8 },
  { placeId: P[40], itemName: 'Private Shuttle – Festival Night Return (Non-token)', category: 'transport', reportedPrice: 100, isVerified: false, daysAgo: 1 }
];
