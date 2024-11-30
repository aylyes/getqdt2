import { useParams } from 'react-router-dom';
import { Calendar, RefreshCw, GitBranch } from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useScenario } from '../../hooks/useScenario';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorAlert } from '../shared/ErrorAlert';

export function ScenarioDetails() {
  const { id } = useParams<{ id: string }>();
  const { scenario, isLoading, error, runScenario } = useScenario(id!);

  if (isLoading)
    return (
      <AdminLayout>
        <LoadingSpinner />
      </AdminLayout>
    );

  if (error)
    return (
      <AdminLayout>
        <ErrorAlert message="Failed to load scenario details" />
      </AdminLayout>
    );

  if (!scenario)
    return (
      <AdminLayout>
        <ErrorAlert message="Scenario not found" />
      </AdminLayout>
    );

  const handleRunScenario = async () => {
    try {
      await runScenario.mutateAsync();
    } catch (error) {
      console.error('Failed to run scenario:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <GitBranch className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {scenario.name}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {scenario.description}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  scenario.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : scenario.status === 'failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {scenario.status.charAt(0).toUpperCase() +
                  scenario.status.slice(1)}
              </span>
              <button
                onClick={handleRunScenario}
                disabled={runScenario.isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    runScenario.isLoading ? 'animate-spin' : ''
                  }`}
                />
                {runScenario.isLoading ? 'Running...' : 'Run Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Configuration Details */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Source Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Format
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {scenario.format.toUpperCase()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Source Config
                </label>
                <pre className="mt-1 p-4 bg-gray-50 rounded-lg overflow-auto text-sm text-gray-900">
                  {JSON.stringify(JSON.parse(scenario.sourceConfig), null, 2)}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Validation Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Validation Config
                </label>
                <pre className="mt-1 p-4 bg-gray-50 rounded-lg overflow-auto text-sm text-gray-900">
                  {JSON.stringify(
                    JSON.parse(scenario.validationConfig),
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Execution History */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              Execution History
            </div>
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
                    Records Processed
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Add execution history rows here */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {scenario.lastRun
                      ? new Date(scenario.lastRun).toLocaleString()
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        scenario.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {scenario.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    45s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    10,000
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
