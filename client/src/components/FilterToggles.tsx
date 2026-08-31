import { useAppStore } from '../store/useAppStore';

export function FilterToggles() {
  const { verifiedOnly, setVerifiedOnly, excludeDiscrepancy, setExcludeDiscrepancy } = useAppStore();

  return (
    <div className="flex gap-3 mt-3">
      <label className="flex items-center gap-1.5 cursor-pointer">
        <input 
          type="checkbox" 
          checked={verifiedOnly} 
          onChange={(e) => setVerifiedOnly(e.target.checked)}
          className="rounded border-slate-300 text-brand-600 focus:ring-brand-600 bg-slate-50"
        />
        <span className="text-xs font-semibold text-slate-700">Verified Only (PoP)</span>
      </label>
      <label className="flex items-center gap-1.5 cursor-pointer">
        <input 
          type="checkbox" 
          checked={excludeDiscrepancy} 
          onChange={(e) => setExcludeDiscrepancy(e.target.checked)}
          className="rounded border-slate-300 text-brand-600 focus:ring-brand-600 bg-slate-50"
        />
        <span className="text-xs font-medium text-slate-600">Exclude High Discrepancy</span>
      </label>
    </div>
  );
}
