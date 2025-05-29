import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import { getIconComponent } from '../../../utils/iconMapper';

interface RoleSolutionFormData {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  useCases: string[];
}

interface RoleSolutionModalProps {
  isOpen: boolean;
  solution: RoleSolutionFormData;
  setSolution: React.Dispatch<React.SetStateAction<RoleSolutionFormData>>;
  isEditing: boolean;
  onSave: () => void;
  onClose: () => void;
  availableIcons: string[];
  addArrayField: (setter: Function, currentArray: string[]) => void;
  removeArrayField: (setter: Function, currentArray: string[], index: number) => void;
  updateArrayField: (setter: Function, currentArray: string[], index: number, value: string) => void;
}

const RoleSolutionModal: React.FC<RoleSolutionModalProps> = ({
  isOpen,
  solution,
  setSolution,
  isEditing,
  onSave,
  onClose,
  availableIcons,
  addArrayField,
  removeArrayField,
  updateArrayField
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  const generateId = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setSolution(prev => ({
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
            className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Edit Role Solution' : 'Add New Role Solution'}
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
                      value={solution.title}
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
                      value={solution.id}
                      onChange={(e) => setSolution(prev => ({ ...prev, id: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50"
                      disabled={isEditing}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={solution.description}
                      onChange={(e) => setSolution(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <select
                      value={solution.icon}
                      onChange={(e) => setSolution(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {availableIcons.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>

                  {/* Icon Preview */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon Preview
                    </label>
                    <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg">
                      <div className="text-primary-600">
                        {React.createElement(getIconComponent(solution.icon), { size: 24 })}
                      </div>
                      <span className="text-sm text-gray-600">{solution.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Features */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Features
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayField(setSolution, solution.features)}
                        className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                      >
                        <Plus size={16} className="mr-1" />
                        Add Feature
                      </button>
                    </div>
                    <div className="space-y-2">
                      {solution.features.map((feature, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateArrayField(setSolution, solution.features, index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            placeholder="Enter feature..."
                          />
                          {solution.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(setSolution, solution.features, index)}
                              className="text-red-600 hover:text-red-700 p-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Use Cases
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayField(setSolution, solution.useCases)}
                        className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                      >
                        <Plus size={16} className="mr-1" />
                        Add Use Case
                      </button>
                    </div>
                    <div className="space-y-2">
                      {solution.useCases.map((useCase, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="text"
                            value={useCase}
                            onChange={(e) => updateArrayField(setSolution, solution.useCases, index, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            placeholder="Enter use case..."
                          />
                          {solution.useCases.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayField(setSolution, solution.useCases, index)}
                              className="text-red-600 hover:text-red-700 p-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
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
                  {isEditing ? 'Update Role Solution' : 'Create Role Solution'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoleSolutionModal; 