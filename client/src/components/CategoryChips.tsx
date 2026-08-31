import { useAppStore } from '../store/useAppStore';

export function CategoryChips() {
  const { categoryFilter, setCategoryFilter } = useAppStore();
  const categories = ['ALL', 'TRANSPORT', 'MEALS', 'BOATS', 'RENTALS'];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {categories.map(cat => {
        const isSelected = categoryFilter === cat || (!categoryFilter && cat === 'ALL');
        return (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat === 'ALL' ? null : cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition whitespace-nowrap ${
              isSelected ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.charAt(0) + cat.slice(1).toLowerCase()}
          </button>
        );
      })}
    </div>
  );
}
