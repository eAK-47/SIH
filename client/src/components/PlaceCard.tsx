import clsx from 'clsx';
import type { PlaceSearchResult } from '../types/api';
import { formatDistance, verificationBadge } from '../lib/format';
import { useAppStore } from '../store/useAppStore';
import { getCategoryAccent, getDisplayCategory, CATEGORY_CONFIG } from '../lib/categoryConfig';
import { } from './SafetyBadge';
import { FairPriceBandModule } from './FairPriceBandModule';
import { ThingsToKnow } from './ThingsToKnow';
import { ShieldCheck, CarTaxiFront, MapPin, Plus } from 'lucide-react';

export function PlaceCard({ place }: { place: PlaceSearchResult }) {
  const { selectedPlace, setSelectedPlace, setPopToken } = useAppStore();
  const isSelected = selectedPlace?.id === place.id;
  const badge = verificationBadge(place.verificationStatus);
  const catAccent = getCategoryAccent(place.entityType, place.name);
  const displayCat = CATEGORY_CONFIG[getDisplayCategory(place.entityType, place.name)];

  const mainBand = place.fairPriceBands[0];
  const advisoryMessages = place.intelligenceProfile?.thingsToKnow || [];

  return (
    <button
      onClick={() => {
        setSelectedPlace(isSelected ? null : place);
        setPopToken(null);
      }}
      className={clsx(
        'group w-full rounded-xl border p-4 text-left transition-all bg-white',
        isSelected
          ? 'border-brand-500 ring-1 ring-brand-500 shadow-card-hover'
          : 'border-slate-200 shadow-card hover:border-slate-300 hover:shadow-card-hover'
      )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={clsx('rounded-full border border-current/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider', catAccent.bg, catAccent.color)}>
              {displayCat.label}
            </span>
            {place.verificationStatus === 'VERIFIED' || place.verificationStatus === 'TRUSTED' ? (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-brand-600">
                <ShieldCheck className="h-3 w-3" /> Verified Presence
              </span>
            ) : null}
          </div>
          <h3 className="truncate text-[15px] font-bold text-slate-900">{place.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] font-medium text-slate-500">
            <MapPin className="h-3 w-3 text-slate-400" />
            {place.address}
            {place.distanceMeters != null && (
              <span className="ml-1 font-bold text-slate-700">— {formatDistance(place.distanceMeters)}</span>
            )}
          </p>
        </div>
        <span className={clsx('shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold', badge.color)}>
          {badge.label}
        </span>
      </div>

      {/* Fair Price Band (USP) */}
      {mainBand && <FairPriceBandModule band={mainBand} />}

      {/* Positive Highlights Tags */}
      {place.intelligenceProfile?.positiveHighlights && place.intelligenceProfile.positiveHighlights.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {place.intelligenceProfile.positiveHighlights.slice(0, 2).map((h, i) => (
            <span key={i} className="rounded-full border border-brand-100 bg-brand-50/50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
              ✓ {h}
            </span>
          ))}
        </div>
      )}

      {/* Things to Know Accordion */}
      <ThingsToKnow messages={advisoryMessages} />

      {/* Footer Action Row */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-[10px] font-bold text-slate-400 tracking-widest">
          {place.safetyTags.length > 0 && place.safetyTags[0].label}
        </span>
        <span onClick={(e) => { e.stopPropagation(); (window as any).openAddBill(place.id, place.name); }} 
              className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 transition hover:bg-slate-100">
          <Plus className="h-3 w-3" /> Add Bill 
        </span>
        {place.entityType === 'TRANSPORT' && (
          <button onClick={(e) => { e.stopPropagation(); (window as any).openTransitMeter(place.id, place.name); }} className="flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 transition hover:bg-blue-100 ml-2">
            <CarTaxiFront className="h-3 w-3"/> Calculate Fare
          </button>
        )}
      </div>
    </button>
  );
}
