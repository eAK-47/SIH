import { useState } from 'react';
import { Star } from 'lucide-react';
import clsx from 'clsx';

export function StarRating({ onChange, value = 0 }: { onChange?: (val: number) => void, value?: number }) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(value);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const active = (hover || rating) >= i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => { setRating(i); onChange?.(i); }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            className="rounded-md p-0.5 transition"
          >
            <Star 
              className={clsx('h-5 w-5 transition-colors', active ? 'fill-amber-400 text-amber-400' : 'text-slate-300')} 
            />
          </button>
        );
      })}
    </div>
  );
}
