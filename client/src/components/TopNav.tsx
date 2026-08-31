import { Search, Compass, Store } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GpsStatusPill } from './GpsStatusPill';

export function TopNav() {
  const { setActiveTab } = useAppStore();

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Compass className="h-5 w-5" />
          </div>
          <h1 className="text-[17px] font-bold tracking-tight text-slate-900 hidden md:block">TOURISM INTEL</h1>
        </div>
        <div className="hidden items-center md:flex">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            📍 Vallikavu Hub, Kollam
          </span>
        </div>
      </div>

      <div className="flex-1 px-4 md:max-w-md md:px-8">
        <div className="relative flex w-full items-center">
          <Search className="absolute left-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search places, sadya meals, auto stands..."
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <GpsStatusPill />
        <button 
          onClick={() => setActiveTab('merchant')}
          className="hidden md:flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <Store className="h-4 w-4" /> Merchant Portal
        </button>
      </div>
    </header>
  );
}
