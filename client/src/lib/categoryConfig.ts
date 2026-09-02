import type { EntityType } from '../types/api';

export type DisplayCategory = 'TRANSPORT' | 'MEALS' | 'BOATS' | 'RENTALS' | 'HOSPITALS';

/**
 * Name-pattern detection for medical / wellness facilities.
 * Hospitals are seeded under the HOTEL backend type (non-breaking — Prisma
 * enum untouched) and are diverted to the HOSPITALS display category here.
 */
export function isMedicalPlace(placeName?: string): boolean {
  if (!placeName) return false;
  return /hospital|ayurveda|clinic|medical|wellness/i.test(placeName);
}

export const CATEGORY_CONFIG: Record<DisplayCategory, { id: DisplayCategory, label: string, icon: string, color: string, bg: string, backendTypes: EntityType[] }> = {
  TRANSPORT: { id: 'TRANSPORT',  label: 'Transport',  icon: '🚗', color: 'text-category-transport-600', bg: 'bg-category-transport-50', backendTypes: ['TRANSPORT'] },
  MEALS:     { id: 'MEALS',      label: 'Meals',      icon: '🍛', color: 'text-category-meals-600',     bg: 'bg-category-meals-50',     backendTypes: ['RESTAURANT'] },
  BOATS:     { id: 'BOATS',      label: 'Boating',    icon: '🛶', color: 'text-category-boats-600',     bg: 'bg-category-boats-50',     backendTypes: ['GUIDE'] },
  RENTALS:   { id: 'RENTALS',    label: 'Rentals',    icon: '🛵', color: 'text-category-rentals-600',   bg: 'bg-category-rentals-50',   backendTypes: ['HOTEL', 'TRANSPORT', 'GUIDE'] },
  HOSPITALS: { id: 'HOSPITALS',  label: 'Hospitals',  icon: '🏥', color: 'text-category-medical-600',   bg: 'bg-category-medical-50',   backendTypes: ['HOTEL'] }
} as const;

export function getDisplayCategory(backendType: EntityType, placeName?: string): DisplayCategory {
  // Medical / wellness facilities are seeded as HOTEL — divert by name first.
  if (isMedicalPlace(placeName)) return 'HOSPITALS';
  switch (backendType) {
    case 'TRANSPORT': return 'TRANSPORT';
    case 'RESTAURANT': return 'MEALS';
    case 'GUIDE': return 'BOATS';
    case 'HOTEL': return 'RENTALS';
    default: return 'MEALS';
  }
}

export function getCategoryAccent(backendType: EntityType, placeName?: string) {
  const cat = CATEGORY_CONFIG[getDisplayCategory(backendType, placeName)];
  return { color: cat.color, bg: cat.bg, icon: cat.icon };
}
