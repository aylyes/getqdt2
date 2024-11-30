import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../api/client';

interface Job {
  id: string;
  name: string;
  type: string;
  status: string;
  description?: string;
  schedule?: string;
  timeout?: number;
  retries?: number;
  lastRun?: string;
  nextRun?: string;
}

// Mock data for development
const mockJobs: Record<string, Job> = {
  '1': {
    id: '1',
    name: 'Dashboard Quality Check',
    type: 'Quality Analysis',
    status: 'running',
    description: 'Daily quality check for all dashboards',
    schedule: 'daily',
    timeout: 30,
    retries: 3,
    lastRun: '2024-03-20T10:30:00Z',
    nextRun: '2024-03-21T10:30:00Z'
  },
  '2': {
    id: '2',
    name: 'Data Sync',
    type: 'Sync',
    status: 'completed',
    description: 'Synchronize data across platforms',
    schedule: 'hourly',
    timeout: 15,
    retries: 2,
    lastRun: '2024-03-20T10:00:00Z',
    nextRun: '2024-03-20T11:00:00Z'
  }
};

export function useJob(id: string) {
  const queryClient = useQueryClient();

  const { data: job, isLoading, error } = useQuery<Job, Error>(
    ['job', id],
    async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          const job = mockJobs[id];
          if (!job) {
            throw new Error('Job not found');
          }
          return job;
        }
        const { data } = await apiClient.get(`/jobs/${id}`);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to fetch job details');
      }
    },
    {
      retry: 1,
      staleTime: 30000, // 30 seconds
    }
  );

  const runJob = useMutation<Job, Error>(
    async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const job = mockJobs[id];
          if (!job) {
            throw new Error('Job not found');
          }
          // Update mock job status
          mockJobs[id] = {
            ...job,
            status: 'running',
            lastRun: new Date().toISOString(),
            nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Next run in 24 hours
          };
          return mockJobs[id];
        }
        const { data } = await apiClient.post(`/jobs/${id}/run`);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to run job');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['job', id]);
      }
    }
  );

  return {
    job,
    isLoading,
    error,
    runJob,
  };
}