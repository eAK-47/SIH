import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '../store/useAppStore';
import { entityTypeIcon, formatDistance } from '../lib/format';

// Fix Leaflet default marker icon issue in Vite
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const userIcon = L.divIcon({
  className: 'custom-user-marker',
  html: '<div style="background:#FF9933;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});


function FitBounds() {
  const map = useMap();
  const { places, userLat, userLng } = useAppStore();

  useEffect(() => {
    if (places.length === 0) return;
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
    <MapContainer center={center} zoom={13} className="h-full w-full rounded-xl border border-gray-200" style={{ minHeight: '100%' }}>
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
        return (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            eventHandlers={{
              click: () => setSelectedPlace(isSelected ? null : place),
            }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <div className="text-sm font-bold">{entityTypeIcon(place.entityType)} {place.name}</div>
                <div className="text-xs text-gray-500">{place.entityType}</div>
                {place.distanceMeters != null && (
                  <div className="text-xs text-blue-600">{formatDistance(place.distanceMeters)}</div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
