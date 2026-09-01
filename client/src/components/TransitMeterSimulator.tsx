import { useState } from 'react';
import axios from 'axios';
import { X, Navigation, CarTaxiFront, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { formatINR } from '../lib/format';
import type { AuditQuoteResponse } from '../types/api';

const DESTINATIONS = [
  { name: 'Karunagappally Railway Station', lat: 9.0544, lng: 76.5338 },
  { name: 'Ochira Parabrahma Temple', lat: 9.1311, lng: 76.5089 },
  { name: 'Azheekal Beach', lat: 9.1245, lng: 76.4851 },
  { name: 'Amrita Vishwa Vidyapeetham', lat: 9.0905, lng: 76.5170 },
];

export function TransitMeterSimulator({ placeId, placeName, onClose }: { placeId: string, placeName: string, onClose: () => void }) {
  const [destIndex, setDestIndex] = useState(0);
  const [quotedPrice, setQuotedPrice] = useState('');
  const [isNightFare, setIsNightFare] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<AuditQuoteResponse['audit']>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAudit(e: React.FormEvent) {
    e.preventDefault();
    if (!quotedPrice) return;

    setLoading(true);
    setError(null);
    setAudit(null);

    const dest = DESTINATIONS[destIndex];

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/v1/platform/transit/audit-quote`, {
        placeId,
        destLat: dest.lat,
        destLng: dest.lng,
        quotedPrice: parseFloat(quotedPrice),
        isNightFare
      });
      if (res.data.success) setAudit(res.data.audit);
      else setError(res.data.error || 'Failed to calculate route fare');
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FAIR': return 'bg-brand-50 text-brand-700 border-brand-200';
      case 'MODERATE_SURGE': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'SEVERE_GOUGING': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-full bg-blue-100 p-2 text-blue-700"><CarTaxiFront className="h-5 w-5" /></div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Transit Meter & Fare Audit</h2>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{placeName}</p>
          </div>
        </div>

        <form onSubmit={handleAudit} className="mt-6 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
             <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
               <Navigation className="h-3.5 w-3.5" /> Destination Drop-off
             </label>
             <select 
               value={destIndex} 
               onChange={(e) => setDestIndex(parseInt(e.target.value))}
               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
             >
               {DESTINATIONS.map((d, i) => <option key={i} value={i}>{d.name}</option>)}
             </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Quoted Fare Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">₹</span>
                <input type="number" min="1" required value={quotedPrice} onChange={(e) => setQuotedPrice(e.target.value)} placeholder="0" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xl font-bold font-numeric focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer mt-2">
            <input type="checkbox" checked={isNightFare} onChange={(e) => setIsNightFare(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
            <span className="text-sm font-semibold text-slate-700">Night Tariff (10 PM to 5 AM)</span>
          </label>

          <button type="submit" disabled={loading || !quotedPrice} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin"/> : '📊 Audit Fare Quote'}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-rose-600 text-center">{error}</p>}

        {audit && (
          <div className="mt-6 border-t border-slate-100 pt-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="flex items-start justify-between">
                <div>
                   <h3 className="text-sm font-bold text-slate-900">Computed Route Details</h3>
                   <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                     <span>{audit.distanceKm} km</span> • <span>~{audit.durationMinutes} mins travel</span>
                     {audit.isGoogleLiveRouted && <span className="rounded bg-blue-50 px-1 text-blue-600 border border-blue-200 font-bold">Google Maps Live</span>}
                   </div>
                </div>
                <div className={`rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${getStatusColor(audit.status)}`}>
                  {audit.status.replace('_', ' ')}
                </div>
             </div>

             <div className="mt-4 flex gap-3">
                <div className="flex-1 rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Driver Quoted</p>
                  <p className="mt-0.5 text-2xl font-bold font-numeric text-slate-900">{formatINR(audit.quotedPrice)}</p>
                </div>
                <div className="flex flex-col items-center justify-center text-slate-400 font-bold">
                  vs
                </div>
                <div className="flex-1 rounded-xl bg-brand-50 border border-brand-200 p-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Official Rate</p>
                  <p className="mt-0.5 text-2xl font-bold font-numeric text-brand-700">{formatINR(audit.regulatedFare)}</p>
                </div>
             </div>

             <div className="mt-4 rounded-xl border border-slate-200 p-4">
                <div className="flex gap-2">
                  <div className="shrink-0 mt-0.5">
                    {audit.status === 'FAIR' ? <ShieldCheck className="h-5 w-5 text-brand-600" /> : <AlertTriangle className={`h-5 w-5 ${audit.status === 'SEVERE_GOUGING' ? 'text-rose-600' : 'text-amber-500'}`} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Discrepancy: {audit.discrepancyPercent > 0 && '+'}{audit.discrepancyPercent}%
                    </h4>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600">
                      {audit.recommendation}
                    </p>
                  </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
