import { useParams } from 'react-router-dom';
import {
  Database,
  RefreshCw,
  CheckCircle2,
  Settings,
  Activity,
  Calendar,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useConnector } from '../../hooks/useConnector';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorAlert } from '../shared/ErrorAlert';
import { SuccessAlert } from '../shared/SuccessAlert';
import { useState } from 'react';

export function ConnectorDetails() {
  const { id } = useParams<{ id: string }>();
  const { connector, isLoading, error, testConnection, syncConnector } =
    useConnector(id!);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (isLoading)
    return (
      <AdminLayout>
        <LoadingSpinner />
      </AdminLayout>
    );

  if (error)
    return (
      <AdminLayout>
        <ErrorAlert message="Failed to load connector details" />
      </AdminLayout>
    );

  if (!connector)
    return (
      <AdminLayout>
        <ErrorAlert message="Connector not found" />
      </AdminLayout>
    );

  const handleTestConnection = async () => {
    try {
      await testConnection.mutateAsync();
      setSuccessMessage('Connection test successful');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Failed to test connection:', error);
    }
  };

  const handleSync = async () => {
    try {
      await syncConnector.mutateAsync();
      setSuccessMessage('Sync started successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Failed to start sync:', error);
    }
  };

  const config = JSON.parse(connector.config);

  return (
    <AdminLayout>
      <div className="py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Database className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {connector.name}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Type: {connector.type}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  connector.status === 'connected'
                    ? 'bg-green-100 text-green-800'
                    : connector.status === 'error'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {connector.status.charAt(0).toUpperCase() +
                  connector.status.slice(1)}
              </span>
              <button
                onClick={handleTestConnection}
                disabled={testConnection.isLoading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <CheckCircle2
                  className={`h-4 w-4 mr-2 ${
                    testConnection.isLoading ? 'animate-spin' : ''
                  }`}
                />
                Test Connection
              </button>
              <button
                onClick={handleSync}
                disabled={syncConnector.isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    syncConnector.isLoading ? 'animate-spin' : ''
                  }`}
                />
                {syncConnector.isLoading ? 'Syncing...' : 'Sync Now'}
              </button>
            </div>
          </div>

          {successMessage && (
            <div className="mt-4">
              <SuccessAlert message={successMessage} />
            </div>
          )}
        </div>

        {/* Configuration Details */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Settings className="h-5 w-5 text-gray-400 mr-2" />
              Configuration
            </h3>
            <div className="space-y-4">
              <pre className="bg-gray-50 rounded-lg p-4 overflow-auto text-sm text-gray-900">
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 text-gray-400 mr-2" />
              Status & Metrics
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Last Sync
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {connector.lastSync
                      ? new Date(connector.lastSync).toLocaleString()
                      : 'Never'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {connector.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sync History */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            Sync History
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Records Synced
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {connector.lastSync
                      ? new Date(connector.lastSync).toLocaleString()
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        connector.status === 'connected'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {connector.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    30s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
