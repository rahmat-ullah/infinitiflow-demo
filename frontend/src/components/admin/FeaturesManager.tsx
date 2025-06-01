import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Edit2, 
  Eye, 
  Plus, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Upload,
  Star,
  Settings,
  Grid3X3,
  List,
  RotateCcw
} from 'lucide-react';
import Button from '../ui/Button';
import { FeatureSection, Feature, FeatureListResponse, FeatureApiResponse } from '../../types/features';

const API_BASE_URL = 'http://localhost:3001/api';

const FeaturesManager: React.FC = () => {
  const [featureSections, setFeatureSections] = useState<FeatureSection[]>([]);
  const [currentFeatures, setCurrentFeatures] = useState<FeatureSection | null>(null);
  const [editingFeatures, setEditingFeatures] = useState<FeatureSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'edit' | 'preview'>('list');

  useEffect(() => {
    fetchFeaturesSections();
    fetchCurrentFeatures();
  }, []);

  const fetchFeaturesSections = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/features/all`);
      const result: FeatureListResponse = await response.json();
      
      if (result.success) {
        setFeatureSections(result.data.featureSections);
      } else {
        setError(result.error || 'Failed to fetch features sections');
      }
    } catch (err) {
      setError('Error fetching features sections');
      console.error('Error:', err);
    }
  };

  const fetchCurrentFeatures = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/features`);
      const result: FeatureApiResponse = await response.json();
      
      if (result.success) {
        setCurrentFeatures(result.data);
      } else {
        setCurrentFeatures(null);
      }
    } catch (err) {
      console.error('Error fetching current features:', err);
      setCurrentFeatures(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewFeatures = () => {
    const newFeatures: FeatureSection = {
      sectionTitle: "New Features Section",
      sectionSubtitle: "new",
      sectionDescription: "Description for the new features section.",
      badge: {
        text: "New Features",
        icon: "Star"
      },
      features: [
        {
          title: "Sample Feature",
          description: "This is a sample feature description.",
          icon: "Star",
          isVisible: true,
          order: 0
        }
      ],
      isActive: false,
      version: "1.0.0",
      maxFeatures: 6,
      displayMode: "grid",
      theme: {
        showIcons: true,
        cardStyle: "default",
        columns: 3
      }
    };
    setEditingFeatures(newFeatures);
    setActiveTab('edit');
  };

  const editFeatures = (features: FeatureSection) => {
    setEditingFeatures({ ...features });
    setActiveTab('edit');
  };

  const saveFeatures = async () => {
    if (!editingFeatures) return;

    try {
      setIsSaving(true);
      setError(null);

      const url = editingFeatures._id 
        ? `${API_BASE_URL}/features/${editingFeatures._id}`
        : `${API_BASE_URL}/features`;
      
      const method = editingFeatures._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingFeatures)
      });

      const result: FeatureApiResponse = await response.json();

      if (result.success) {
        await fetchFeaturesSections();
        await fetchCurrentFeatures();
        setEditingFeatures(null);
        setActiveTab('list');
      } else {
        setError(result.error || 'Failed to save features section');
      }
    } catch (err) {
      setError('Error saving features section');
      console.error('Error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const activateFeatures = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/features/${id}/activate`, {
        method: 'PATCH'
      });

      const result: FeatureApiResponse = await response.json();

      if (result.success) {
        await fetchFeaturesSections();
        await fetchCurrentFeatures();
      } else {
        setError(result.error || 'Failed to activate features section');
      }
    } catch (err) {
      setError('Error activating features section');
      console.error('Error:', err);
    }
  };

  const deleteFeatures = async (id: string) => {
    if (!confirm('Are you sure you want to delete this features section?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/features/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        await fetchFeaturesSections();
        await fetchCurrentFeatures();
      } else {
        setError(result.error || 'Failed to delete features section');
      }
    } catch (err) {
      setError('Error deleting features section');
      console.error('Error:', err);
    }
  };

  const updateEditingFeatures = (field: keyof FeatureSection, value: any) => {
    setEditingFeatures(prev => prev ? { ...prev, [field]: value } : null);
  };

  const updateNestedField = (parent: keyof FeatureSection, field: string, value: any) => {
    setEditingFeatures(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [parent]: {
          ...(prev[parent] as any),
          [field]: value
        }
      };
    });
  };

  const addFeature = () => {
    if (!editingFeatures) return;
    
    const newFeature: Feature = {
      title: "New Feature",
      description: "Feature description",
      icon: "Star",
      isVisible: true,
      order: editingFeatures.features.length
    };

    updateEditingFeatures('features', [...editingFeatures.features, newFeature]);
  };

  const updateFeature = (index: number, field: keyof Feature, value: any) => {
    if (!editingFeatures) return;
    
    const updatedFeatures = [...editingFeatures.features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    updateEditingFeatures('features', updatedFeatures);
  };

  const removeFeature = (index: number) => {
    if (!editingFeatures) return;
    
    const updatedFeatures = editingFeatures.features.filter((_, i) => i !== index);
    updateEditingFeatures('features', updatedFeatures);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="animate-spin h-8 w-8 text-primary-600" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">Loading features...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Features Manager</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your website's features section content</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => {
              fetchFeaturesSections();
              fetchCurrentFeatures();
            }}
            leftIcon={<RefreshCw size={16} />}
          >
            Refresh
          </Button>
          <Button
            onClick={createNewFeatures}
            leftIcon={<Plus size={16} />}
          >
            New Features Section
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-red-800 dark:text-red-200">{error}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setError(null)}
              className="ml-auto"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'list', name: 'All Sections', icon: List },
            { id: 'edit', name: 'Edit', icon: Edit2 },
            { id: 'preview', name: 'Preview', icon: Eye }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'list' && (
          <div className="space-y-4">
            {/* Current Active Features */}
            {currentFeatures && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <h3 className="font-medium text-green-800 dark:text-green-200">
                        Currently Active: {currentFeatures.sectionTitle}
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        Version {currentFeatures.version} • {currentFeatures.features.length} features
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editFeatures(currentFeatures)}
                    leftIcon={<Edit2 size={14} />}
                  >
                    Edit Active
                  </Button>
                </div>
              </div>
            )}

            {/* All Features Sections */}
            <div className="grid gap-4">
              {featureSections.map((features) => (
                <motion.div
                  key={features._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {features.sectionTitle}
                        </h3>
                        {features.isActive && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            <CheckCircle size={12} className="mr-1" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {features.sectionDescription}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Version: {features.version}</span>
                        <span>Features: {features.features.length}</span>
                        <span>Display: {features.displayMode}</span>
                        <span>Columns: {features.theme?.columns || 3}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => editFeatures(features)}
                        leftIcon={<Edit2 size={14} />}
                      >
                        Edit
                      </Button>
                      {!features.isActive && (
                        <Button
                          size="sm"
                          onClick={() => activateFeatures(features._id!)}
                          leftIcon={<CheckCircle size={14} />}
                        >
                          Activate
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        leftIcon={<Trash2 size={14} />}
                        onClick={() => deleteFeatures(features._id!)}
                        disabled={features.isActive}
                        className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'edit' && editingFeatures && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={editingFeatures.sectionTitle}
                    onChange={(e) => updateEditingFeatures('sectionTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Highlighted Word
                  </label>
                  <input
                    type="text"
                    value={editingFeatures.sectionSubtitle || ''}
                    onChange={(e) => updateEditingFeatures('sectionSubtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingFeatures.sectionDescription || ''}
                    onChange={(e) => updateEditingFeatures('sectionDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Version
                  </label>
                  <input
                    type="text"
                    value={editingFeatures.version}
                    onChange={(e) => updateEditingFeatures('version', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Features
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={editingFeatures.maxFeatures || 6}
                    onChange={(e) => updateEditingFeatures('maxFeatures', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Badge</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={editingFeatures.badge?.text || ''}
                    onChange={(e) => updateNestedField('badge', 'text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Badge Icon
                  </label>
                  <input
                    type="text"
                    value={editingFeatures.badge?.icon || ''}
                    onChange={(e) => updateNestedField('badge', 'icon', e.target.value)}
                    placeholder="e.g., Zap, Star, Heart"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Theme Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Mode
                  </label>
                  <select
                    value={editingFeatures.displayMode}
                    onChange={(e) => updateEditingFeatures('displayMode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="grid">Grid</option>
                    <option value="list">List</option>
                    <option value="carousel">Carousel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Columns
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={editingFeatures.theme?.columns || 3}
                    onChange={(e) => updateNestedField('theme', 'columns', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Card Style
                  </label>
                  <select
                    value={editingFeatures.theme?.cardStyle || 'default'}
                    onChange={(e) => updateNestedField('theme', 'cardStyle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="default">Default</option>
                    <option value="minimal">Minimal</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingFeatures.theme?.showIcons ?? true}
                    onChange={(e) => updateNestedField('theme', 'showIcons', e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Show Icons</span>
                </label>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Features</h3>
                <Button
                  size="sm"
                  onClick={addFeature}
                  leftIcon={<Plus size={16} />}
                >
                  Add Feature
                </Button>
              </div>
              <div className="space-y-4">
                {editingFeatures.features.map((feature, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => updateFeature(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Icon
                        </label>
                        <input
                          type="text"
                          value={feature.icon}
                          onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                          placeholder="e.g., Star, Heart, Zap"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Description
                        </label>
                        <textarea
                          value={feature.description}
                          onChange={(e) => updateFeature(index, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div className="flex items-center justify-between md:col-span-2">
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={feature.isVisible}
                              onChange={(e) => updateFeature(index, 'isVisible', e.target.checked)}
                              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Visible</span>
                          </label>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Order
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={feature.order}
                              onChange={(e) => updateFeature(index, 'order', parseInt(e.target.value))}
                              className="w-20 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-secondary-700 text-gray-900 dark:text-gray-100"
                            />
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFeature(index)}
                          leftIcon={<Trash2 size={14} />}
                          className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Actions */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingFeatures(null);
                  setActiveTab('list');
                }}
                leftIcon={<XCircle size={16} />}
              >
                Cancel
              </Button>
              <Button
                onClick={saveFeatures}
                disabled={isSaving}
                leftIcon={isSaving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              >
                {isSaving ? 'Saving...' : 'Save Features Section'}
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'preview' && currentFeatures && (
          <div className="bg-white dark:bg-secondary-800 rounded-lg border border-gray-200 dark:border-secondary-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Live Preview</h3>
            <div className="bg-gray-50 dark:bg-secondary-900 rounded-lg p-8">
              <div className="text-center mb-8">
                {currentFeatures.badge && (
                  <span className="inline-block bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    {currentFeatures.badge.text}
                  </span>
                )}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {currentFeatures.sectionTitle}
                </h2>
                {currentFeatures.sectionDescription && (
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {currentFeatures.sectionDescription}
                  </p>
                )}
              </div>
              <div className={`grid gap-6 ${
                currentFeatures.theme?.columns === 1 ? 'grid-cols-1' :
                currentFeatures.theme?.columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
                currentFeatures.theme?.columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {currentFeatures.features.slice(0, currentFeatures.maxFeatures).map((feature, index) => (
                  <div key={index} className="bg-white dark:bg-secondary-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-secondary-700">
                    {currentFeatures.theme?.showIcons && (
                      <div className="mb-4 bg-primary-100 dark:bg-primary-800 rounded-lg p-3 w-12 h-12 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <Star size={24} />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesManager; 