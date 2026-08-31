import clsx from 'clsx';
import { MapPin, Store } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { LocationButton } from './LocationButton';

export function Layout({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇮🇳</span>
          <h1 className="text-base font-bold text-navy">Tourism Intelligence</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
            {([
              { key: 'tourist' as const, label: 'Tourist', icon: MapPin },
              { key: 'merchant' as const, label: 'Merchant', icon: Store },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={clsx(
                  'flex items-center gap-1 rounded-md px-3 py-1 text-xs font-medium transition',
                  activeTab === tab.key
                    ? 'bg-white text-navy shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                )}>
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
          <LocationButton />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
