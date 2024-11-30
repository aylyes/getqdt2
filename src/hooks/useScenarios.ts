import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../api/client';

interface Scenario {
  id: string;
  name: string;
  description?: string;
  status: string;
  format: string;
  sourceConnectorId: string;
  sourceConfig: string;
  validationConfig: string;
  lastRun?: string | null;
  steps: number;
}

// Mock data for development
const mockScenarios: Scenario[] = [
  {
    id: '1',
    name: 'Daily Dashboard Quality Check',
    description: 'Verify data quality across all dashboards',
    status: 'active',
    format: 'csv',
    sourceConnectorId: '1',
    sourceConfig: JSON.stringify({
      fileName: 'dashboard_metrics.csv',
      directory: 'quality-checks'
    }),
    validationConfig: JSON.stringify({
      rules: ['completeness', 'accuracy', 'consistency'],
      thresholds: {
        completeness: 0.95,
        accuracy: 0.98,
        consistency: 0.90
      }
    }),
    lastRun: '2024-03-20T10:30:00Z',
    steps: 3
  },
  {
    id: '2',
    name: 'Hourly Performance Monitor',
    description: 'Monitor dashboard performance metrics',
    status: 'active',
    format: 'json',
    sourceConnectorId: '2',
    sourceConfig: JSON.stringify({
      endpoint: '/api/performance',
      interval: '1h'
    }),
    validationConfig: JSON.stringify({
      metrics: ['loadTime', 'errorRate', 'userCount'],
      alerts: {
        loadTime: 5000,
        errorRate: 0.01
      }
    }),
    lastRun: '2024-03-20T11:00:00Z',
    steps: 4
  }
];

export function useScenarios() {
  const queryClient = useQueryClient();

  const { data: scenarios, isLoading, error } = useQuery<Scenario[], Error>(
    'scenarios',
    async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          return mockScenarios;
        }
        const { data } = await apiClient.get('/scenarios');
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to fetch scenarios');
      }
    },
    {
      retry: 1,
      staleTime: 30000, // 30 seconds
    }
  );

  const createScenario = useMutation<Scenario, Error, Omit<Scenario, 'id'>>(
    async (newScenario) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          const scenario: Scenario = {
            id: (mockScenarios.length + 1).toString(),
            ...newScenario,
            status: 'active',
            lastRun: '',
            steps: 0
          };
          mockScenarios.push(scenario);
          return scenario;
        }
        const { data } = await apiClient.post('/scenarios', newScenario);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to create scenario');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('scenarios');
      }
    }
  );

  const updateScenario = useMutation<Scenario, Error, Scenario>(
    async (scenario) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          const index = mockScenarios.findIndex(s => s.id === scenario.id);
          if (index !== -1) {
            mockScenarios[index] = scenario;
          }
          return scenario;
        }
        const { data } = await apiClient.put(`/scenarios/${scenario.id}`, scenario);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to update scenario');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('scenarios');
      }
    }
  );

  const deleteScenario = useMutation<void, Error, string>(
    async (id) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          const index = mockScenarios.findIndex(s => s.id === id);
          if (index !== -1) {
            mockScenarios.splice(index, 1);
          }
          return;
        }
        await apiClient.delete(`/scenarios/${id}`);
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to delete scenario');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('scenarios');
      }
    }
  );

  return {
    scenarios,
    isLoading,
    error,
    createScenario,
    updateScenario,
    deleteScenario,
  };
}