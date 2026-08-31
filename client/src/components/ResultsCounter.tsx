import { useAppStore } from '../store/useAppStore';

export function ResultsCounter() {
  const { places, verifiedOnly } = useAppStore();
  const count = places.length;
  
  return (
    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
        Showing {count} {verifiedOnly ? 'Verified ' : ''}{count === 1 ? 'Place' : 'Places'}
      </span>
    </div>
  );
}
