/**
 * Geo-Spatial Proof-of-Presence (PoP) Service
 *
 * Implements the Haversine formula to verify user location against a target place.
 * Used for tourist verification before price submission.
 *
 * Haversine Formula:
 * d = 2R arcsin(√[sin²(Δφ/2) + cos(φ₁)cos(φ₂)sin²(Δλ/2)])
 *
 * Where:
 * - R = Earth's mean radius (6,371 km)
 * - φ = latitude (in radians)
 * - λ = longitude (in radians)
 */

const EARTH_RADIUS_METERS = 6_371_000;
const DEFAULT_MAX_RADIUS_METERS = 150; // 150m = street-level accuracy

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Calculate great-circle distance between two coordinates using Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  if (
    !Number.isFinite(lat1) ||
    !Number.isFinite(lng1) ||
    !Number.isFinite(lat2) ||
    !Number.isFinite(lng2)
  ) {
    throw new Error('Invalid coordinates: all values must be finite numbers');
  }

  if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90) {
    throw new Error('Invalid latitude: must be between -90 and 90 degrees');
  }

  if (lng1 < -180 || lng1 > 180 || lng2 < -180 || lng2 > 180) {
    throw new Error('Invalid longitude: must be between -180 and 180 degrees');
  }

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lng2 - lng1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.asin(Math.sqrt(a));
  return Math.round(EARTH_RADIUS_METERS * c);
}

export interface PoPresenceResult {
  isVerified: boolean;
  distanceMeters: number;
  status: 'VERIFIED' | 'OUT_OF_RANGE' | 'INVALID_INPUT';
  message: string;
}

/**
 * Verify user is within acceptable radius of target location
 */
export function verifyPresence(
  userLat: number,
  userLng: number,
  targetLat: number,
  targetLng: number,
  maxRadiusMeters: number = DEFAULT_MAX_RADIUS_METERS
): PoPresenceResult {
  try {
    if (!Number.isFinite(maxRadiusMeters) || maxRadiusMeters <= 0) {
      return {
        isVerified: false,
        distanceMeters: 0,
        status: 'INVALID_INPUT',
        message: 'Invalid radius: must be a positive number',
      };
    }

    const distance = calculateDistance(userLat, userLng, targetLat, targetLng);

    if (distance <= maxRadiusMeters) {
      return {
        isVerified: true,
        distanceMeters: distance,
        status: 'VERIFIED',
        message: `Location verified: \${distance}m from target (within \${maxRadiusMeters}m limit)`,
      };
    }

    return {
      isVerified: false,
      distanceMeters: distance,
      status: 'OUT_OF_RANGE',
      message: `Too far from target: \${distance}m (exceeds \${maxRadiusMeters}m limit)`,
    };
  } catch (error) {
    return {
      isVerified: false,
      distanceMeters: 0,
      status: 'INVALID_INPUT',
      message:
        error instanceof Error
          ? error.message
          : 'Unknown error during PoP verification',
    };
  }
}

/**
 * Generate PoP verification token (base64 payload)
 */
export function generatePopToken(
  userLat: number,
  userLng: number,
  placeId: string,
  timestamp: Date = new Date()
): string {
  const payload = {
    lat: Math.round(userLat * 10000) / 10000,
    lng: Math.round(userLng * 10000) / 10000,
    placeId,
    ts: timestamp.getTime(),
    v: 1,
  };

  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export interface PopTokenPayload {
  lat: number;
  lng: number;
  placeId: string;
  ts: number;
  v: number;
}

/**
 * Verify and decode PoP token
 */
export function verifyPopToken(
  token: string,
  maxAgeSeconds: number = 3600
): PopTokenPayload | null {
  try {
    const payload = JSON.parse(
      Buffer.from(token, 'base64').toString('utf-8')
    ) as PopTokenPayload;

    if (
      !payload.lat ||
      !payload.lng ||
      !payload.placeId ||
      !payload.ts ||
      payload.v !== 1
    ) {
      return null;
    }

    const age = (Date.now() - payload.ts) / 1000;
    if (age > maxAgeSeconds) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
