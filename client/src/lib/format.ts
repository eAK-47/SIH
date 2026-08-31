export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m away`;
  return `${(meters / 1000).toFixed(1)}km away`;
}

export function safetyColor(level: 'SAFE' | 'MODERATE' | 'CAUTION'): string {
  switch (level) {
    case 'SAFE': return 'bg-brand-50 text-brand-700 border-brand-200';
    case 'MODERATE': return 'bg-amber-50 text-amber-900 border-amber-200';
    case 'CAUTION': return 'bg-rose-50 text-rose-700 border-rose-200';
  }
}

export function riskColor(level: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  switch (level) {
    case 'LOW': return 'bg-brand-600 text-white';
    case 'MEDIUM': return 'bg-amber-500 text-white';
    case 'HIGH': return 'bg-rose-600 text-white';
  }
}

export function verificationBadge(status: string): { label: string; color: string } {
  switch (status) {
    case 'TRUSTED': return { label: '⭐ Trusted', color: 'bg-amber-50 text-amber-900 border-amber-200' };
    case 'VERIFIED': return { label: '✓ Verified', color: 'bg-brand-50 text-brand-700 border-brand-200' };
    case 'FLAGGED': return { label: '🚩 Flagged', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    case 'UNVERIFIED': return { label: '❓ Unverified', color: 'bg-slate-100 text-slate-600 border-slate-300' };
    default: return { label: status, color: 'bg-slate-100 text-slate-600' };
  }
}
