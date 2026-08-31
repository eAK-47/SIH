import clsx from 'clsx';
import { safetyColor } from '../lib/format';
import type { SafetyTag } from '../types/api';

export function SafetyBadge({ tag }: { tag: SafetyTag }) {
  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium', safetyColor(tag.level))}>
      {tag.level === 'SAFE' && '✓'} {tag.level === 'MODERATE' && '⚠'} {tag.level === 'CAUTION' && '⚠'}
      {tag.label}
    </span>
  );
}
