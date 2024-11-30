import { useState } from 'react';
import { Plus, Trash2, Settings, Database } from 'lucide-react';
import { ConnectorModal } from './ConnectorModal';
import { useConnectors } from '../../hooks/useConnectors';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorAlert } from '../shared/ErrorAlert';
import { SuccessAlert } from '../shared/SuccessAlert';
import { useTranslation } from 'react-i18next';

export function ConnectorsManager() {
  const { t } = useTranslation('cloud');
  const { connectors, isLoading, error, createConnector, updateConnector, deleteConnector } = useConnectors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConnector, setEditingConnector] = useState<any | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddConnector = () => {
    setEditingConnector(null);
    setIsModalOpen(true);
  };

  const handleEditConnector = (connector: any) => {
    setEditingConnector(connector);
    setIsModalOpen(true);
  };

  const handleSaveConnector = async (connectorData: any) => {
    try {
      if (editingConnector) {
        await updateConnector.mutateAsync({
          id: editingConnector.id,
          ...connectorData,
          status: 'connected',
          config: JSON.stringify(connectorData.config)
        });
        setSuccessMessage(t('connectors.messages.configUpdated'));
      } else {
        await createConnector.mutateAsync({
          ...connectorData,
          status: 'connected',
          config: JSON.stringify(connectorData.config)
        });
        setSuccessMessage(t('connectors.messages.created'));
      }
      setIsModalOpen(false);
      setEditingConnector(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Failed to save connector:', error);
    }
  };

  const handleDeleteConnector = async (id: string) => {
    try {
      await deleteConnector.mutateAsync(id);
      setSuccessMessage(t('connectors.messages.deleted'));
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Failed to delete connector:', error);
    }
  };

  if (isLoading) return <LoadingSpinner text={t('common.loading')} />;
  if (error) return <ErrorAlert message={t('errors.failedToLoadConnectors')} />;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t('connectors.title')}</h2>
          <button
            onClick={handleAddConnector}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('connectors.addConnector')}
          </button>
        </div>

        {successMessage && (
          <div className="mb-6">
            <SuccessAlert message={successMessage} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {connectors?.map((connector) => (
            <div key={connector.id} className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Database className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{connector.name}</dt>
                      <dd className="flex items-center text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          connector.status === 'connected' ? 'bg-green-100 text-green-800' :
                          connector.status === 'disconnected' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {t(`connectors.status.${connector.status}`)}
                        </span>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-5">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500">{t('connectors.form.type')}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{connector.type}</dd>
                  </dl>
                  <dl className="mt-2">
                    <dt className="text-sm font-medium text-gray-500">{t('common.lastRun')}</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {connector.lastSync ? new Date(connector.lastSync).toLocaleString() : '-'}
                    </dd>
                  </dl>
                </div>
                <div className="mt-5 flex justify-end space-x-3">
                  <button
                    onClick={() => handleEditConnector(connector)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {t('connectors.actions.configure')}
                  </button>
                  <button
                    onClick={() => handleDeleteConnector(connector.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('connectors.actions.remove')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConnectorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingConnector(null);
        }}
        onSave={handleSaveConnector}
        editingConnector={editingConnector}
      />
    </div>
  );
}