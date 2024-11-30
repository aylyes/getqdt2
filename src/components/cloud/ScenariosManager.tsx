import { useState } from 'react';
import { Plus, Play, Trash2, Edit2, GitBranch } from 'lucide-react';
import { ScenarioModal } from './ScenarioModal';
import { useScenarios } from '../../hooks/useScenarios';
import { useConnectors } from '../../hooks/useConnectors';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorAlert } from '../shared/ErrorAlert';
import { SuccessAlert } from '../shared/SuccessAlert';
import { useTranslation } from 'react-i18next';

export function ScenariosManager() {
  const { t } = useTranslation('cloud');
  const { scenarios, isLoading, error, createScenario, updateScenario, deleteScenario } = useScenarios();
  const { connectors, isLoading: isLoadingConnectors } = useConnectors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScenario, setEditingScenario] = useState<any | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddScenario = () => {
    setEditingScenario(null);
    setIsModalOpen(true);
  };

  const handleEditScenario = (scenario: any) => {
    setEditingScenario(scenario);
    setIsModalOpen(true);
  };

  const handleSaveScenario = async (scenarioData: any) => {
    try {
      if (editingScenario) {
        await updateScenario.mutateAsync({
          id: editingScenario.id,
          ...scenarioData,
          status: 'active',
          sourceConfig: JSON.stringify(scenarioData.sourceConfig),
          validationConfig: JSON.stringify(scenarioData.validationConfig)
        });
        setSuccessMessage(t('scenarios.messages.updated'));
      } else {
        await createScenario.mutateAsync({
          ...scenarioData,
          status: 'active',
          sourceConfig: JSON.stringify(scenarioData.sourceConfig),
          validationConfig: JSON.stringify(scenarioData.validationConfig)
        });
        setSuccessMessage(t('scenarios.messages.created'));
      }
      setIsModalOpen(false);
      setEditingScenario(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Failed to save scenario:', error);
    }
  };

  const handleDeleteScenario = async (id: string) => {
    try {
      await deleteScenario.mutateAsync(id);
      setSuccessMessage(t('scenarios.messages.deleted'));
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Failed to delete scenario:', error);
    }
  };

  if (isLoading || isLoadingConnectors) return <LoadingSpinner text={t('common.loading')} />;
  if (error) return <ErrorAlert message={t('errors.failedToLoadScenarios')} />;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{t('scenarios.title')}</h2>
          <button
            onClick={handleAddScenario}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            {t('scenarios.addScenario')}
          </button>
        </div>

        {successMessage && (
          <div className="mb-6">
            <SuccessAlert message={successMessage} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {scenarios?.map((scenario) => (
            <div key={scenario.id} className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <GitBranch className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{scenario.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{scenario.description}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          scenario.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {t(`scenarios.status.${scenario.status}`)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {t('scenarios.form.format')}: {scenario.format.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {t('common.lastRun')}: {scenario.lastRun ? new Date(scenario.lastRun).toLocaleString() : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <Play className="h-4 w-4 mr-2" />
                      {t('scenarios.actions.run')}
                    </button>
                    <button
                      onClick={() => handleEditScenario(scenario)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      {t('scenarios.actions.edit')}
                    </button>
                    <button
                      onClick={() => handleDeleteScenario(scenario.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t('scenarios.actions.delete')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ScenarioModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingScenario(null);
        }}
        onSave={handleSaveScenario}
        availableConnectors={connectors || []}
        editingScenario={editingScenario}
      />
    </div>
  );
}