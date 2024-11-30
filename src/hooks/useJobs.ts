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
  lastRun?: string | null;
  nextRun?: string | null;
}

// Mock data for development
const mockJobs: Job[] = [
  {
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
  {
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
];

export function useJobs() {
  const queryClient = useQueryClient();

  const { data: jobs, isLoading, error } = useQuery<Job[], Error>(
    'jobs',
    async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          return mockJobs;
        }
        const { data } = await apiClient.get('/jobs');
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to fetch jobs');
      }
    },
    {
      retry: 1,
      staleTime: 30000, // 30 seconds
    }
  );

  const createJob = useMutation<Job, Error, Omit<Job, 'id'>>(
    async (newJob) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          const job: Job = {
            id: (mockJobs.length + 1).toString(),
            ...newJob,
            status: 'active',
            lastRun: '',
            nextRun: ''
          };
          mockJobs.push(job);
          return job;
        }
        const { data } = await apiClient.post('/jobs', newJob);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to create job');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobs');
      }
    }
  );

  const updateJob = useMutation<Job, Error, Job>(
    async (job) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          const index = mockJobs.findIndex(j => j.id === job.id);
          if (index !== -1) {
            mockJobs[index] = job;
          }
          return job;
        }
        const { data } = await apiClient.put(`/jobs/${job.id}`, job);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to update job');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobs');
      }
    }
  );

  const deleteJob = useMutation<void, Error, string>(
    async (id) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          const index = mockJobs.findIndex(j => j.id === id);
          if (index !== -1) {
            mockJobs.splice(index, 1);
          }
          return;
        }
        await apiClient.delete(`/jobs/${id}`);
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to delete job');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobs');
      }
    }
  );

  return {
    jobs,
    isLoading,
    error,
    createJob,
    updateJob,
    deleteJob,
  };
}