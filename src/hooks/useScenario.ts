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
  lastRun?: string;
  steps: number;
}

export function useScenario(id: string) {
  const queryClient = useQueryClient();

  const { data: scenario, isLoading, error } = useQuery<Scenario>(
    ['scenario', id],
    async () => {
      const { data } = await apiClient.get(`/scenarios/${id}`);
      return data;
    }
  );

  const runScenario = useMutation(
    async () => {
      const { data } = await apiClient.post(`/scenarios/${id}/run`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['scenario', id]);
      },
    }
  );

  return {
    scenario,
    isLoading,
    error,
    runScenario,
  };
}