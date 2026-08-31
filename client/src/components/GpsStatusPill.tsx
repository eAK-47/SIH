import { MapPin } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function GpsStatusPill() {
  const { popToken } = useAppStore();
  const isActive = !!popToken;

  return (
    <div className={`hidden md:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${isActive ? 'bg-brand-50 text-brand-700 border-brand-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
      <MapPin className="h-3 w-3" />
      {isActive ? 'Live Location (<150m PoP Active)' : 'Using Live Location'}
    </div>
  );
}
