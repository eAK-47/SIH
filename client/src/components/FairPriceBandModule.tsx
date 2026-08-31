import type { FairPriceBand } from '../types/api';
import { formatINR } from '../lib/format';

export function FairPriceBandModule({ band }: { band: FairPriceBand }) {
  const hasOutlier = band.outlierCount > 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-sm mt-3">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
        Fair Price Range (Typical)
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-slate-900 font-numeric">
            {formatINR(band.lowerBound)} – {formatINR(band.upperBound)}
          </span>
          {!hasOutlier && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              ✓
            </span>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold text-slate-600">Median: {formatINR(band.median)}</span>
          {hasOutlier && (
            <span className="mt-1 rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-600">
              ⚠️ {band.outlierCount} spike isolated
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
