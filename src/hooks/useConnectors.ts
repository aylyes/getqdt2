import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../api/client';

interface Connector {
  id: string;
  name: string;
  type: string;
  status: string;
  config: string;
  lastSync?: string | null;
}

// Mock data for development
const mockConnectors: Connector[] = [
  {
    id: '1',
    name: 'Tableau Server',
    type: 'tableau',
    status: 'connected',
    config: JSON.stringify({
      url: 'https://tableau.company.com',
      site: 'default',
      username: 'admin'
    }),
    lastSync: '2024-03-20T10:30:00Z'
  },
  {
    id: '2',
    name: 'Looker Instance',
    type: 'looker',
    status: 'connected',
    config: JSON.stringify({
      url: 'https://looker.company.com',
      client_id: 'client123',
      project: 'main'
    }),
    lastSync: '2024-03-20T09:45:00Z'
  }
];

export function useConnectors() {
  const queryClient = useQueryClient();

  const { data: connectors, isLoading, error } = useQuery<Connector[], Error>(
    'connectors',
    async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          return mockConnectors;
        }
        const { data } = await apiClient.get('/connectors');
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to fetch connectors');
      }
    },
    {
      retry: 1,
      staleTime: 30000, // 30 seconds
    }
  );

  const createConnector = useMutation<Connector, Error, Omit<Connector, 'id'>>(
    async (newConnector) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          const connector: Connector = {
            id: (mockConnectors.length + 1).toString(),
            ...newConnector,
            status: 'connected',
            lastSync: ''
          };
          mockConnectors.push(connector);
          return connector;
        }
        const { data } = await apiClient.post('/connectors', newConnector);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to create connector');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('connectors');
      }
    }
  );

  const updateConnector = useMutation<Connector, Error, Connector>(
    async (connector) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          const index = mockConnectors.findIndex(c => c.id === connector.id);
          if (index !== -1) {
            mockConnectors[index] = connector;
          }
          return connector;
        }
        const { data } = await apiClient.put(`/connectors/${connector.id}`, connector);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to update connector');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('connectors');
      }
    }
  );

  const deleteConnector = useMutation<void, Error, string>(
    async (id) => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          const index = mockConnectors.findIndex(c => c.id === id);
          if (index !== -1) {
            mockConnectors.splice(index, 1);
          }
          return;
        }
        await apiClient.delete(`/connectors/${id}`);
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('Failed to delete connector');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('connectors');
      }
    }
  );

  return {
    connectors,
    isLoading,
    error,
    createConnector,
    updateConnector,
    deleteConnector,
  };
}