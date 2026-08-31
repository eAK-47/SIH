import { useState } from 'react';
import { verifyPop } from '../lib/api';
import { useAppStore } from '../store/useAppStore';
import { Loader2, X, CheckCircle, XCircle } from 'lucide-react';

export function VerifyPoPModal({ placeId, onClose }: { placeId: string; onClose: () => void }) {
  const { userLat, userLng, setPopToken } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; token?: string } | null>(null);

  async function handleVerify() {
    setLoading(true);
    try {
      const res = await verifyPop(userLat, userLng, placeId);
      setResult({
        success: res.isVerified,
        message: res.message,
        token: res.verificationToken
      });
      if (res.isVerified && res.verificationToken) {
        setPopToken(res.verificationToken);
      }
    } catch (e: unknown) {
      setResult({ success: false, message: e instanceof Error ? e.message : 'Network error' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">📍 Verify Location</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>

        {!result ? (
          <>
            <p className="mb-4 text-sm text-gray-600">
              We need to confirm you are physically at this location before you can submit a price.
            </p>
            <p className="mb-4 text-xs text-gray-400">
              Your coordinates: {userLat.toFixed(4)}, {userLng.toFixed(4)}
            </p>
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? <><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />Verifying...</> : '🔒 Verify My Presence'}
            </button>
          </>
        ) : (
          <div className="text-center">
            {result.success ? (
              <>
                <CheckCircle className="mx-auto mb-3 h-12 w-12 text-green-500" />
                <p className="mb-1 font-semibold text-green-700">Verified!</p>
              </>
            ) : (
              <>
                <XCircle className="mx-auto mb-3 h-12 w-12 text-red-500" />
                <p className="mb-1 font-semibold text-red-700">Not Verified</p>
              </>
            )}
            <p className="mb-4 text-sm text-gray-600">{result.message}</p>
            <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              {result.success ? 'Done' : 'Close'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
