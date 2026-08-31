import { useAppStore } from '../store/useAppStore';

export function BudgetSlider() {
  const { maxBudget, setMaxBudget } = useAppStore();
  const current = maxBudget || 1500;

  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Max Budget</label>
        <span className="rounded bg-brand-50 px-1.5 py-0.5 text-xs font-bold font-numeric text-brand-700 border border-brand-200">
          ₹{current}
        </span>
      </div>
      <input
        type="range"
        min="100"
        max="1500"
        step="100"
        value={current}
        onChange={(e) => setMaxBudget(parseInt(e.target.value))}
        className="h-1.5 w-full appearance-none rounded-full bg-slate-200 accent-brand-600"
      />
    </div>
  );
}
