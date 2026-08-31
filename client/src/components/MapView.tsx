import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '../store/useAppStore';
import { getDisplayCategory, CATEGORY_CONFIG } from '../lib/categoryConfig';
import { formatINR, formatDistance } from '../lib/format';
import type { PlaceSearchResult } from '../types/api';

const VALLIKAVU_CENTER: [number, number] = [9.0912, 76.5185];

const categoryHexColor: Record<string, string> = {
  transport: '#2563EB',
  meals: '#059669',
  boats: '#9333EA',
  rentals: '#D97706',
};

const createCustomIcon = (place: PlaceSearchResult, isSelected: boolean) => {
  const cat = getDisplayCategory(place.entityType);
  const color = categoryHexColor[cat];
  const size = isSelected ? 40 : 30;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3" fill="white"/>
    </svg>
  `;
  return L.divIcon({
    className: 'custom-pin',
    html: svg,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const userIcon = L.divIcon({
  className: 'custom-user-marker',
  html: '<div style="background:#fff;border:3px solid #059669;width:18px;height:18px;border-radius:50%;box-shadow:0 0 0 4px rgba(5,150,105,0.2);"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function FitBounds() {
  const map = useMap();
  const { places, userLat, userLng } = useAppStore();

  useEffect(() => {
    if (places.length === 0) {
      map.setView(VALLIKAVU_CENTER, 14);
      return;
    }
    const bounds = L.latLngBounds([
      [userLat, userLng],
      ...places.map(p => [p.latitude, p.longitude] as [number, number])
    ]);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }, [places, userLat, userLng, map]);

  return null;
}

export function MapView() {
  const { places, selectedPlace, setSelectedPlace, userLat, userLng } = useAppStore();
  const center = useMemo(() => [userLat, userLng] as [number, number], [userLat, userLng]);

  return (
    <MapContainer center={center} zoom={14} className="h-full w-full" style={{ minHeight: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds />

      {/* User marker */}
      <Marker position={[userLat, userLng]} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Place markers */}
      {places.map(place => {
        const isSelected = selectedPlace?.id === place.id;
        const icon = createCustomIcon(place, isSelected);
        return (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={icon}
            eventHandlers={{
              click: () => setSelectedPlace(isSelected ? null : place),
            }}
          >
            <Tooltip direction="top" offset={[0, -32]} opacity={1} className="leaflet-custom-tooltip">
              <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-card min-w-[180px]">
                <div className="text-xs font-bold text-slate-900">{place.name}</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-brand-600">
                  {CATEGORY_CONFIG[getDisplayCategory(place.entityType)].label}
                </div>
                {place.fairPriceBands[0] && (
                  <div className="mt-1 text-[11px] font-semibold font-numeric text-slate-700">
                    {formatINR(place.fairPriceBands[0].lowerBound)} – {formatINR(place.fairPriceBands[0].upperBound)}
                  </div>
                )}
                {place.distanceMeters != null && (
                  <div className="text-[10px] text-slate-500">{formatDistance(place.distanceMeters)}</div>
                )}
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
