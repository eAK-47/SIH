import axios from 'axios';
import { env } from '../config/index';
import { calculateDistance } from './geo-validator.service';

export interface RegulatedFareResult {
  distanceKm: number;
  durationMinutes: number;
  standardMeterFare: number;
  nightMeterFare: number;
  isGoogleLiveRouted: boolean;
}

export async function calculateRegulatedFare(
  originLat: number, originLng: number, destLat: number, destLng: number
): Promise<RegulatedFareResult> {
  let distanceMeters = 0;
  let durationSeconds = 0;
  let isGoogleLiveRouted = false;

  try {
    if (env.GOOGLE_MAPS_API_KEY) {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destLat},${destLng}&mode=driving&key=${env.GOOGLE_MAPS_API_KEY}`;
      const { data } = await axios.get(url);
      
      if (data.status === 'OK' && data.rows[0]?.elements[0]?.status === 'OK') {
        distanceMeters = data.rows[0].elements[0].distance.value;
        durationSeconds = data.rows[0].elements[0].duration.value;
        isGoogleLiveRouted = true;
      }
    }
  } catch (error) {
    console.warn('Google Distance Matrix API failed, falling back to Haversine:', (error as Error).message);
  }

  if (!isGoogleLiveRouted) {
    distanceMeters = calculateDistance(originLat, originLng, destLat, destLng) * 1.25;
    durationSeconds = (distanceMeters / 1000 / 30) * 3600; // avg speed 30km/h in local Kerala town roads
  }

  const distanceKm = distanceMeters / 1000;
  const durationMinutes = Math.ceil(durationSeconds / 60);

  // Kerala MVD Regulated Auto Rates
  const baseFare = 30;
  const baseDistance = 1.5;
  const perKmRate = 15;

  let standardMeterFare = baseFare;
  if (distanceKm > baseDistance) {
    standardMeterFare += Math.ceil(distanceKm - baseDistance) * perKmRate;
  }

  return {
    distanceKm: Math.round(distanceKm * 100) / 100,
    durationMinutes,
    standardMeterFare: Math.round(standardMeterFare),
    nightMeterFare: Math.round(standardMeterFare * 1.5),
    isGoogleLiveRouted
  };
}
