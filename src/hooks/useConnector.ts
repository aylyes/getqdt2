import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../api/client';

interface Connector {
  id: string;
  name: string;
  type: string;
  status: string;
  config: string;
  lastSync?: string;
}

export function useConnector(id: string) {
  const queryClient = useQueryClient();

  const { data: connector, isLoading, error } = useQuery<Connector>(
    ['connector', id],
    async () => {
      const { data } = await apiClient.get(`/connectors/${id}`);
      return data;
    }
  );

  const testConnection = useMutation(
    async () => {
      const { data } = await apiClient.post(`/connectors/${id}/test`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['connector', id]);
      },
    }
  );

  const syncConnector = useMutation(
    async () => {
      const { data } = await apiClient.post(`/connectors/${id}/sync`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['connector', id]);
      },
    }
  );

  return {
    connector,
    isLoading,
    error,
    testConnection,
    syncConnector,
  };
}