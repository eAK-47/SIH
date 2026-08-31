import { useState } from 'react';
import { submitPrice } from '../lib/api';
import { useAppStore } from '../store/useAppStore';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export function PriceSubmitForm({ placeId }: { placeId: string }) {
  const { popToken } = useAppStore();
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('food');
  const [price, setPrice] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!popToken) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await submitPrice({
        placeId, itemName, category,
        reportedPrice: parseFloat(price),
        popToken: popToken as string, userComment: comment || undefined
      });
      if (res.success) {
        setSuccess(true);
        setItemName('');
        setPrice('');
        setComment('');
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(res.message);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-green-200 bg-green-50 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
        <Send className="h-4 w-4" /> Submit a Price
      </div>

      <input type="text" placeholder="Item name (e.g. Fish Thali)" value={itemName} onChange={e => setItemName(e.target.value)} required
        className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />

      <div className="flex gap-2">
        <select value={category} onChange={e => setCategory(e.target.value)}
          className="rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-green-500 focus:outline-none">
          <option value="food">Food</option>
          <option value="beverage">Beverage</option>
          <option value="accommodation">Accommodation</option>
          <option value="transport">Transport</option>
          <option value="service">Service</option>
        </select>
        <input type="number" placeholder="Price (₹)" value={price} onChange={e => setPrice(e.target.value)} required min="1"
          className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
      </div>

      <textarea placeholder="Comment (optional)" value={comment} onChange={e => setComment(e.target.value)} rows={2}
        className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />

      {success && (
        <div className="flex items-center gap-2 rounded bg-green-100 px-3 py-2 text-sm text-green-700">
          <CheckCircle className="h-4 w-4" /> Price submitted successfully!
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading || !itemName || !price}
        className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50">
        {loading ? <><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />Submitting...</> : '📤 Submit Price'}
      </button>
    </form>
  );
}
