import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatINR } from '../lib/format';
import { Loader2, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle, Store, Send } from 'lucide-react';
import type { MerchantDashboardResponse } from '../types/api';

export function MerchantDashboard() {
  const [data, setData] = useState<MerchantDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'rate-card' | 'warnings'>('rate-card');

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/v1/platform/merchant/dashboard`,
          { headers: { 'x-user-id': 'user-123' } }
        );
        setData(res.data.data);
      } catch (err) {
        console.error('Failed to load merchant dashboard', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!data || !data.merchant) return <div className="p-12 text-center text-rose-500 font-bold bg-slate-50 h-full">Failed to load dashboard. Ensure you have registered.</div>;

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* Active Claim Banner */}
        <div className="flex items-center gap-3 rounded-2xl bg-brand-50 border border-brand-200 px-6 py-4 shadow-sm">
          <div className="rounded-full bg-brand-100 p-2 text-brand-600"><Store className="h-6 w-6"/></div>
          <div>
            <h1 className="text-xl font-bold text-brand-900">{data.merchant.businessName} — Claimed Business</h1>
            <p className="text-sm font-medium text-brand-700">Vallikavu Regional Hub • Active Mode</p>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex gap-2 border-b border-slate-200 pb-px">
           <button onClick={() => setActiveTab('rate-card')} className={`px-4 py-2 text-sm font-bold border-b-2 transition ${activeTab === 'rate-card' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Official Rate Card / Menu Editor</button>
           <button onClick={() => setActiveTab('warnings')} className={`px-4 py-2 text-sm font-bold border-b-2 transition ${activeTab === 'warnings' ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Disputed Warnings & Clarifications</button>
        </div>

        {/* Tab 1: Rate Card Editor */}
        {activeTab === 'rate-card' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <StatCard title="Safety Score" value={`${data.place.currentSafetyScore}/100`} icon={ShieldCheck} color="text-brand-600" bg="bg-brand-100" />
              <StatCard title="Total Submissions" value={data.submissionStats.totalSubmissions} icon={TrendingUp} color="text-blue-600" bg="bg-blue-100" />
              <StatCard title="Verified Submissions" value={data.submissionStats.verifiedSubmissions} icon={CheckCircle} color="text-amber-600" bg="bg-amber-100" />
              <StatCard title="Flagged Anomalies" value={data.submissionStats.flaggedItems} icon={AlertTriangle} color="text-rose-600" bg="bg-rose-100" />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Current AI Assessed Price Bands (MAD Engine)</h2>
                <span className="text-xs font-semibold text-slate-500">Live Community Averages</span>
              </div>
              
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Item / Service</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">Fair Price Range</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px] text-right">Crowdsourced Median</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px] text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.priceManagement.suggestedPrices.length === 0 && (
                      <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-500 text-sm">No crowdsourced data actively tracking.</td></tr>
                    )}
                    {data.priceManagement.suggestedPrices.map((item: any, i: number) => {
                      // Mock a discrepancy if median is > 300 for UI purposes (or use actual logic)
                      const isDiscrepancy = item.currentMarketMedian > 300; 

                      return (
                      <tr key={i} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-4 font-bold text-slate-900">{item.itemName}</td>
                        <td className="px-4 py-4 font-numeric font-bold text-brand-700">{formatINR(item.fairLow)} - {formatINR(item.fairHigh)}</td>
                        <td className="px-4 py-4 text-right font-numeric font-bold text-slate-900">
                          {formatINR(item.currentMarketMedian)}
                          {isDiscrepancy && <div className="text-[10px] text-rose-500 mt-0.5">⚠️ Anomaly Spike Detected</div>}
                        </td>
                        <td className="px-4 py-4 text-right">
                           <button className="text-xs font-bold text-brand-600 hover:text-brand-800 underline">Update Target Rate</button>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>

              {/* Mock Banner */}
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 shadow-[inset_4px_0_0_0_rgba(225,29,72,1)]">
                 <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0" />
                 <div>
                   <h4 className="text-sm font-bold text-rose-900">Discrepancy Alert Active</h4>
                   <p className="mt-0.5 text-xs font-medium text-rose-700">Community reports average pricing spike (₹450+) on certain drops. Verify your rate board to lift this warning.</p>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Disputed Warnings & Clarifications */}
        {activeTab === 'warnings' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-amber-900 mb-2">Active Passenger Advisories</h2>
              <p className="text-xs text-amber-800 mb-6">These AI-synthesized warnings are currently visible to all tourists checking your profile.</p>

              <div className="space-y-3">
                 <div className="rounded-xl bg-white p-4 shadow-sm border border-amber-100 flex items-start gap-3">
                   <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                   <p className="text-sm font-semibold text-slate-700">Late-night fare divergence reported up to ₹450; verify rate against standard board before boarding.</p>
                 </div>
                 <div className="rounded-xl bg-white p-4 shadow-sm border border-amber-100 flex items-start gap-3">
                   <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                   <p className="text-sm font-semibold text-slate-700">Seasonal tourist rush; some drivers requesting flat fees off-meter.</p>
                 </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Submit Official Clarification</h2>
              <p className="text-xs text-slate-500 mb-4">Post a permanent verified clarification to clear discrepancies on your AI profile.</p>
              
              <textarea rows={6} className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none placeholder:text-slate-400" placeholder="e.g., We have now introduced fixed-rate boards under union directives for post-9PM rides to AMMA ashram..."></textarea>
              <div className="flex-1" />
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
                <Send className="h-4 w-4" /> Submit to Verification Hub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-card-hover">
      <div className={`rounded-xl p-3.5 ${bg} ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
        <p className="text-2xl font-bold font-numeric text-slate-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
