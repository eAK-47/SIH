import { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { searchPlaces } from '../lib/api';
import { MapView } from '../components/MapView';
import { PlaceCard } from '../components/PlaceCard';
import { CategoryChips } from '../components/CategoryChips';
import { BudgetSlider } from '../components/BudgetSlider';
import { FilterToggles } from '../components/FilterToggles';
import { ResultsCounter } from '../components/ResultsCounter';
import { SubmitBillModal } from '../components/SubmitBillModal';
import { Loader2 } from 'lucide-react';

export function TouristApp() {
  const { userLat, userLng, places, setPlaces, selectedPlace, categoryFilter, maxBudget, verifiedOnly, excludeDiscrepancy, searchQuery } = useAppStore();
  const [loading, setLoading] = useState(false);
  
  // Track modal state
  const [modalPlace, setModalPlace] = useState<{id: string, name: string} | null>(null);

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      try {
        const res = await searchPlaces(userLat, userLng, 5000, undefined, maxBudget || undefined);
        if (res.success && res.data?.places) {
          let filtered = res.data.places;
          
          if (categoryFilter) {
            // Map UI Category to backend EntityType
            const map: Record<string, string[]> = {
              'TRANSPORT': ['TRANSPORT'],
              'MEALS': ['RESTAURANT'],
              'BOATS': ['GUIDE'],
              'RENTALS': ['HOTEL'] // based on our mapping
            };
            const allowedTypes = map[categoryFilter] || [];
            filtered = filtered.filter(p => allowedTypes.includes(p.entityType));
          }

          if (verifiedOnly) {
            filtered = filtered.filter(p => p.verificationStatus === 'VERIFIED' || p.verificationStatus === 'TRUSTED');
          }
          if (excludeDiscrepancy) {
            filtered = filtered.filter(p => !p.fairPriceBands.some(b => b.outlierCount > 0));
          }
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q));
          }

          setPlaces(filtered);
        }
      } catch (error) {
        console.error('Failed to load places:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPlaces();
  }, [userLat, userLng, categoryFilter, maxBudget, verifiedOnly, excludeDiscrepancy, searchQuery, setPlaces]);

  // Make PlaceCard trigger our new Add Bill modal
  useEffect(() => {
    const handleAddBill = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.add-bill-btn') && selectedPlace) {
         setModalPlace({ id: selectedPlace.id, name: selectedPlace.name });
      }
    };
    document.addEventListener('click', handleAddBill);
    return () => document.removeEventListener('click', handleAddBill);
  }, [selectedPlace]);

  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* LEFT: Filters + Feed (560px) */}
      <div className="flex w-full flex-col border-r border-slate-200 bg-slate-50 md:w-[560px] flex-shrink-0 relative z-20 shadow-[1px_0_10px_rgba(0,0,0,0.05)]">
        
        {/* Sticky Filters Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur px-5 py-4 border-b border-slate-200 shadow-sm">
          <CategoryChips />
          <BudgetSlider />
          <FilterToggles />
          <ResultsCounter />
        </div>

        {/* Places Feed List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-24">
          {loading ? (
            <div className="flex items-center justify-center p-12 text-slate-400">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading Vallikavu Hub data...
            </div>
          ) : places.length === 0 ? (
            <div className="p-12 text-center text-sm font-medium text-slate-500">
              No matching places found. Adjust your filters or location.
            </div>
          ) : (
            places.map(place => (
              <div key={place.id} onClick={(e) => {
                 // Hack to intercept Add Bill button inside the PlaceCard since we don't have direct props passing for it
                 const t = e.target as HTMLElement;
                 if (t.innerText.includes('ADD BILL') || t.closest('span')?.innerText.includes('ADD BILL')) {
                    setModalPlace({id: place.id, name: place.name});
                 }
              }}>
                <PlaceCard place={place} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* RIGHT: Map View */}
      <div className="flex-1 bg-slate-100 relative z-10">
        <MapView />
      </div>

      {/* Sub-modals */}
      {modalPlace && <SubmitBillModal placeId={modalPlace.id} placeName={modalPlace.name} onClose={() => setModalPlace(null)} />}
    </div>
  );
}
