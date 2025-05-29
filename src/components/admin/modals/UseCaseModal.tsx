import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Star } from 'lucide-react';
import { getIconComponent } from '../../../utils/iconMapper';

interface UseCaseFormData {
  id: string;
  title: string;
  description: string;
  category: 'content' | 'marketing' | 'sales' | 'strategy';
  featured: boolean;
  icon: string;
  benefits: string[];
  examples: string[];
  metrics: Array<{
    label: string;
    value: string;
    description: string;
  }>;
}

interface UseCaseModalProps {
  isOpen: boolean;
  useCase: UseCaseFormData;
  setUseCase: React.Dispatch<React.SetStateAction<UseCaseFormData>>;
  isEditing: boolean;
  onSave: () => void;
  onClose: () => void;
  availableIcons: string[];
  addArrayField: (setter: Function, currentArray: string[]) => void;
  removeArrayField: (setter: Function, currentArray: string[], index: number) => void;
  updateArrayField: (setter: Function, currentArray: string[], index: number, value: string) => void;
  addMetricField: () => void;
  removeMetricField: (index: number) => void;
  updateMetricField: (index: number, field: string, value: string) => void;
}

const UseCaseModal: React.FC<UseCaseModalProps> = ({
  isOpen,
  useCase,
  setUseCase,
  isEditing,
  onSave,
  onClose,
  availableIcons,
  addArrayField,
  removeArrayField,
  updateArrayField,
  addMetricField,
  removeMetricField,
  updateMetricField
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const generateId = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setUseCase(prev => ({
      ...prev,
      title,
      id: !isEditing ? generateId(title) : prev.id
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Edit Use Case' : 'Add New Use Case'}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={useCase.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID
                    </label>
                    <input
                      type="text"
                      value={useCase.id}
                      onChange={(e) => setUseCase(prev => ({ ...prev, id: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
                      disabled={isEditing}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={useCase.description}
                      onChange={(e) => setUseCase(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={useCase.category}
                        onChange={(e) => setUseCase(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      >
                        <option value="content">Content</option>
                        <option value="marketing">Marketing</option>
                        <option value="sales">Sales</option>
                        <option value="strategy">Strategy</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon
                      </label>
                      <select
                        value={useCase.icon}
                        onChange={(e) => setUseCase(prev => ({ ...prev, icon: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {availableIcons.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={useCase.featured}
                      onChange={(e) => setUseCase(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700 flex items-center">
                      <Star size={16} className="mr-1" />
                      Featured Use Case
                    </label>
                  </div>

                  {/* Icon Preview */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon Preview
                    </label>
                    <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg">
                      <div className="text-primary-600">
                        {React.createElement(getIconComponent(useCase.icon), { size: 24 })}
                      </div>
                      <span className="text-sm text-gray-600">{useCase.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Benefits */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Benefits
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayField(setUseCase, useCase.benefits)}
                        className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                      >
                        <Plus size={16} className="mr-1" />
                        Add Benefit
                      </button>
                    </div>
                    <div className="space-y-2">
                      {useCase.benefits.map((benefit, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="text"
                            value={benefit}
                            onChange={(e) => updateArrayField(setUseCase, useCase.benefits, index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            placeholder="Enter benefit..."
                          />
                          {useCase.benefits.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(setUseCase, useCase.benefits, index)}
                              className="text-red-600 hover:text-red-700 p-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Examples
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayField(setUseCase, useCase.examples)}
                        className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                      >
                        <Plus size={16} className="mr-1" />
                        Add Example
                      </button>
                    </div>
                    <div className="space-y-2">
                      {useCase.examples.map((example, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="text"
                            value={example}
                            onChange={(e) => updateArrayField(setUseCase, useCase.examples, index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            placeholder="Enter example..."
                          />
                          {useCase.examples.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(setUseCase, useCase.examples, index)}
                              className="text-red-600 hover:text-red-700 p-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Metrics
                      </label>
                      <button
                        type="button"
                        onClick={addMetricField}
                        className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                      >
                        <Plus size={16} className="mr-1" />
                        Add Metric
                      </button>
                    </div>
                    <div className="space-y-3">
                      {useCase.metrics.map((metric, index) => (
                        <div key={index} className="p-3 border border-gray-200 rounded-lg space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Metric {index + 1}</span>
                            {useCase.metrics.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeMetricField(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={metric.label}
                              onChange={(e) => updateMetricField(index, 'label', e.target.value)}
                              placeholder="Label (e.g., Speed)"
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            />
                            <input
                              type="text"
                              value={metric.value}
                              onChange={(e) => updateMetricField(index, 'value', e.target.value)}
                              placeholder="Value (e.g., 5x faster)"
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <input
                            type="text"
                            value={metric.description}
                            onChange={(e) => updateMetricField(index, 'description', e.target.value)}
                            placeholder="Description (e.g., than traditional methods)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {isEditing ? 'Update Use Case' : 'Create Use Case'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UseCaseModal; 