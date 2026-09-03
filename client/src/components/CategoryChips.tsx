import { useAppStore } from '../store/useAppStore';
import i18n from '../lib/i18n';

const CATEGORIES = ['ALL', 'TRANSPORT', 'MEALS', 'BOATS', 'RENTALS', 'HOSPITALS'];

export function CategoryChips() {
  const { categoryFilter, setCategoryFilter } = useAppStore();

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map(cat => {
        const isSelected = categoryFilter === cat || (!categoryFilter && cat === 'ALL');
        const label = cat === 'ALL' ? i18n.t('categories.all') : i18n.t(`categories.${cat.toLowerCase()}`);
        return (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat === 'ALL' ? null : cat)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition whitespace-nowrap ${
              isSelected ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
