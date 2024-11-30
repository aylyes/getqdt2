import { ReactNode } from 'react';
import { Briefcase, Plug, GitBranch } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('cloud');

  const tabs = [
    { id: 'jobs', name: t('jobs.tab'), icon: Briefcase, path: '/cloud' },
    { id: 'connectors', name: t('connectors.tab'), icon: Plug, path: '/cloud' },
    {
      id: 'scenarios',
      name: t('scenarios.tab'),
      icon: GitBranch,
      path: '/cloud',
    },
  ];

  const handleTabClick = (tabId: string) => {
    navigate('/cloud', { state: { activeTab: tabId } });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`${
                    location.pathname === '/cloud' &&
                    location.state?.activeTab === tab.id
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
