import { useState } from 'react';
import 'clsx';
import { useTranslation } from 'react-i18next';
import { submitPrice, verifyPop } from '../lib/api';
import { useAppStore } from '../store/useAppStore';
import { StarRating } from './StarRating';
import { Loader2, X, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

export function SubmitBillModal({ placeId, placeName, onClose }: { placeId: string, placeName: string, onClose: () => void }) {
  const { t } = useTranslation();
  const { userLat, userLng, popToken, setPopToken } = useAppStore();
  
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('food');
  const [price, setPrice] = useState('');
  const [comment, setComment] = useState('');
  
  // PoP state
  const [popLoading, setPopLoading] = useState(false);
  const [popStatus, setPopStatus] = useState<'pending' | 'success' | 'warn' | 'error'>(popToken ? 'success' : 'pending');
  const [popMsg, setPopMsg] = useState('');

  // Submit state
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function handleStampGps() {
    setPopLoading(true);
    setPopStatus('pending');
    try {
      const res = await verifyPop(userLat, userLng, placeId);
      if (res.verificationToken) {
        setPopToken(res.verificationToken);
      }
      if (res.isVerified) {
        setPopStatus('success');
        setPopMsg('Within 150m (Verified PoP)');
      } else {
        setPopStatus('warn');
        setPopMsg(`Remote submission (>${res.distanceMeters}m) — will be logged as unverified.`);
      }
    } catch (err: any) {
      setPopStatus('error');
      setPopMsg(err.message || 'Verification failed');
    } finally {
      setPopLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!popToken) {
      alert('Please Stamp GPS Location first (even if remote, we log the attempt).'); 
      return;
    }
    setSubmitLoading(true);
    try {
      const res = await submitPrice({
        placeId, itemName, category, reportedPrice: parseFloat(price),
        popToken, userComment: comment
      });
      if (res.success) {
        setSubmitSuccess(true);
        setTimeout(onClose, 2000);
      } else {
        alert(res.message);
      }
    } catch (e: any) {
      alert(e.message || 'Network error');
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        
        <h2 className="text-xl font-bold text-slate-900">Submit Bill or Price Quote</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">for {placeName}</p>

        {submitSuccess ? (
          <div className="mt-8 flex flex-col items-center justify-center py-6 text-center">
            <div className="rounded-full bg-brand-100 p-3"><CheckCircle className="h-8 w-8 text-brand-600" /></div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Submission Received</h3>
            <p className="mt-1 text-sm text-slate-500">Recalculating Fair Price Band...</p>
          </div>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {/* GPS Stamp */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handleStampGps} disabled={popLoading || popStatus === 'success'} className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50">
                    {popLoading ? <Loader2 className="h-3 w-3 animate-spin"/> : <MapPin className="h-3 w-3"/>}
                    {t('buttons.stampGps')}
                  </button>
                </div>
                {popStatus === 'success' && <div className="flex items-center gap-1 text-[11px] font-bold text-brand-600"><CheckCircle className="h-3.5 w-3.5"/> Verified (&lt;150m)</div>}
                {popStatus === 'warn' && <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600"><AlertTriangle className="h-3.5 w-3.5"/> Remote submission (unverified)</div>}
                {popStatus === 'error' && <div className="text-[11px] font-bold text-rose-600">{popMsg}</div>}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Service / Item Name</label>
                <div className="flex gap-2">
                  <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500">
                    <option value="transport">Transport</option>
                    <option value="food">Meals</option>
                    <option value="service">Service</option>
                  </select>
                  <input type="text" value={itemName} onChange={e=>setItemName(e.target.value)} required placeholder="e.g. Drop to Karunagappally" className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Total Paid / Quoted (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">₹</span>
                  <input type="number" min="1" value={price} onChange={e=>setPrice(e.target.value)} required placeholder="1200" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xl font-bold font-numeric text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">Submitting an inflated price (e.g. ₹1200) tests the MAD anomaly filter. Remote submissions are logged as unverified.</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Quick Rating</label>
                <StarRating />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">Short Review (Optional)</label>
                <textarea rows={2} value={comment} onChange={e=>setComment(e.target.value)} placeholder="Any extra details about the experience?" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" onClick={onClose} className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={submitLoading || !itemName || !price || !popToken} className="flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700 disabled:opacity-50">
                {submitLoading && <Loader2 className="h-4 w-4 animate-spin"/>}
                Submit & Recalculate Band
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
