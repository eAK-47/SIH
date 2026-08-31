import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { searchPlaces } from '../lib/api';
import { MapView } from '../components/MapView';
import { PlaceCard } from '../components/PlaceCard';
import { AdvisoryPanel } from '../components/AdvisoryPanel';
import { PriceSubmitForm } from '../components/PriceSubmitForm';
import { VerifyPoPModal } from '../components/VerifyPoPModal';
import { PriceBandChart } from '../components/PriceBandChart';
import { ShieldAlert, Loader2 } from 'lucide-react';

export function TouristApp() {
  const { userLat, userLng, places, setPlaces, selectedPlace, categoryFilter, setCategoryFilter } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [showPopModal, setShowPopModal] = useState(false);

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      try {
        const res = await searchPlaces(userLat, userLng, 5000, categoryFilter || undefined);
        if (res.success && res.data?.places) {
          setPlaces(res.data.places);
        }
      } catch (error) {
        console.error('Failed to load places:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPlaces();
  }, [userLat, userLng, categoryFilter, setPlaces]);

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* LEFT: Layout with Places List */}
      <div className="flex w-full flex-col border-r border-gray-200 bg-white md:w-[400px]">
        {/* Filters */}
        <div className="border-b border-gray-100 p-4">
          <h2 className="mb-3 text-sm font-bold text-gray-800">Nearby Local Services</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['ALL', 'RESTAURANT', 'HOTEL', 'GUIDE', 'TRANSPORT'].map(cat => {
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat === 'ALL' ? null : cat)}
                  className={`rounded-full px-3 py-1 text-[11px] font-medium whitespace-nowrap transition \${
                    isSelected ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Places List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex items-center justify-center p-8 text-gray-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading places...
            </div>
          ) : places.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">No places found in this area.</div>
          ) : (
            places.map(place => <PlaceCard key={place.id} place={place} />)
          )}
        </div>
      </div>

      {/* MIDDLE: Map */}
      <div className="flex-1 bg-gray-100 p-2 md:order-none order-first h-[300px] md:h-auto">
        <MapView />
      </div>

      {/* RIGHT: Detail View */}
      {selectedPlace && (
        <div className="flex w-full flex-col border-l border-gray-200 bg-white md:w-[350px] shadow-[0_0_15px_rgba(0,0,0,0.05)]">
          <div className="border-b border-gray-100 p-4">
            <h3 className="text-lg font-bold text-gray-900">{selectedPlace.name}</h3>
            <p className="text-xs text-gray-500">{selectedPlace.address}</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Intel Profile Snippet */}
            {selectedPlace.intelligenceProfile ? (
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm">
                <div className="font-semibold text-blue-900 flex items-center gap-1.5 mb-1"><ShieldAlert className="h-4 w-4"/> Safety Score: {selectedPlace.intelligenceProfile.safetyScore}/100</div>
              </div>
            ) : null}

            {/* AI Advisory */}
            <AdvisoryPanel placeId={selectedPlace.id} />

            {/* Fair Price Bands */}
            <div className="space-y-2">
               <h4 className="text-sm font-bold text-gray-800">Verified Price Range (MAD)</h4>
               {selectedPlace.fairPriceBands.length > 0 ? (
                 selectedPlace.fairPriceBands.map((band, idx) => (
                   <PriceBandChart key={idx} band={band} />
                 ))
               ) : (
                 <p className="text-xs text-gray-500 italic">No price bands established yet.</p>
               )}
            </div>

            <hr className="border-gray-100" />
            
            {/* Price Submit */}
            <PriceSubmitForm placeId={selectedPlace.id} />

            <button onClick={() => setShowPopModal(true)} className="w-full text-[10px] text-gray-500 hover:text-navy underline">
               Test Proof-of-Presence Token Manually
            </button>
          </div>

          {showPopModal && <VerifyPoPModal placeId={selectedPlace.id} onClose={() => setShowPopModal(false)} />}
        </div>
      )}
    </div>
  );
}
