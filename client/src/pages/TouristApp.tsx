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
import { TransitMeterSimulator } from '../components/TransitMeterSimulator';
import { matchesSearch } from '../lib/searchEngine';

export function TouristApp() {
  const { userLat, userLng, places, setPlaces, categoryFilter, maxBudget, verifiedOnly, excludeDiscrepancy, searchQuery } = useAppStore();
  const [loading, setLoading] = useState(false);
  
  // Track modal state
  const [modalPlace, setModalPlace] = useState<{id: string, name: string} | null>(null);
  const [transitModal, setTransitModal] = useState<{id: string, name: string} | null>(null);

  
  useEffect(() => {
    (window as any).openTransitMeter = (id: string, name: string) => setTransitModal({ id, name });
    (window as any).openAddBill = (id: string, name: string) => setModalPlace({ id, name });
    return () => { delete (window as any).openTransitMeter; delete (window as any).openAddBill; };
  }, []);

  useEffect(() => {
    async function loadPlaces() {
      setLoading(true);
      try {
        const res = await searchPlaces(userLat, userLng, 8000, undefined, maxBudget || undefined);
        if (res.success && res.data?.places) {
          let filtered = res.data.places;
          
          if (categoryFilter) {
            // Map UI Category to backend EntityType.
            // Hospitals are seeded as HOTEL but identified by name pattern,
            // so RENTALS must exclude medical facilities and vice-versa.
            const medical = /hospital|ayurveda|clinic|medical|wellness/i;
            const map: Record<string, string[]> = {
              'TRANSPORT': ['TRANSPORT'],
              'MEALS': ['RESTAURANT'],
              'BOATS': ['GUIDE'],
              'RENTALS': ['HOTEL'],
              'HOSPITALS': ['HOTEL']
            };
            const allowedTypes = map[categoryFilter] || [];
            filtered = filtered.filter(p => {
              if (!allowedTypes.includes(p.entityType)) return false;
              if (categoryFilter === 'HOSPITALS') return medical.test(p.name);
              if (categoryFilter === 'RENTALS') return !medical.test(p.name);
              return true;
            });
          }

          if (verifiedOnly) {
            filtered = filtered.filter(p => p.verificationStatus === 'VERIFIED' || p.verificationStatus === 'TRUSTED');
          }
          if (excludeDiscrepancy) {
            filtered = filtered.filter(p => !p.fairPriceBands.some(b => b.outlierCount > 0));
          }
          if (searchQuery) {
            // Multi-attribute match: names, addresses, dishes, routes,
            // treatments, categories + colloquial synonyms (searchEngine).
            filtered = filtered.filter(p => matchesSearch(p, searchQuery));
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
              <PlaceCard key={place.id} place={place} />
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
      {transitModal && <TransitMeterSimulator placeId={transitModal.id} placeName={transitModal.name} onClose={() => setTransitModal(null)} />}
    </div>
  );
}
