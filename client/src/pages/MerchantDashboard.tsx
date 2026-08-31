import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatINR } from '../lib/format';
import { Loader2, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';
import type { MerchantDashboardResponse } from '../types/api';

export function MerchantDashboard() {
  const [data, setData] = useState<MerchantDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

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
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  if (!data) return <div className="p-8 text-center text-red-500">Failed to load dashboard</div>;

  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{data.place.name}</h1>
          <p className="text-sm text-gray-500">Merchant Dashboard • Settings & Analytics</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard title="Safety Score" value={`${data.place.currentSafetyScore}/100`} icon={ShieldCheck} color="text-green-600" bg="bg-green-100" />
          <StatCard title="Total Submissions" value={data.submissionStats.totalSubmissions} icon={TrendingUp} color="text-blue-600" bg="bg-blue-100" />
          <StatCard title="Verified Submissions" value={data.submissionStats.verifiedSubmissions} icon={CheckCircle} color="text-saffron" bg="bg-orange-100" />
          <StatCard title="Flagged Anomalies" value={data.submissionStats.flaggedItems} icon={AlertTriangle} color="text-red-600" bg="bg-red-100" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Price Tracking */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-gray-900">Price Tracking (MAD)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500">
                    <th className="pb-2 font-medium">Item</th>
                    <th className="pb-2 font-medium">Fair Range</th>
                    <th className="pb-2 font-medium text-right">Median</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.priceManagement.suggestedPrices.map((item: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-2.5 font-medium">{item.itemName}</td>
                      <td className="py-2.5 text-green-700">{formatINR(item.fairLow)} - {formatINR(item.fairHigh)}</td>
                      <td className="py-2.5 text-right font-bold">{formatINR(item.currentMarketMedian)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-gray-900">Recent Crowd Submissions</h2>
            <div className="space-y-3">
              {data.recentSubmissions.map((sub: any) => (
                <div key={sub.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50">
                  <div>
                    <h3 className="text-sm font-semibold">{sub.itemName}</h3>
                    <p className="text-xs text-gray-500">{sub.userComment || "No comment"}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{formatINR(sub.reportedPrice)}</div>
                    <span className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${sub.popVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {sub.popVerified ? 'PoP Verified ✓' : 'Unverified'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className={`rounded-lg p-3 ${bg} ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
