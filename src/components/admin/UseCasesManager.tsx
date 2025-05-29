import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Star,
  Users,
  Building2,
  FileText,
  AlertCircle,
  Check,
  Search,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';
import { useUseCases } from '../../hooks/useUseCases';
import { UseCase, RoleSolution, IndustrySolution } from '../../types/usecases';
import { getIconComponent, getAvailableIconNames } from '../../utils/iconMapper';
import UseCaseModal from './modals/UseCaseModal';
import RoleSolutionModal from './modals/RoleSolutionModal';
import IndustrySolutionModal from './modals/IndustrySolutionModal';
import { apiClient } from '../../services/api';

interface UseCasesManagerProps {}

type TabType = 'usecases' | 'roles' | 'industries';
type ModalType = 'none' | 'usecase' | 'role' | 'industry';

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

interface RoleSolutionFormData {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  useCases: string[];
}

interface IndustrySolutionFormData {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  useCases: string[];
}

const UseCasesManager: React.FC<UseCasesManagerProps> = () => {
  const [activeTab, setActiveTab] = useState<TabType>('usecases');
  const [modalType, setModalType] = useState<ModalType>('none');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    useCases,
    roleSolutions,
    industrySolutions,
    categories,
    loading,
    error,
    refreshData
  } = useUseCases();

  // Form states
  const [useCaseForm, setUseCaseForm] = useState<UseCaseFormData>({
    id: '',
    title: '',
    description: '',
    category: 'content',
    featured: false,
    icon: 'PenTool',
    benefits: [''],
    examples: [''],
    metrics: [{ label: '', value: '', description: '' }]
  });

  const [roleSolutionForm, setRoleSolutionForm] = useState<RoleSolutionFormData>({
    id: '',
    title: '',
    description: '',
    icon: 'Briefcase',
    features: [''],
    useCases: ['']
  });

  const [industrySolutionForm, setIndustrySolutionForm] = useState<IndustrySolutionFormData>({
    id: '',
    title: '',
    description: '',
    icon: 'Building2',
    features: [''],
    useCases: ['']
  });

  const availableIcons = getAvailableIconNames();

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const resetForms = () => {
    setUseCaseForm({
      id: '',
      title: '',
      description: '',
      category: 'content',
      featured: false,
      icon: 'PenTool',
      benefits: [''],
      examples: [''],
      metrics: [{ label: '', value: '', description: '' }]
    });
    setRoleSolutionForm({
      id: '',
      title: '',
      description: '',
      icon: 'Briefcase',
      features: [''],
      useCases: ['']
    });
    setIndustrySolutionForm({
      id: '',
      title: '',
      description: '',
      icon: 'Building2',
      features: [''],
      useCases: ['']
    });
  };

  const openModal = (type: ModalType, item?: any) => {
    if (item) {
      setEditingItem(item);
      if (type === 'usecase') {
        setUseCaseForm({ ...item });
      } else if (type === 'role') {
        setRoleSolutionForm({ ...item });
      } else if (type === 'industry') {
        setIndustrySolutionForm({ ...item });
      }
    } else {
      setEditingItem(null);
      resetForms();
    }
    setModalType(type);
  };

  const closeModal = () => {
    setModalType('none');
    setEditingItem(null);
    resetForms();
  };

  // Array field helpers
  const addArrayField = (setter: Function, currentArray: string[]) => {
    setter((prev: any) => ({
      ...prev,
      [currentArray === prev.benefits ? 'benefits' : 
       currentArray === prev.examples ? 'examples' :
       currentArray === prev.features ? 'features' : 'useCases']: [...currentArray, '']
    }));
  };

  const removeArrayField = (setter: Function, currentArray: string[], index: number) => {
    if (currentArray.length > 1) {
      const newArray = currentArray.filter((_, i) => i !== index);
      setter((prev: any) => ({
        ...prev,
        [currentArray === prev.benefits ? 'benefits' : 
         currentArray === prev.examples ? 'examples' :
         currentArray === prev.features ? 'features' : 'useCases']: newArray
      }));
    }
  };

  const updateArrayField = (setter: Function, currentArray: string[], index: number, value: string) => {
    const newArray = [...currentArray];
    newArray[index] = value;
    setter((prev: any) => ({
      ...prev,
      [currentArray === prev.benefits ? 'benefits' : 
       currentArray === prev.examples ? 'examples' :
       currentArray === prev.features ? 'features' : 'useCases']: newArray
    }));
  };

  // Metrics field helpers
  const addMetricField = () => {
    setUseCaseForm(prev => ({
      ...prev,
      metrics: [...prev.metrics, { label: '', value: '', description: '' }]
    }));
  };

  const removeMetricField = (index: number) => {
    if (useCaseForm.metrics.length > 1) {
      setUseCaseForm(prev => ({
        ...prev,
        metrics: prev.metrics.filter((_, i) => i !== index)
      }));
    }
  };

  const updateMetricField = (index: number, field: string, value: string) => {
    setUseCaseForm(prev => ({
      ...prev,
      metrics: prev.metrics.map((metric, i) => 
        i === index ? { ...metric, [field]: value } : metric
      )
    }));
  };

  // Save handlers
  const saveUseCase = async () => {
    try {
      if (editingItem) {
        // Update existing use case
        await apiClient.updateUseCase(useCaseForm.id, useCaseForm);
        showSuccessMessage('Use case updated successfully!');
      } else {
        // Create new use case
        await apiClient.createUseCase(useCaseForm);
        showSuccessMessage('Use case created successfully!');
      }
      closeModal();
      refreshData();
    } catch (error) {
      console.error('Error saving use case:', error);
      setSuccessMessage('Error saving use case. Please try again.');
    }
  };

  const saveRoleSolution = async () => {
    try {
      if (editingItem) {
        await apiClient.updateRoleSolution(roleSolutionForm.id, roleSolutionForm);
        showSuccessMessage('Role solution updated successfully!');
      } else {
        await apiClient.createRoleSolution(roleSolutionForm);
        showSuccessMessage('Role solution created successfully!');
      }
      closeModal();
      refreshData();
    } catch (error) {
      console.error('Error saving role solution:', error);
      setSuccessMessage('Error saving role solution. Please try again.');
    }
  };

  const saveIndustrySolution = async () => {
    try {
      if (editingItem) {
        await apiClient.updateIndustrySolution(industrySolutionForm.id, industrySolutionForm);
        showSuccessMessage('Industry solution updated successfully!');
      } else {
        await apiClient.createIndustrySolution(industrySolutionForm);
        showSuccessMessage('Industry solution created successfully!');
      }
      closeModal();
      refreshData();
    } catch (error) {
      console.error('Error saving industry solution:', error);
      setSuccessMessage('Error saving industry solution. Please try again.');
    }
  };

  const deleteItem = async (type: string, id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }

    try {
      if (type === 'use case') {
        await apiClient.deleteUseCase(id);
      } else if (type === 'role solution') {
        await apiClient.deleteRoleSolution(id);
      } else if (type === 'industry solution') {
        await apiClient.deleteIndustrySolution(id);
      }
      showSuccessMessage(`${type} deleted successfully!`);
      refreshData();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      setSuccessMessage(`Error deleting ${type}. Please try again.`);
    }
  };

  // Filter functions
  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || useCase.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredRoleSolutions = roleSolutions.filter(solution =>
    solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solution.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIndustrySolutions = industrySolutions.filter(solution =>
    solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solution.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'usecases' as TabType, name: 'Use Cases', icon: FileText, count: useCases.length },
    { id: 'roles' as TabType, name: 'Role Solutions', icon: Users, count: roleSolutions.length },
    { id: 'industries' as TabType, name: 'Industry Solutions', icon: Building2, count: industrySolutions.length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Use Cases Management</h2>
          <p className="text-gray-600 mt-1">Manage use cases, role solutions, and industry solutions</p>
        </div>
        <button
          onClick={() => openModal(activeTab === 'usecases' ? 'usecase' : activeTab === 'roles' ? 'role' : 'industry')}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add New</span>
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2"
        >
          <Check className="text-green-600" size={20} />
          <span className="text-green-800">{successMessage}</span>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={20} />
                <span>{tab.name}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        {activeTab === 'usecases' && (
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              <option value="content">Content</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="strategy">Strategy</option>
            </select>
          </div>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <p className="text-red-600">Error loading data: {error}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Use Cases List */}
          {activeTab === 'usecases' && (
            <div className="grid gap-4">
              {filteredUseCases.map((useCase) => (
                <UseCaseCard
                  key={useCase.id}
                  useCase={useCase}
                  onEdit={() => openModal('usecase', useCase)}
                  onDelete={() => deleteItem('use case', useCase.id)}
                />
              ))}
              {filteredUseCases.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="text-gray-400 mx-auto mb-4" size={48} />
                  <p className="text-gray-600">No use cases found</p>
                </div>
              )}
            </div>
          )}

          {/* Role Solutions List */}
          {activeTab === 'roles' && (
            <div className="grid gap-4">
              {filteredRoleSolutions.map((solution) => (
                <RoleSolutionCard
                  key={solution.id}
                  solution={solution}
                  onEdit={() => openModal('role', solution)}
                  onDelete={() => deleteItem('role solution', solution.id)}
                />
              ))}
              {filteredRoleSolutions.length === 0 && (
                <div className="text-center py-12">
                  <Users className="text-gray-400 mx-auto mb-4" size={48} />
                  <p className="text-gray-600">No role solutions found</p>
                </div>
              )}
            </div>
          )}

          {/* Industry Solutions List */}
          {activeTab === 'industries' && (
            <div className="grid gap-4">
              {filteredIndustrySolutions.map((solution) => (
                <IndustrySolutionCard
                  key={solution.id}
                  solution={solution}
                  onEdit={() => openModal('industry', solution)}
                  onDelete={() => deleteItem('industry solution', solution.id)}
                />
              ))}
              {filteredIndustrySolutions.length === 0 && (
                <div className="text-center py-12">
                  <Building2 className="text-gray-400 mx-auto mb-4" size={48} />
                  <p className="text-gray-600">No industry solutions found</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {modalType === 'usecase' && (
        <UseCaseModal
          isOpen={modalType === 'usecase'}
          useCase={useCaseForm}
          setUseCase={setUseCaseForm}
          isEditing={!!editingItem}
          onSave={saveUseCase}
          onClose={closeModal}
          availableIcons={availableIcons}
          addArrayField={addArrayField}
          removeArrayField={removeArrayField}
          updateArrayField={updateArrayField}
          addMetricField={addMetricField}
          removeMetricField={removeMetricField}
          updateMetricField={updateMetricField}
        />
      )}

      {modalType === 'role' && (
        <RoleSolutionModal
          isOpen={modalType === 'role'}
          solution={roleSolutionForm}
          setSolution={setRoleSolutionForm}
          isEditing={!!editingItem}
          onSave={saveRoleSolution}
          onClose={closeModal}
          availableIcons={availableIcons}
          addArrayField={addArrayField}
          removeArrayField={removeArrayField}
          updateArrayField={updateArrayField}
        />
      )}

      {modalType === 'industry' && (
        <IndustrySolutionModal
          isOpen={modalType === 'industry'}
          solution={industrySolutionForm}
          setSolution={setIndustrySolutionForm}
          isEditing={!!editingItem}
          onSave={saveIndustrySolution}
          onClose={closeModal}
          availableIcons={availableIcons}
          addArrayField={addArrayField}
          removeArrayField={removeArrayField}
          updateArrayField={updateArrayField}
        />
      )}
    </div>
  );
};

// Use Case Card Component
interface UseCaseCardProps {
  useCase: UseCase;
  onEdit: () => void;
  onDelete: () => void;
}

const UseCaseCard: React.FC<UseCaseCardProps> = ({ useCase, onEdit, onDelete }) => {
  const Icon = useCase.icon;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="text-primary-600">
            <Icon size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{useCase.title}</h3>
              {useCase.featured && (
                <Star className="text-yellow-500" size={16} fill="currentColor" />
              )}
              <span className={`px-2 py-1 text-xs rounded-full ${
                useCase.category === 'content' ? 'bg-blue-100 text-blue-800' :
                useCase.category === 'marketing' ? 'bg-green-100 text-green-800' :
                useCase.category === 'sales' ? 'bg-purple-100 text-purple-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {useCase.category}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{useCase.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Benefits:</span>
                <span className="text-gray-600 ml-1">{useCase.benefits.length} items</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Examples:</span>
                <span className="text-gray-600 ml-1">{useCase.examples.length} items</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Metrics:</span>
                <span className="text-gray-600 ml-1">{useCase.metrics.length} items</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Role Solution Card Component
interface RoleSolutionCardProps {
  solution: RoleSolution;
  onEdit: () => void;
  onDelete: () => void;
}

const RoleSolutionCard: React.FC<RoleSolutionCardProps> = ({ solution, onEdit, onDelete }) => {
  const Icon = solution.icon;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="text-primary-600">
            <Icon size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{solution.title}</h3>
            <p className="text-gray-600 mb-4">{solution.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Features:</span>
                <span className="text-gray-600 ml-1">{solution.features.length} items</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Use Cases:</span>
                <span className="text-gray-600 ml-1">{solution.useCases.length} items</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Industry Solution Card Component (same as Role Solution but different styling)
interface IndustrySolutionCardProps {
  solution: IndustrySolution;
  onEdit: () => void;
  onDelete: () => void;
}

const IndustrySolutionCard: React.FC<IndustrySolutionCardProps> = ({ solution, onEdit, onDelete }) => {
  const Icon = solution.icon;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="text-primary-600">
            <Icon size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{solution.title}</h3>
            <p className="text-gray-600 mb-4">{solution.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Features:</span>
                <span className="text-gray-600 ml-1">{solution.features.length} items</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Use Cases:</span>
                <span className="text-gray-600 ml-1">{solution.useCases.length} items</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal Components will be created in separate files for better organization
export default UseCasesManager; 