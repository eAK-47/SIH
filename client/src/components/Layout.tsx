import { } from '../store/useAppStore';
import { TopNav } from './TopNav';
import { VoiceChatModal } from './VoiceChatModal';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col bg-slate-50 overflow-hidden">
      <TopNav />
      <main className="flex-1 overflow-hidden">{children}</main>
      <VoiceChatModal />
    </div>
  );
}
