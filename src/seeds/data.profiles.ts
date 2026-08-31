import { SeedProfile } from './data.places';

/**
 * Intelligence Profiles for Seed Places
 *
 * Safety scores, highlights, and practical info for tourists.
 * Profiles include:
 * - safetyScore (0-100): Higher = safer/more reliable
 * - positiveHighlights: Key strengths tourists appreciate
 * - thingsToKnow: Practical tips for visitors
 * - confidenceLevel (0-1): Data maturity & verification recency
 */
export const profiles: SeedProfile[] = [
  // ────── VARKALA PROFILES ──────────────────────────────────────
  
  {
    // Clafouti Beach Restaurant
    placeId: '11111111-1111-1111-1111-111111111101',
    safetyScore: 85,
    positiveHighlights: [
      'Fresh seafood sourced daily from local fishermen',
      'Excellent Cliff views from beachfront location',
      'Friendly, experienced staff familiar with tourists'
    ],
    thingsToKnow: [
      'Very popular during peak hours (11 AM - 1 PM, 7 PM - 9 PM); arrive early to avoid wait',
      'Cash and card payments accepted; confirm bill before settling',
      'Seasonal tourist rush (Oct-Mar); prices may vary'
    ],
    confidenceLevel: 0.88
  },

  {
    // Darjeeling Café
    placeId: '11111111-1111-1111-1111-111111111102',
    safetyScore: 82,
    positiveHighlights: [
      'Iconic hippie café with authentic local vibe',
      'Excellent filter coffee and backpacker-friendly atmosphere',
      'Known for honest pricing and reasonable portions'
    ],
    thingsToKnow: [
      'Popular with backpackers; expect crowded mornings and evenings',
      'Menu prices are on actual menu board; no surprise charges',
      'Credit card payments may have issues; cash preferred'
    ],
    confidenceLevel: 0.85
  },

  {
    // Varkala Marine Palace Hotel
    placeId: '11111111-1111-1111-1111-111111111103',
    safetyScore: 87,
    positiveHighlights: [
      'Well-maintained rooms with modern amenities',
      'Professional staff and reliable 24/7 room service',
      'Prime location near temple and beach attractions'
    ],
    thingsToKnow: [
      'Book in advance during Oct-Mar peak season; rates increase significantly',
      'Confirm room category and tariff before check-in',
      'WiFi may be intermittent; plan accordingly for online work'
    ],
    confidenceLevel: 0.90
  },

  {
    // Rajesh Auto Stand - Varkala
    placeId: '11111111-1111-1111-1111-111111111104',
    safetyScore: 72,
    positiveHighlights: [
      'Accessible from railway station; convenient for arrivals',
      'Drivers generally know local routes well',
      'Standard meter-based fares available'
    ],
    thingsToKnow: [
      'Not all drivers use meters; negotiate rate beforehand',
      'Peak tourist season (Oct-Mar) sees inflated pricing',
      'Request drivers to use established routes; avoid vague directions'
    ],
    confidenceLevel: 0.78
  },

  {
    // Varkala Heritage Walking Tours
    placeId: '11111111-1111-1111-1111-111111111105',
    safetyScore: 86,
    positiveHighlights: [
      'Local guide with deep knowledge of history and culture',
      'Small group sizes ensure personalized attention',
      'Flexible itineraries based on tourist interests'
    ],
    thingsToKnow: [
      'Book tours 24 hours in advance; guides are often busy during peak season',
      'Tours require comfortable walking shoes and sun protection',
      'Payment usually accepted in cash; confirm beforehand'
    ],
    confidenceLevel: 0.87
  },

  // ────── GOA PROFILES ───────────────────────────────────────────

  {
    // Martins Corner
    placeId: '22222222-2222-2222-2222-222222222201',
    safetyScore: 84,
    positiveHighlights: [
      'Authentic Goan cuisine; famous for crab curry and fish fry',
      'Excellent seafood quality and reasonable Goan pricing',
      'Lively restaurant atmosphere; good for evening hangouts'
    ],
    thingsToKnow: [
      'Expect crowds during dinner hours; arrive early (6:30 PM) or late (9:30 PM)',
      'Beer and alcohol available; good pairing with Goan dishes',
      'Menu prices are displayed; check bill carefully before paying'
    ],
    confidenceLevel: 0.86
  },

  {
    // Curlies Beach Shack
    placeId: '22222222-2222-2222-2222-222222222202',
    safetyScore: 76,
    positiveHighlights: [
      'Beachfront location with sunset views',
      'Casual, relaxed vibe popular with tourists and locals',
      'Reasonably priced seafood and drinks'
    ],
    thingsToKnow: [
      'Food quality can be inconsistent during peak season',
      'Payment may have issues with online systems; carry cash as backup',
      'Cleanliness standards are casual beach-shack style; manage expectations',
      'Late-night spot; can be rowdy after 10 PM'
    ],
    confidenceLevel: 0.80
  },

  {
    // Palolem Beach Resort
    placeId: '22222222-2222-2222-2222-222222222203',
    safetyScore: 88,
    positiveHighlights: [
      'Beautiful Palolem beach location; highly rated infrastructure',
      'Mix of budget beach huts and comfortable standard rooms',
      'Professional management and consistent service quality'
    ],
    thingsToKnow: [
      'Book early during Oct-Mar season; rates double or triple',
      'Beach huts are basic; expect simple amenities',
      'Confirm cancellation policy before booking; peak season penalties apply',
      'Restaurant at resort is convenient but slightly overpriced'
    ],
    confidenceLevel: 0.91
  },

  {
    // Pilot Auto Taxi - Calangute
    placeId: '22222222-2222-2222-2222-222222222204',
    safetyScore: 75,
    positiveHighlights: [
      'Reliable for airport transfers and long-distance routes',
      'Drivers familiar with Goa geography and tourist hotspots',
      'Vehicles generally well-maintained and air-conditioned'
    ],
    thingsToKnow: [
      'Peak season surcharges common; negotiate rates during Oct-Mar',
      'Confirm destination and route before boarding; avoid miscommunications',
      'Long wait times possible during flight arrival hours'
    ],
    confidenceLevel: 0.79
  },

  {
    // Goa Heritage Trail Guides
    placeId: '22222222-2222-2222-2222-222222222205',
    safetyScore: 85,
    positiveHighlights: [
      'Knowledgeable guides with expertise in Goan history',
      'Well-organized tours to Old Goa, Fort Aguada, spice plantations',
      'Good balance of cultural education and tourist comfort'
    ],
    thingsToKnow: [
      'Tours take full day or half-day; plan accordingly',
      'Bring plenty of water and sun protection; outdoor walking tours',
      'Lunch at spice plantation tours is usually included; confirm details',
      'Physical fitness level matters for some tours; ask guide about difficulty'
    ],
    confidenceLevel: 0.89
  }
];
