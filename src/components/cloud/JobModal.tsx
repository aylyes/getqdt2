import { useState } from 'react';
import { X, Clock, AlertCircle, Calendar, Settings, Zap, BarChart3, GitBranch, RefreshCw } from 'lucide-react';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobData: any) => void;
}

type JobType = 'Quality Analysis' | 'Data Sync' | 'Performance Check' | 'Custom';
type Schedule = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'custom';

const jobTypeDetails = {
  'Quality Analysis': {
    icon: BarChart3,
    description: 'Monitor and analyze dashboard quality metrics',
    color: 'bg-blue-500'
  },
  'Data Sync': {
    icon: RefreshCw,
    description: 'Synchronize data between different platforms',
    color: 'bg-green-500'
  },
  'Performance Check': {
    icon: Zap,
    description: 'Monitor dashboard performance and response times',
    color: 'bg-purple-500'
  },
  'Custom': {
    icon: GitBranch,
    description: 'Create a custom job type for specific needs',
    color: 'bg-orange-500'
  }
};

// Ajout de l'export par défaut
export default function JobModal({ isOpen, onClose, onSave }: JobModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Quality Analysis' as JobType,
    schedule: 'daily' as Schedule,
    customCron: '',
    description: '',
    timeout: '30',
    retries: '3',
    alertThreshold: 'warning',
    notifications: true,
    priority: 'medium',
    tags: [] as string[],
    customMetrics: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setCurrentStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="text-white">
            <h2 className="text-2xl font-bold">Create New Job</h2>
            <p className="text-blue-100 mt-1">Step {currentStep} of 3</p>
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
            {['Job Type', 'Schedule', 'Settings'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep > index + 1 ? 'bg-green-500' :
                  currentStep === index + 1 ? 'bg-blue-600' :
                  'bg-gray-300'
                } text-white font-semibold`}>
                  {currentStep > index + 1 ? '✓' : index + 1}
                </div>
                <span className={`ml-2 ${
                  currentStep === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step}
                </span>
                {index < 2 && (
                  <div className={`w-24 h-1 mx-4 ${
                    currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6">
          {/* Step 1: Job Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter a descriptive name for your job"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Job Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(jobTypeDetails).map(([type, details]) => {
                    const Icon = details.icon;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: type as JobType }))}
                        className={`relative p-6 rounded-xl border-2 transition-all ${
                          formData.type === type
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`${details.color} p-3 rounded-lg text-white`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-gray-900">{type}</h3>
                            <p className="mt-1 text-sm text-gray-500">{details.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Describe the purpose and goals of this job"
                />
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Schedule Configuration</h3>
                    <p className="text-sm text-gray-500">Define when and how often this job should run</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency
                    </label>
                    <select
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="hourly">Every Hour</option>
                      <option value="daily">Every Day</option>
                      <option value="weekly">Every Week</option>
                      <option value="monthly">Every Month</option>
                      <option value="custom">Custom Schedule</option>
                    </select>
                  </div>

                  {formData.schedule === 'custom' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Custom Cron Expression
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="customCron"
                          value={formData.customCron}
                          onChange={handleChange}
                          placeholder="*/5 * * * *"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <div className="mt-1 text-sm text-gray-500">
                          Format: minute hour day month weekday
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Timing Settings</h3>
                    <p className="text-sm text-gray-500">Configure execution timing parameters</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      name="timeout"
                      value={formData.timeout}
                      onChange={handleChange}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Retry Attempts
                    </label>
                    <input
                      type="number"
                      name="retries"
                      value={formData.retries}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Settings */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Alert Configuration</h3>
                    <p className="text-sm text-gray-500">Define how and when alerts should be triggered</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alert Threshold
                    </label>
                    <select
                      name="alertThreshold"
                      value={formData.alertThreshold}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="error">Error</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority Level
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="notifications"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                    />
                    <label htmlFor="notifications" className="text-sm text-gray-700">
                      Enable notifications
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Settings className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
                    <p className="text-sm text-gray-500">Additional configuration options</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags.join(', ')}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        tags: e.target.value.split(',').map(tag => tag.trim())
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="production, dashboard, quality"
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
            Previous
          </button>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Create Job
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}