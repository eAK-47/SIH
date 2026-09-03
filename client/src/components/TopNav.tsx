import { Search, Compass, Store, ArrowLeft, Languages, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { GpsStatusPill } from './GpsStatusPill';
import i18n, { SUPPORTED_LANGS } from '../lib/i18n';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LANG_NAMES: Record<string, string> = { en: 'EN', ml: 'മലയാളം', hi: 'हिन्दी' };

export function TopNav() {
  const { activeTab, setActiveTab, searchQuery, setSearchQuery } = useAppStore();
  const { t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
    document.documentElement.lang = code;
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Compass className="h-5 w-5" />
          </div>
          <h1 className="text-[17px] font-bold tracking-tight text-slate-900 hidden md:block">{t('app.title')}</h1>
        </div>
        <div className="hidden items-center md:flex">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            📍 Vallikavu Hub, Kollam
          </span>
        </div>
      </div>

      <div className="flex-1 px-4 md:max-w-md md:px-8">
        <div className="relative flex w-full items-center">
          <Search className="absolute left-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={activeTab === 'merchant'}
            placeholder={activeTab === 'merchant' ? "Search disabled in merchant view..." : "Search biriyani, sadya, porotta, auto drop, activa, kayak, ayurveda, op ticket..."}
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-9 pr-9 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50"
          />
          {searchQuery && activeTab === 'tourist' && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-300 text-[10px] font-bold text-white transition hover:bg-slate-400"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <GpsStatusPill />

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(o => !o)}
            aria-label={t('chat.chooseLang')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Languages className="h-4 w-4 text-slate-500" />
            {LANG_NAMES[i18n.language] || 'EN'}
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full z-[70] mt-1.5 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              {SUPPORTED_LANGS.map(code => (
                <button
                  key={code}
                  onClick={() => changeLang(code)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <span className="flex-1">{LANG_NAMES[code]}</span>
                  {i18n.language === code && <Check className="h-4 w-4 text-brand-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {activeTab === 'tourist' ? (
          <button
            onClick={() => setActiveTab('merchant')}
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Store className="h-4 w-4" /> Merchant Portal
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('tourist')}
            className="hidden md:flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-100"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Map
          </button>
        )}
      </div>
    </header>
  );
}
