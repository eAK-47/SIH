import { useAppStore } from './store/useAppStore';
import { Layout } from './components/Layout';
import { TouristApp } from './pages/TouristApp';
import { MerchantDashboard } from './pages/MerchantDashboard';

export default function App() {
  const activeTab = useAppStore((state: any) => state.activeTab);

  return (
    <Layout>
      {activeTab === 'tourist' ? <TouristApp /> : <MerchantDashboard />}
    </Layout>
  );
}
