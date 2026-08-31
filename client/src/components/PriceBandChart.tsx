import type { FairPriceBand } from '../types/api';
import { formatINR } from '../lib/format';

export function PriceBandChart({ band }: { band: FairPriceBand }) {
  const totalRange = band.upperBound - band.lowerBound;
  const medianPosition = totalRange > 0 ? ((band.median - band.lowerBound) / totalRange) * 100 : 50;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">{band.itemName}</span>
        <span className="text-xs text-gray-500">{band.category}</span>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-lg font-bold text-green-700">{formatINR(band.lowerBound)}</span>
        <span className="text-xs text-gray-400">to</span>
        <span className="text-lg font-bold text-green-700">{formatINR(band.upperBound)}</span>
      </div>

      <div className="relative mb-2 h-2 w-full rounded-full bg-gray-200">
        <div className="absolute left-0 top-0 h-2 rounded-full bg-green-300" style={{ width: '100%' }} />
        <div
          className="absolute top-0 h-2 w-1 -translate-x-1/2 rounded-full bg-green-600 shadow"
          style={{ left: `${medianPosition}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Median: {formatINR(band.median)}</span>
        <span>{band.observationCount} obs {band.outlierCount > 0 && `(${band.outlierCount} outlier${band.outlierCount > 1 ? 's' : ''})`}</span>
      </div>
    </div>
  );
}
