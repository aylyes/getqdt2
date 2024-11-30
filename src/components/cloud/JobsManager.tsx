import { useState } from 'react';
import { Plus, Play, Pause, Trash2, Info } from 'lucide-react';
import JobModal from './JobModal';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorAlert } from '../shared/ErrorAlert';
import { useTranslation } from 'react-i18next';

export function JobsManager() {
  const navigate = useNavigate();
  const { jobs, isLoading, error, createJob, updateJob, deleteJob } = useJobs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation('cloud');

  const handleAddJob = () => {
    setIsModalOpen(true);
  };

  const handleSaveJob = async (jobData: any) => {
    try {
      await createJob.mutateAsync({
        name: jobData.name,
        type: jobData.type,
        status: 'active',
        description: jobData.description,
        schedule:
          jobData.schedule === 'custom' ? jobData.customCron : jobData.schedule,
        timeout: parseInt(jobData.timeout),
        retries: parseInt(jobData.retries),
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJob.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleToggleStatus = async (job: any) => {
    try {
      await updateJob.mutateAsync({
        ...job,
        status: job.status === 'running' ? 'paused' : 'running',
      });
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  const handleViewDetails = (job: any) => {
    navigate(`/cloud/jobs/${job.id}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={t('errors.failedToLoadJobs')} />;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('jobs.title')}
          </h2>
          <button
            onClick={handleAddJob}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('jobs.addJob')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('jobs.form.name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('jobs.form.type')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('jobs.form.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('jobs.form.lastRun')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('jobs.form.nextRun')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('jobs.form.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs?.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {job.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'running'
                          ? 'bg-green-100 text-green-800'
                          : job.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {t(`jobs.status.${job.status}`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.lastRun || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.nextRun || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(job)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      title={t('jobs.actions.viewDetails')}
                    >
                      <Info className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(job)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      title={
                        job.status === 'running'
                          ? t('jobs.actions.pause')
                          : t('jobs.actions.resume')
                      }
                    >
                      {job.status === 'running' ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-red-600 hover:text-red-900"
                      title={t('jobs.actions.delete')}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveJob}
      />
    </div>
  );
}