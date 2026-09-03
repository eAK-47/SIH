import axios from 'axios';
import type {
  SearchResponse,
  PlaceDetailsResponse,
  PriceAnalysisResponse,
  PopVerificationResponse,
  AdvisoryResponse,
  PriceSubmitResponse,
  ChatQueryResponse,
} from '../types/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 15000,
});

export async function searchPlaces(
  lat: number, lng: number, radiusMeters = 5000,
  category?: string, maxBudget?: number
): Promise<SearchResponse> {
  const params: Record<string, string | number> = { lat, lng, radiusMeters };
  if (category) params.category = category;
  if (maxBudget) params.maxBudget = maxBudget;
  const { data } = await api.get('/api/v1/places/search', { params });
  return data;
}

export async function getPlaceDetails(id: string): Promise<PlaceDetailsResponse> {
  const { data } = await api.get(`/api/v1/places/${id}`);
  return data;
}

export async function getItemPriceAnalysis(id: string, itemName: string, category: string): Promise<PriceAnalysisResponse> {
  const { data } = await api.get(`/api/v1/places/${id}/price-analysis`, {
    params: { itemName, category }
  });
  return data;
}

export async function verifyPop(
  userLat: number, userLng: number, placeId: string
): Promise<PopVerificationResponse> {
  const { data } = await api.post('/api/v1/platform/pop/verify', {
    userLat, userLng, placeId
  });
  return data;
}

export async function generateAdvisory(placeId: string, forceRefresh = false): Promise<AdvisoryResponse> {
  const { data } = await api.post('/api/v1/platform/advisory/generate', {
    placeId, forceRefresh
  });
  return data;
}

export async function submitPrice(params: {
  placeId: string; itemName: string; category: string;
  reportedPrice: number; popToken: string; userComment?: string;
}): Promise<PriceSubmitResponse> {
  const { data } = await api.post('/api/v1/platform/prices/submit', params);
  return data;
}

export async function chatQuery(params: {
  message: string; userLat: number; userLng: number; language?: string;
}): Promise<ChatQueryResponse> {
  const { data } = await api.post('/api/v1/platform/chat/query', params);
  return data;
}
