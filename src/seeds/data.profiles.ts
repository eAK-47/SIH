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
  },

  // ═══ HOSPITALS & WELLNESS (medical) ═══
  {
    placeId: '11111111-1111-1111-1111-111111111111', // P[10] Amrita Ayurveda Hospital & Research Centre
    safetyScore: 92,
    confidenceLevel: 86,
    positiveHighlights: ['Standard institutional OP registration at ₹150', 'Certified Panchakarma therapy at fixed ₹900 per session'],
    thingsToKnow: ['Private wellness packages (day use) may include non-subsidized room add-ons; request itemized billing before admission (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111112', // P[11] Govt Taluk Head Quarters Hospital
    safetyScore: 94,
    confidenceLevel: 90,
    positiveHighlights: ['Statutory government OP token at ₹10', 'Official casualty emergency assessment at ₹20'],
    thingsToKnow: ['External pharmacy purchases for prescribed medicines have reported generic substitution charges around ₹450; prefer the in-house hospital pharmacy (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111113', // P[12] Parabrahma Speciality Hospital
    safetyScore: 88,
    confidenceLevel: 84,
    positiveHighlights: ['Listed specialist OP consultation at ₹300', 'Published day-care observation tariff at ₹800 (2 Hrs)'],
    thingsToKnow: ['Unlisted rapid-triage surcharges up to ₹1600 reported during night hours; confirm the observation tariff sheet before admission (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111114', // P[13] KIMS Multispeciality Hospital
    safetyScore: 89,
    confidenceLevel: 82,
    positiveHighlights: ['Transparent multispeciality base registration at ₹400', 'Official diagnostic tariff for blood chemistry panel at ₹650'],
    thingsToKnow: ['Ask for the printed diagnostic tariff list before approving additional lab tests']
  },

  // ═══ LOCAL RESTAURANTS & DINING (P[14]–P[32]) ═══
  {
    placeId: '11111111-1111-1111-1111-111111111115', // P[14] Green Park Family Restaurant
    safetyScore: 84,
    confidenceLevel: 85,
    positiveHighlights: ['Standard menu pricing for Chinese favourites', 'Family-friendly seating near the bus stand'],
    thingsToKnow: ['Seafood tandoori platters billed at a flat rate without prior weighing; confirm price before ordering (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111116', // P[15] Hot Pot Restaurant
    safetyScore: 85,
    confidenceLevel: 86,
    positiveHighlights: ['Fixed printed board fare for veg thali', 'Quick lunch service'],
    thingsToKnow: ['Fish curry add-ons billed on extra slips at unlisted rates; verify the add-on price before ordering (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111117', // P[16] Chill Out Restaurant
    safetyScore: 83,
    confidenceLevel: 84,
    positiveHighlights: ['Listed shawarma and juice combo on counter board'],
    thingsToKnow: ['Unannounced ~50% late-night delivery surge reported; confirm delivery charge when ordering late (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111118', // P[17] Chick Hub
    safetyScore: 82,
    confidenceLevel: 84,
    positiveHighlights: ['Standard crispy fried chicken combo price'],
    thingsToKnow: ['Unlisted dine-in service surcharge added during peak hours; request the menu rate card before sitting down (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111119', // P[18] Avila Kitchen
    safetyScore: 84,
    confidenceLevel: 83,
    positiveHighlights: ['Fixed home-style Kerala lunch rate'],
    thingsToKnow: ['Prawn roast price computed by portion size at the counter; confirm the per-plate rate before ordering (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111120', // P[19] Karthika Hotel
    safetyScore: 85,
    confidenceLevel: 86,
    positiveHighlights: ['Standard board fare for parotta and beef fry'],
    thingsToKnow: ['Unlisted weekend special mutton curry rate; confirm before ordering on weekends (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111121', // P[20] Bhuwaneshwari Hotel
    safetyScore: 86,
    confidenceLevel: 87,
    positiveHighlights: ['Printed price list for vegetarian breakfast set'],
    thingsToKnow: ['Festival meal price bumped on temple and ashram event days; check the printed list first (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111122', // P[21] Campus Cafe 3.0
    safetyScore: 88,
    confidenceLevel: 86,
    positiveHighlights: ['Fixed-priced cold coffee and muffin combo', 'Popular with students'],
    thingsToKnow: ['Standard pricing confirmed by recent community reports']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111123', // P[22] Mathas Hotel
    safetyScore: 84,
    confidenceLevel: 85,
    positiveHighlights: ['Standard daytime fish meal rate'],
    thingsToKnow: ['Karimeen specials billed at market rate without pre-order confirmation; confirm rate per piece before cooking (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111124', // P[23] Usthad Hotel
    safetyScore: 82,
    confidenceLevel: 84,
    positiveHighlights: ['Listed board rate for Malabar chicken biryani'],
    thingsToKnow: ['Biryani surge-priced when seating is fully packed; confirm the board rate during peak rush (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111125', // P[24] Lake View Hotel
    safetyScore: 81,
    confidenceLevel: 83,
    positiveHighlights: ['Standard printed menu including duck curry and appam'],
    thingsToKnow: ['Fresh catch billed at unlisted rate with mandatory service tip; confirm total before ordering (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111126', // P[25] Nadan Swath
    safetyScore: 87,
    confidenceLevel: 88,
    positiveHighlights: ['Traditional Kerala meals listed on the wall'],
    thingsToKnow: ['Standard pricing confirmed by recent community reports']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111127', // P[26] Lalitha Hotel
    safetyScore: 88,
    confidenceLevel: 86,
    positiveHighlights: ['Fixed tea and snacks plate fare'],
    thingsToKnow: ['No discrepancies reported — standard local shop fare']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111128', // P[27] Ohamkaram Hotel
    safetyScore: 87,
    confidenceLevel: 86,
    positiveHighlights: ['Fixed local board rate for nadan fish curry meal'],
    thingsToKnow: ['Standard pricing confirmed by recent community reports']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111129', // P[28] Ananda Tea Stall
    safetyScore: 90,
    confidenceLevel: 88,
    positiveHighlights: ['Fixed counter price for tea and pazham pori'],
    thingsToKnow: ['No discrepancies reported — fixed counter pricing']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111130', // P[29] North Indian Dhaba Vallikavu
    safetyScore: 80,
    confidenceLevel: 83,
    positiveHighlights: ['Standard menu price for paneer butter masala and roti'],
    thingsToKnow: ['Late-night delivery quotes up to 55% higher reported for out-of-state students; confirm the menu price before ordering (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111131', // P[30] Vallikavu Chicken Centre
    safetyScore: 81,
    confidenceLevel: 83,
    positiveHighlights: ['Official board price for grilled chicken'],
    thingsToKnow: ['Non-local customers reported ~45% higher grill quotes; request the board rate before ordering (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111132', // P[31] Namo Bakkala
    safetyScore: 89,
    confidenceLevel: 87,
    positiveHighlights: ['Standard listed vegetarian combo meal price'],
    thingsToKnow: ['Standard pricing confirmed by recent community reports']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111133', // P[32] Amritam Restaurant
    safetyScore: 88,
    confidenceLevel: 86,
    positiveHighlights: ['Fixed printed board price for south Indian pure veg thali'],
    thingsToKnow: ['No discrepancies reported — standard pricing']
  },

  // ═══ LOCAL RENTALS (P[33]–P[38]) ═══
  {
    placeId: '11111111-1111-1111-1111-111111111134', // P[33] Vallikavu Royal Rides
    safetyScore: 84,
    confidenceLevel: 85,
    positiveHighlights: ['Standard daily Suzuki Access 125 rate with helmet'],
    thingsToKnow: ['Peak-season quotes up to ₹800 reported; confirm the daily board rate before taking the vehicle (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111135', // P[34] Alumkadavu Lake Scooters
    safetyScore: 82,
    confidenceLevel: 83,
    positiveHighlights: ['Standard daily TVS Jupiter rate'],
    thingsToKnow: ['Tourist-package rates up to ₹700 quoted at the jetty entrance; go to the main shop counter for the standard rate (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111136', // P[35] Vavvakkavu Bike Point
    safetyScore: 81,
    confidenceLevel: 82,
    positiveHighlights: ['Standard daily Pulsar 150 shop rate'],
    thingsToKnow: ['Non-local riders without local references reported surge quotes up to ₹1200; confirm the printed daily tariff (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111137', // P[36] Amritapuri Student Scooters
    safetyScore: 83,
    confidenceLevel: 84,
    positiveHighlights: ['Standard listed daily fare for electric scooters'],
    thingsToKnow: ['Unreasonable battery-charge fees added on return reported; ask for the full charge conditions before renting (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111138', // P[37] Clappana Ride Rentals
    safetyScore: 80,
    confidenceLevel: 82,
    positiveHighlights: ['Standard daily Yamaha FZ tariff'],
    thingsToKnow: ['Holiday surge up to ₹1300 reported without insurance cover; verify insurance and rate before renting (2 reports)']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111139', // P[38] Azheekal Coast Wheels
    safetyScore: 86,
    confidenceLevel: 84,
    positiveHighlights: ['Standard coastal beach-route bicycle rate'],
    thingsToKnow: ['Sunset-peak tourist markups up to ₹250 reported; check the counter rate during peak hours (2 reports)']
  },

  // ═══ BUS TIMING & FARE CARDS (KSRTC & Private Shuttles) ═══
  {
    placeId: '11111111-1111-1111-1111-111111111140', // P[39] Vallikavu Junction Bus Stop
    safetyScore: 88,
    confidenceLevel: 90,
    positiveHighlights: ['First KSRTC ordinary to Karunagappally from 05:40 AM (~every 20–30 min until 9 PM)', 'Vallikavu–Karunagappally private shuttle ₹15 official counter rate'],
    thingsToKnow: ['KSRTC full-ticket to Kollam ~₹48; boarding without token at festival night may be quoted up to ₹100 (3 reports)', 'No service after 10:00 PM on this stretch except private maxi during festival days']
  },
  {
    placeId: '11111111-1111-1111-1111-111111111141', // P[40] Karunagappally KSRTC Bus Operating Centre
    safetyScore: 90,
    confidenceLevel: 92,
    positiveHighlights: ['KSRTC Operating Centre with Fast Passenger and Super Fast services to Kollam', 'First departure 05:15 AM; last local service 09:30 PM'],
    thingsToKnow: ['Super Fast to Kollam ~₹70 and Fast Passenger ~₹60 — always buy the token at the KSRTC counter, not agents (2 reports)', 'Festival-night return shuttles occasionally quote non-token rates up to ₹100; ask for the printed fare card']
  }
];
