import { useState, useEffect } from 'react';
import {
  X,
  Database,
  FileText,
  CheckCircle2,
  Code,
  FileJson,
  FileSpreadsheet,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (scenarioData: any) => void;
  availableConnectors: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  editingScenario?: {
    id: string;
    name: string;
    format: Format;
    sourceConnectorId: string;
    sourceConfig: string;
    validationConfig: string;
  } | null;
}

type Format = 'sql' | 'csv' | 'yaml' | 'json';

const formatDetails = {
  sql: {
    icon: Code,
    description: 'Use SQL queries for data validation',
    color: 'bg-purple-500',
  },
  csv: {
    icon: FileSpreadsheet,
    description: 'Compare CSV files and spreadsheets',
    color: 'bg-green-500',
  },
  yaml: {
    icon: FileText,
    description: 'Configure using YAML format',
    color: 'bg-blue-500',
  },
  json: {
    icon: FileJson,
    description: 'Use JSON for structured data',
    color: 'bg-orange-500',
  },
};

export function ScenarioModal({
  isOpen,
  onClose,
  onSave,
  availableConnectors,
  editingScenario,
}: ScenarioModalProps) {
  const { t } = useTranslation('cloud');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    format: 'json' as Format,
    sourceConnector: '',
    sourceConfig: {
      query: '',
      table: '',
      path: '',
      bucket: '',
      dataset: '',
    },
    validationRules: [] as string[],
    thresholds: {
      accuracy: 95,
      completeness: 98,
      timeliness: 85,
    },
    notifications: true,
    tags: [] as string[],
  });

  useEffect(() => {
    if (editingScenario) {
      setFormData({
        ...formData,
        name: editingScenario.name,
        format: editingScenario.format,
        sourceConnector: editingScenario.sourceConnectorId,
        sourceConfig: JSON.parse(editingScenario.sourceConfig),
        validationRules:
          JSON.parse(editingScenario.validationConfig).rules || [],
      });
    }
  }, [editingScenario]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setCurrentStep(1);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="text-white">
            <h2 className="text-2xl font-bold">
              {editingScenario
                ? t('scenarios.editTitle')
                : t('scenarios.addTitle')}
            </h2>
            <p className="text-indigo-100 mt-1">
              {t('scenarios.stepProgress', { current: currentStep, total: 3 })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-indigo-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-8 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            {[
              t('scenarios.steps.basics'),
              t('scenarios.steps.source'),
              t('scenarios.steps.validation'),
            ].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep > index + 1
                      ? 'bg-green-500'
                      : currentStep === index + 1
                      ? 'bg-indigo-600'
                      : 'bg-gray-300'
                  } text-white font-semibold`}
                >
                  {currentStep > index + 1 ? '✓' : index + 1}
                </div>
                <span
                  className={`ml-2 ${
                    currentStep === index + 1
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-500'
                  }`}
                >
                  {step}
                </span>
                {index < 2 && (
                  <div
                    className={`w-24 h-1 mx-4 ${
                      currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-8 py-6 overflow-y-auto max-h-[calc(100vh-20rem)]"
        >
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('scenarios.form.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder={t('scenarios.form.namePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  {t('scenarios.form.format')}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(formatDetails).map(([format, details]) => {
                    const Icon = details.icon;
                    return (
                      <button
                        key={format}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            format: format as Format,
                          }))
                        }
                        className={`relative p-6 rounded-xl border-2 transition-all ${
                          formData.format === format
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className={`${details.color} p-3 rounded-lg text-white`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-gray-900">
                              {format.toUpperCase()}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {details.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('scenarios.form.description')}
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder={t('scenarios.form.descriptionPlaceholder')}
                />
              </div>
            </div>
          )}

          {/* Step 2: Source Configuration */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('scenarios.form.sourceConfig')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('scenarios.form.sourceConfigDescription')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('scenarios.form.connector')}
                    </label>
                    <select
                      name="sourceConnector"
                      value={formData.sourceConnector}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="">
                        {t('scenarios.form.selectConnector')}
                      </option>
                      {availableConnectors.map((connector) => (
                        <option key={connector.id} value={connector.id}>
                          {connector.name} ({connector.type})
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.sourceConnector && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      {formData.format === 'sql' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('scenarios.form.query')}
                          </label>
                          <textarea
                            name="sourceConfig.query"
                            value={formData.sourceConfig.query}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono"
                            placeholder="SELECT * FROM table WHERE..."
                          />
                        </div>
                      )}

                      {formData.format === 'csv' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('scenarios.form.path')}
                          </label>
                          <input
                            type="text"
                            name="sourceConfig.path"
                            value={formData.sourceConfig.path}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="/path/to/file.csv"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Validation Rules */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('scenarios.form.validationRules')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('scenarios.form.validationRulesDescription')}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('scenarios.form.accuracyThreshold')}
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          name="thresholds.accuracy"
                          value={formData.thresholds.accuracy}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('scenarios.form.completenessThreshold')}
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          name="thresholds.completeness"
                          value={formData.thresholds.completeness}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('scenarios.form.tags')}
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags.join(', ')}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tags: e.target.value
                            .split(',')
                            .map((tag) => tag.trim()),
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder={t('scenarios.form.tagsPlaceholder')}
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="notifications"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                    />
                    <label
                      htmlFor="notifications"
                      className="text-sm text-gray-700"
                    >
                      {t('scenarios.form.enableNotifications')}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t flex justify-between">
          <button
            type="button"
            onClick={prevStep}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            disabled={currentStep === 1}
          >
            {t('common.previous')}
          </button>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {t('common.cancel')}
            </button>
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                {t('common.next')}
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                {editingScenario ? t('common.save') : t('scenarios.create')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
