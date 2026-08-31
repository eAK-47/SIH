import { useState } from 'react';
import { generateAdvisory } from '../lib/api';
import { riskColor } from '../lib/format';
import type { AdvisoryResponse } from '../types/api';
import { Loader2, RefreshCw } from 'lucide-react';

export function AdvisoryPanel({ placeId }: { placeId: string }) {
  const [advisory, setAdvisory] = useState<AdvisoryResponse['advisory'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load(forceRefresh = false) {
    setLoading(true);
    setError(null);
    try {
      const res = await generateAdvisory(placeId, forceRefresh);
      if (res.success && res.advisory) {
        setAdvisory(res.advisory);
      } else {
        setError(res.error || 'Advisory generation failed');
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }

  if (!advisory && !loading && !error) {
    return (
      <button onClick={() => load(false)} className="w-full rounded-lg border border-saffron/30 bg-saffron/10 px-4 py-3 text-sm font-medium text-saffron transition hover:bg-saffron/20">
        🤖 Generate AI Advisory
      </button>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" /> Generating advisory...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-3">
        <p className="text-sm text-red-700">{error}</p>
        <button onClick={() => load(false)} className="mt-2 text-xs text-red-600 underline">Retry</button>
      </div>
    );
  }

  if (!advisory) return null;

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-800">🤖 AI Advisory</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-bold text-white ${riskColor(advisory.riskLevel)}`}>
            {advisory.riskLevel}
          </span>
        </div>
        <button onClick={() => load(true)} className="text-gray-400 transition hover:text-gray-600" title="Refresh">
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="text-xs text-gray-500">Confidence: {(advisory.confidenceScore * 100).toFixed(0)}%</p>

      <div>
        <p className="mb-1 text-xs font-semibold text-green-700">✅ Positives</p>
        <ul className="space-y-1">
          {advisory.positiveHighlights.map((h, i) => (
            <li key={i} className="text-xs text-gray-600">• {h}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-1 text-xs font-semibold text-amber-700">⚠️ Things to Know</p>
        <ul className="space-y-1">
          {advisory.thingsToKnow.map((t, i) => (
            <li key={i} className="text-xs text-gray-600">• {t}</li>
          ))}
        </ul>
      </div>

      <p className="border-t border-gray-100 pt-2 text-[11px] italic text-gray-400">{advisory.reasoning}</p>
    </div>
  );
}
