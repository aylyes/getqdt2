import { useParams } from 'react-router-dom';
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  PieChart,
  Activity,
  Calendar,
  RefreshCw,
} from 'lucide-react';
import { AdminLayout } from './AdminLayout';
import { useJob } from '../../hooks/useJob';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorAlert } from '../shared/ErrorAlert';
import { useTranslation } from 'react-i18next';
import { ExecutionTimeChart } from '../charts/ExecutionTimeChart';
import { QualityDistributionChart } from '../charts/QualityDistributionChart';

export function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const { job, isLoading, error, runJob } = useJob(id!);
  const { t } = useTranslation('cloud');

  // Mock data for charts
  const executionTimeData = [
    { timestamp: '2024-03-14', duration: 42 },
    { timestamp: '2024-03-15', duration: 38 },
    { timestamp: '2024-03-16', duration: 45 },
    { timestamp: '2024-03-17', duration: 40 },
    { timestamp: '2024-03-18', duration: 43 },
    { timestamp: '2024-03-19', duration: 41 },
    { timestamp: '2024-03-20', duration: 45 },
  ];

  const qualityDistributionData = [
    { name: t('jobs.metrics.valid'), value: 85, color: '#22C55E' },
    { name: t('jobs.metrics.warning'), value: 10, color: '#F59E0B' },
    { name: t('jobs.metrics.error'), value: 5, color: '#EF4444' },
  ];

  if (isLoading)
    return (
      <AdminLayout>
        <LoadingSpinner text={t('common.loading')} />
      </AdminLayout>
    );

  if (error)
    return (
      <AdminLayout>
        <ErrorAlert
          message={t('errors.failedToLoadJobDetails')}
          showContactSupport
        />
      </AdminLayout>
    );

  if (!job)
    return (
      <AdminLayout>
        <ErrorAlert message={t('errors.jobNotFound')} />
      </AdminLayout>
    );

  const handleRunJob = async () => {
    try {
      await runJob.mutateAsync();
    } catch (error) {
      console.error('Failed to run job:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.name}</h1>
              <p className="mt-1 text-sm text-gray-500">{job.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  job.status === 'success'
                    ? 'bg-green-100 text-green-800'
                    : job.status === 'failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {t(`jobs.status.${job.status}`)}
              </span>
              <button
                onClick={handleRunJob}
                disabled={runJob.isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${
                    runJob.isLoading ? 'animate-spin' : ''
                  }`}
                />
                {runJob.isLoading
                  ? t('jobs.actions.running')
                  : t('jobs.actions.runNow')}
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {t('jobs.metrics.executionTime')}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        45s
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {t('jobs.metrics.successRate')}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        98.5%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {t('jobs.metrics.dataQualityScore')}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        95%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {t('jobs.metrics.totalRecords')}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        10,000
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
          {/* Execution Time Trend */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
                {t('jobs.charts.executionTimeTrend')}
              </div>
            </h3>
            <ExecutionTimeChart data={executionTimeData} />
          </div>

          {/* Data Quality Distribution */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              <div className="flex items-center">
                <PieChart className="h-5 w-5 text-gray-400 mr-2" />
                {t('jobs.charts.qualityDistribution')}
              </div>
            </h3>
            <QualityDistributionChart data={qualityDistributionData} />
          </div>
        </div>

        {/* Execution History */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              {t('jobs.executionHistory.title')}
            </div>
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('jobs.executionHistory.columns.timestamp')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('jobs.executionHistory.columns.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('jobs.executionHistory.columns.duration')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('jobs.executionHistory.columns.records')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.lastRun ? new Date(job.lastRun).toLocaleString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {t(`jobs.status.${job.status}`)}
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
