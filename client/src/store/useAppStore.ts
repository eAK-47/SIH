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

  activeTab: 'tourist' | 'merchant';
  setActiveTab: (tab: 'tourist' | 'merchant') => void;
}

export const useAppStore = create<AppState>((set) => ({
  userLat: 8.7333,
  userLng: 76.7166,
  setUserLocation: (lat, lng) => set({ userLat: lat, userLng: lng }),

  selectedPlace: null,
  setSelectedPlace: (place) => set({ selectedPlace: place, popToken: null }),

  places: [],
  setPlaces: (places) => set({ places }),

  popToken: null,
  setPopToken: (token) => set({ popToken: token }),

  categoryFilter: null,
  setCategoryFilter: (cat) => set({ categoryFilter: cat }),

  activeTab: 'tourist',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
