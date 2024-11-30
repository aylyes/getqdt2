import { useState, useEffect } from 'react';
import {
  X,
  Database,
  Cloud,
  Server,
  Key,
  Globe,
  Cog,
  BarChart3,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (connectorData: any) => void;
  editingConnector?: {
    id: string;
    name: string;
    type: string;
    config?: any;
  } | null;
}

type ConnectorType = 'tableau' | 'looker' | 'powerbi' | 'bigquery' | 'redshift';

const connectorTypes: Record<
  ConnectorType,
  {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
  }
> = {
  tableau: {
    icon: BarChart3,
    title: 'Tableau',
    description: 'Connect to Tableau Server or Tableau Online',
    color: 'bg-blue-500',
  },
  looker: {
    icon: Globe,
    title: 'Looker',
    description: 'Connect to Looker analytics platform',
    color: 'bg-green-500',
  },
  powerbi: {
    icon: Database,
    title: 'Power BI',
    description: 'Connect to Power BI service',
    color: 'bg-yellow-500',
  },
  bigquery: {
    icon: Cloud,
    title: 'BigQuery',
    description: 'Connect to Google BigQuery data warehouse',
    color: 'bg-purple-500',
  },
  redshift: {
    icon: Server,
    title: 'Redshift',
    description: 'Connect to Amazon Redshift data warehouse',
    color: 'bg-red-500',
  },
};

export function ConnectorModal({
  isOpen,
  onClose,
  onSave,
  editingConnector,
}: ConnectorModalProps) {
  const { t } = useTranslation('cloud');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'tableau' as ConnectorType,
    url: '',
    authMethod: 'oauth',
    credentials: {
      clientId: '',
      clientSecret: '',
      username: '',
      password: '',
      apiKey: '',
    },
    settings: {
      timeout: '60',
      maxRetries: '3',
      sslVerify: true,
      cacheEnabled: true,
    },
    advanced: {
      customHeaders: '',
      proxyUrl: '',
      tags: [] as string[],
    },
  });

  useEffect(() => {
    if (editingConnector) {
      const config =
        typeof editingConnector.config === 'string'
          ? JSON.parse(editingConnector.config)
          : editingConnector.config;

      setFormData({
        ...formData,
        name: editingConnector.name,
        type: editingConnector.type as ConnectorType,
        ...config,
      });
    }
  }, [editingConnector]);

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
        <div className="flex justify-between items-center px-8 py-6 border-b bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="text-white">
            <h2 className="text-2xl font-bold">
              {editingConnector
                ? t('connectors.editTitle')
                : t('connectors.addTitle')}
            </h2>
            <p className="text-blue-100 mt-1">
              {t('connectors.stepProgress', { current: currentStep, total: 3 })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-8 py-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            {[
              t('connectors.steps.platform'),
              t('connectors.steps.authentication'),
              t('connectors.steps.settings'),
            ].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep > index + 1
                      ? 'bg-green-500'
                      : currentStep === index + 1
                      ? 'bg-blue-600'
                      : 'bg-gray-300'
                  } text-white font-semibold`}
                >
                  {currentStep > index + 1 ? '✓' : index + 1}
                </div>
                <span
                  className={`ml-2 ${
                    currentStep === index + 1
                      ? 'text-blue-600 font-medium'
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
          {/* Step 1: Platform Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('connectors.form.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={t('connectors.form.namePlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  {t('connectors.form.platformType')}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(connectorTypes).map(([type, details]) => {
                    const Icon = details.icon;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            type: type as ConnectorType,
                          }))
                        }
                        className={`relative p-6 rounded-xl border-2 transition-all ${
                          formData.type === type
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
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
                              {details.title}
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
                  {t('connectors.form.url')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={t('connectors.form.urlPlaceholder')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Authentication */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Key className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('connectors.form.authentication')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('connectors.form.authDescription')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('connectors.form.authMethod')}
                    </label>
                    <select
                      name="authMethod"
                      value={formData.authMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="oauth">OAuth 2.0</option>
                      <option value="basic">Basic Auth</option>
                      <option value="apikey">API Key</option>
                    </select>
                  </div>

                  {formData.authMethod === 'oauth' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('connectors.form.clientId')}
                        </label>
                        <input
                          type="text"
                          name="credentials.clientId"
                          value={formData.credentials.clientId}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('connectors.form.clientSecret')}
                        </label>
                        <input
                          type="password"
                          name="credentials.clientSecret"
                          value={formData.credentials.clientSecret}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {formData.authMethod === 'basic' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('connectors.form.username')}
                        </label>
                        <input
                          type="text"
                          name="credentials.username"
                          value={formData.credentials.username}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {t('connectors.form.password')}
                        </label>
                        <input
                          type="password"
                          name="credentials.password"
                          value={formData.credentials.password}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {formData.authMethod === 'apikey' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('connectors.form.apiKey')}
                      </label>
                      <input
                        type="password"
                        name="credentials.apiKey"
                        value={formData.credentials.apiKey}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Advanced Settings */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Cog className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t('connectors.form.connectionSettings')}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('connectors.form.settingsDescription')}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('connectors.form.timeout')}
                      </label>
                      <input
                        type="number"
                        name="settings.timeout"
                        value={formData.settings.timeout}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('connectors.form.maxRetries')}
                      </label>
                      <input
                        type="number"
                        name="settings.maxRetries"
                        value={formData.settings.maxRetries}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="sslVerify"
                        name="settings.sslVerify"
                        checked={formData.settings.sslVerify}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                      />
                      <label
                        htmlFor="sslVerify"
                        className="text-sm text-gray-700"
                      >
                        {t('connectors.form.sslVerify')}
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="cacheEnabled"
                        name="settings.cacheEnabled"
                        checked={formData.settings.cacheEnabled}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                      />
                      <label
                        htmlFor="cacheEnabled"
                        className="text-sm text-gray-700"
                      >
                        {t('connectors.form.enableCache')}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('connectors.form.tags')}
                    </label>
                    <input
                      type="text"
                      name="advanced.tags"
                      value={formData.advanced.tags.join(', ')}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          advanced: {
                            ...prev.advanced,
                            tags: e.target.value
                              .split(',')
                              .map((tag) => tag.trim()),
                          },
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t('connectors.form.tagsPlaceholder')}
                    />
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
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                {t('common.next')}
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                {editingConnector ? t('common.save') : t('connectors.create')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
