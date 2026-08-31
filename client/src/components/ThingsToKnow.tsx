import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

export function ThingsToKnow({ messages }: { messages: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (!messages || messages.length === 0) return null;

  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-amber-200 bg-amber-50 transition-all">
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="flex w-full items-center justify-between px-3 py-2 text-amber-900 hover:bg-amber-100/50 transition"
      >
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
            ⚠️ Things to Know ({messages.length} Report{messages.length > 1 ? 's' : ''})
          </span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      {isOpen && (
        <div className="border-t border-amber-200/50 bg-white/50 px-3 py-2.5">
          <ul className="space-y-1.5">
            {messages.map((msg, i) => (
              <li key={i} className="text-xs font-medium text-amber-900 leading-snug">• {msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
