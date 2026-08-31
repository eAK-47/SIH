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
    case 'SAFE': return 'bg-green-100 text-green-800 border-green-300';
    case 'MODERATE': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'CAUTION': return 'bg-red-100 text-red-800 border-red-300';
  }
}

export function riskColor(level: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  switch (level) {
    case 'LOW': return 'bg-green-500';
    case 'MEDIUM': return 'bg-yellow-500';
    case 'HIGH': return 'bg-red-500';
  }
}

export function entityTypeIcon(type: string): string {
  switch (type) {
    case 'RESTAURANT': return '🍽️';
    case 'HOTEL': return '🏨';
    case 'GUIDE': return '🧭';
    case 'TRANSPORT': return '🚗';
    default: return '📍';
  }
}

export function verificationBadge(status: string): { label: string; color: string } {
  switch (status) {
    case 'TRUSTED': return { label: '⭐ Trusted', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    case 'VERIFIED': return { label: '✅ Verified', color: 'bg-green-100 text-green-800 border-green-300' };
    case 'FLAGGED': return { label: '🚩 Flagged', color: 'bg-red-100 text-red-800 border-red-300' };
    case 'UNVERIFIED': return { label: '❓ Unverified', color: 'bg-gray-100 text-gray-600 border-gray-300' };
    default: return { label: status, color: 'bg-gray-100 text-gray-600' };
  }
}
