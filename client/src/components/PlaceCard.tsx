import clsx from 'clsx';
import type { PlaceSearchResult } from '../types/api';
import { formatDistance, formatINR, entityTypeIcon, verificationBadge } from '../lib/format';
import { useAppStore } from '../store/useAppStore';
import { SafetyBadge } from './SafetyBadge';

export function PlaceCard({ place }: { place: PlaceSearchResult }) {
  const { selectedPlace, setSelectedPlace } = useAppStore();
  const isSelected = selectedPlace?.id === place.id;
  const badge = verificationBadge(place.verificationStatus);

  return (
    <button
      onClick={() => setSelectedPlace(isSelected ? null : place)}
      className={clsx(
        'w-full rounded-xl border p-3 text-left transition',
        isSelected
          ? 'border-saffron bg-saffron/5 shadow-md'
          : 'border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow'
      )}>
      <div className="mb-1 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{entityTypeIcon(place.entityType)}</span>
            <span className="truncate text-sm font-bold text-gray-900">{place.name}</span>
          </div>
          <p className="mt-0.5 truncate text-xs text-gray-500">{place.address}</p>
        </div>
        <span className={clsx('shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium', badge.color)}>
          {badge.label}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {place.distanceMeters != null && (
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
            {formatDistance(place.distanceMeters)}
          </span>
        )}
        {place.safetyTags.map((tag, i) => <SafetyBadge key={i} tag={tag} />)}
      </div>

      {place.fairPriceBands.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {place.fairPriceBands.slice(0, 2).map((b, i) => (
            <span key={i} className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">
              {b.itemName}: {formatINR(b.lowerBound)}-{formatINR(b.upperBound)}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
