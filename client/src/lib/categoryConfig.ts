import type { EntityType } from '../types/api';

export type DisplayCategory = 'TRANSPORT' | 'MEALS' | 'BOATS' | 'RENTALS';

export const CATEGORY_CONFIG: Record<DisplayCategory, { id: DisplayCategory, label: string, icon: string, color: string, bg: string, backendTypes: EntityType[] }> = {
  TRANSPORT: { id: 'TRANSPORT', label: 'Transport', icon: '🚗', color: 'text-category-transport-600', bg: 'bg-category-transport-50', backendTypes: ['TRANSPORT'] },
  MEALS:     { id: 'MEALS',     label: 'Meals',     icon: '🍛', color: 'text-category-meals-600',     bg: 'bg-category-meals-50',     backendTypes: ['RESTAURANT'] },
  BOATS:     { id: 'BOATS',     label: 'Boating',   icon: '🛶', color: 'text-category-boats-600',     bg: 'bg-category-boats-50',     backendTypes: ['GUIDE'] },
  RENTALS:   { id: 'RENTALS',   label: 'Rentals',   icon: '🛵', color: 'text-category-rentals-600',   bg: 'bg-category-rentals-50',   backendTypes: ['HOTEL', 'TRANSPORT', 'GUIDE'] }
} as const;

export function getDisplayCategory(backendType: EntityType): DisplayCategory {
  switch (backendType) {
    case 'TRANSPORT': return 'TRANSPORT';
    case 'RESTAURANT': return 'MEALS';
    case 'GUIDE': return 'BOATS';
    case 'HOTEL': return 'RENTALS';
    default: return 'MEALS';
  }
}

export function getCategoryAccent(backendType: EntityType) {
  const cat = CATEGORY_CONFIG[getDisplayCategory(backendType)];
  return { color: cat.color, bg: cat.bg, icon: cat.icon };
}
