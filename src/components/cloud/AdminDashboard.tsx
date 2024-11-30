import { useState, useEffect } from 'react';
import { JobsManager } from './JobsManager';
import { ConnectorsManager } from './ConnectorsManager';
import { ScenariosManager } from './ScenariosManager';
import { AdminLayout } from './AdminLayout';
import { useLocation } from 'react-router-dom';

type Tab = 'jobs' | 'connectors' | 'scenarios';

export function AdminDashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>('jobs');

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab as Tab);
    }
  }, [location.state]);

  return (
    <AdminLayout>
      <div className="py-6">
        {activeTab === 'jobs' && <JobsManager />}
        {activeTab === 'connectors' && <ConnectorsManager />}
        {activeTab === 'scenarios' && <ScenariosManager />}
      </div>
    </AdminLayout>
  );
}
