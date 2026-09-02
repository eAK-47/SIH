import type { PlaceSearchResult } from '../types/api';
import { getDisplayCategory } from './categoryConfig';

/**
 * High-coverage multi-attribute keyword search engine.
 *
 * Every place is flattened into a lowercase "haystack" spanning:
 *   - place name, address, entity type, display category, verification status
 *   - every fair-price band item name + category (dishes, routes, treatments)
 *   - intelligence profile highlights + advisories + safety tags
 *
 * Colloquial queries ("porotta", "activa", "op ticket", "ayurveda") are
 * expanded through a synonym map before matching. Token semantics are OR
 * (high recall — the right trade-off for discovery search over a small
 * local dataset). Tokens of ≤2 chars match on word boundaries only, so
 * "op" hits "OP Ticket" but not "Drop".
 */

const SYNONYMS: Record<string, string[]> = {
  // ─── Dishes & food ───
  biriyani: ['biryani', 'chicken', 'rice'],
  biryani: ['biriyani', 'chicken', 'rice'],
  sadya: ['meals', 'thali', 'veg', 'rice'],
  meals: ['sadya', 'thali', 'rice'],
  porotta: ['parotta', 'beef'],
  parotta: ['porotta', 'beef'],
  dosa: ['ghee', 'roast'],
  thali: ['meals', 'sadya'],
  fish: ['karimeen', 'ayala', 'mackerel', 'prawns', 'curry', 'seafood'],
  karimeen: ['fish', 'pollichathu'],
  prawns: ['tiger', 'seafood', 'fry'],
  lime: ['juice', 'beverage', 'water'],
  coconut: ['tender', 'beverage'],
  food: ['meals', 'restaurant', 'dining'],
  restaurant: ['meals', 'food', 'dining'],

  // ─── Transport & landmarks ───
  auto: ['transport', 'stand', 'rickshaw'],
  rickshaw: ['auto', 'transport'],
  taxi: ['transport', 'cab', 'stand'],
  drop: ['railway', 'station', 'ride'],
  railway: ['station', 'drop', 'karunagappally'],
  station: ['railway', 'drop', 'karunagappally'],
  temple: ['ochira', 'parabrahma'],
  ochira: ['temple', 'parabrahma'],
  beach: ['azheekal', 'sea', 'harbour'],
  stand: ['junction', 'auto', 'transport'],

  // ─── Bus & transit ───
  bus: ['ksrtc', 'shuttle', 'stop', 'stand'],
  ksrtc: ['bus', 'service', 'centre'],
  shuttle: ['bus', 'maxi', 'private'],
  timetable: ['timing', 'schedule', 'bus'],
  schedule: ['timing', 'timetable', 'bus'],
  fare: ['ticket', 'token', 'price', 'rate'],
  kollam: ['ksrtc', 'bus', 'karunagappally'],
  karunagappally: ['bus', 'ksrtc', 'station', 'railway', 'hospital'],

  // ─── Rentals ───
  activa: ['scooter', 'rental', 'bike', 'honda'],
  jupiter: ['scooter', 'tvs', 'rental'],
  scooter: ['activa', 'jupiter', 'rental', 'bike'],
  bike: ['scooter', 'activa', 'rental'],
  cycle: ['bicycle', 'rental', 'geared'],
  bicycle: ['cycle', 'rental'],
  rental: ['rent', 'hire'],
  enfield: ['royal', 'motorcycle', 'rental'],
  royal: ['enfield', 'motorcycle', 'rental'],

  // ─── Activities & boating ───
  kayak: ['boat', 'paddle', 'canoe', 'backwater'],
  canoe: ['boat', 'country', 'ride', 'backwater'],
  shikara: ['boat', 'cruise', 'ride'],
  boat: ['kayak', 'canoe', 'shikara', 'cruise', 'jetty', 'ride'],
  cruise: ['boat', 'motor', 'ride'],
  speedboat: ['boat', 'ride', 'sea'],
  boating: ['boat', 'ride', 'jetty'],
  jetty: ['boat', 'harbour', 'desk'],
  backwater: ['kayak', 'canoe', 'boat'],
  pedal: ['boat', 'kayal'],

  // ─── Medical & wellness ───
  ayurveda: ['hospital', 'panchakarma', 'wellness', 'abhyangam', 'medical'],
  panchakarma: ['ayurveda', 'abhyangam', 'therapy', 'hospital'],
  abhyangam: ['panchakarma', 'ayurveda', 'therapy'],
  op: ['consultation', 'ticket', 'doctor', 'outpatient'],
  outpatient: ['op', 'consultation', 'doctor'],
  ticket: ['op', 'fee', 'token', 'consultation', 'fare', 'bus'],
  token: ['ticket', 'fare', 'bus'],
  consultation: ['doctor', 'op', 'specialist'],
  doctor: ['consultation', 'op', 'specialist', 'medical'],
  casualty: ['emergency', 'assessment', 'registration'],
  emergency: ['casualty', 'observation', 'hospital', 'triage'],
  observation: ['emergency', 'triage', 'hospital'],
  hospital: ['medical', 'emergency', 'clinic'],
  pharmacy: ['medicine', 'prescription'],
  medicine: ['pharmacy', 'prescription'],
  blood: ['test', 'panel', 'chemistry', 'lab'],
  lab: ['blood', 'test', 'panel'],
  wellness: ['ayurveda', 'package', 'therapy'],
};

/** Flatten a place into one lowercase haystack string across all attributes. */
export function buildHaystack(place: PlaceSearchResult): string {
  const parts: (string | undefined)[] = [
    place.name,
    place.address,
    place.entityType,
    getDisplayCategory(place.entityType, place.name),
    place.verificationStatus,
    ...place.fairPriceBands.map(b => b.itemName),
    ...place.fairPriceBands.map(b => b.category),
    place.intelligenceProfile?.positiveHighlights?.join(' '),
    place.intelligenceProfile?.thingsToKnow?.join(' '),
    place.safetyTags?.map(t => t.label).join(' '),
  ];
  return parts.filter(Boolean).join(' ').toLowerCase();
}

/** Expand one raw query token into itself + plural-stripped + synonyms. */
function expandToken(token: string): string[] {
  const expanded = new Set<string>([token]);
  if (token.length > 3 && token.endsWith('s')) expanded.add(token.slice(0, -1));
  const direct = SYNONYMS[token];
  if (direct) direct.forEach(s => expanded.add(s));
  return [...expanded];
}

/** Short tokens (≤2 chars) match on word boundaries to avoid substring noise. */
function hit(haystack: string, word: string): boolean {
  if (word.length <= 2) return new RegExp(`\\b${word}\\b`).test(haystack);
  return haystack.includes(word);
}

/**
 * Multi-attribute keyword match with colloquial synonym expansion.
 * OR semantics across tokens; the full raw phrase also gets a direct check
 * so multi-word queries like "op ticket" or "auto drop" hit verbatim first.
 */
export function matchesSearch(place: PlaceSearchResult, rawQuery: string): boolean {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return true;
  const haystack = buildHaystack(place);
  if (haystack.includes(query)) return true;

  const tokens = query.split(/[\s,]+/).filter(Boolean);
  return tokens.some(token => expandToken(token).some(word => hit(haystack, word)));
}