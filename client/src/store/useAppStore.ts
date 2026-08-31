import { create } from 'zustand';
import type { PlaceSearchResult } from '../types/api';

interface AppState {
  userLat: number;
  userLng: number;
  setUserLocation: (lat: number, lng: number) => void;

  selectedPlace: PlaceSearchResult | null;
  setSelectedPlace: (place: PlaceSearchResult | null) => void;

  places: PlaceSearchResult[];
  setPlaces: (places: PlaceSearchResult[]) => void;

  popToken: string | null;
  setPopToken: (token: string | null) => void;

  categoryFilter: string | null;
  setCategoryFilter: (cat: string | null) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  maxBudget: number | null;
  setMaxBudget: (budget: number | null) => void;

  verifiedOnly: boolean;
  setVerifiedOnly: (val: boolean) => void;

  excludeDiscrepancy: boolean;
  setExcludeDiscrepancy: (val: boolean) => void;

  activeTab: 'tourist' | 'merchant';
  setActiveTab: (tab: 'tourist' | 'merchant') => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Vallikavu Bridge Coordinate default:
  userLat: 9.0912,
  userLng: 76.5185,
  setUserLocation: (lat, lng) => set({ userLat: lat, userLng: lng }),

  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place, popToken: null }),

  places: [],
  setPlaces: (places) => set({ places }),

  popToken: null,
  setPopToken: (token) => set({ popToken: token }),

  categoryFilter: null,
  setCategoryFilter: (cat) => set({ categoryFilter: cat }),

  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  maxBudget: null,
  setMaxBudget: (budget) => set({ maxBudget: budget }),

  verifiedOnly: true,
  setVerifiedOnly: (val) => set({ verifiedOnly: val }),

  excludeDiscrepancy: false,
  setExcludeDiscrepancy: (val) => set({ excludeDiscrepancy: val }),

  activeTab: 'tourist',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
