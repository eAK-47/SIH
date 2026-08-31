import { useAppStore } from '../store/useAppStore';
import { Locate } from 'lucide-react';

export function LocationButton() {
  const { setUserLocation } = useAppStore();

  function handleClick() {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation(pos.coords.latitude, pos.coords.longitude),
      () => {
        // fallback to Varkala
        setUserLocation(8.7333, 76.7166);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }

  return (
    <button onClick={handleClick}
      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
      title="Use my location">
      <Locate className="h-3.5 w-3.5" /> Locate Me
    </button>
  );
}
