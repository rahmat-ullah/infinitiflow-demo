import React, { useState, useEffect } from 'react';
import { Edit2, Save, ChevronDown, XCircle } from 'lucide-react';
import Button from '../ui/Button'; 

// Import data sources
import * as contentDataModule from '../../data/content';
import * as productFeaturesDataModule from '../../data/features';
import * as useCasesDataModule from '../../data/usecases';

type CollectionItem = { id?: string | number; title?: string; name?: string; [key: string]: any };

interface CollectionDefinition {
  key: string;
  displayName: string;
  getData: () => CollectionItem[];
  setData: (data: CollectionItem[]) => void; 
}

const ContentManager: React.FC = () => {
  const [siteContent, setSiteContent] = useState(contentDataModule);
  const [productFeaturesState, setProductFeaturesState] = useState(productFeaturesDataModule.features);
  const [useCasesState, setUseCasesState] = useState(useCasesDataModule.useCases);
  const [roleSolutionsState, setRoleSolutionsState] = useState(useCasesDataModule.roleSolutions);
  const [industrySolutionsState, setIndustrySolutionsState] = useState(useCasesDataModule.industrySolutions);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);
  const [originalItem, setOriginalItem] = useState<CollectionItem | null>(null); // Keep track of the original item
  const [currentCollectionKeyForModal, setCurrentCollectionKeyForModal] = useState<string | null>(null);

  const collectionDefinitions: CollectionDefinition[] = [
    { key: 'siteFeatures', displayName: 'Site Features', getData: () => siteContent.features, setData: (data) => setSiteContent(prev => ({...prev, features: data})) },
    { key: 'testimonials', displayName: 'Testimonials', getData: () => siteContent.testimonials, setData: (data) => setSiteContent(prev => ({...prev, testimonials: data})) },
    { key: 'pricingPlans', displayName: 'Pricing Plans', getData: () => siteContent.pricingPlans, setData: (data) => setSiteContent(prev => ({...prev, pricingPlans: data})) },
    { key: 'faqItems', displayName: 'FAQ Items', getData: () => siteContent.faqItems, setData: (data) => setSiteContent(prev => ({...prev, faqItems: data})) },
    { key: 'integrationLogos', displayName: 'Integration Logos', getData: () => siteContent.integrationLogos, setData: (data) => setSiteContent(prev => ({...prev, integrationLogos: data})) },
    { key: 'stats', displayName: 'Stats', getData: () => siteContent.stats, setData: (data) => setSiteContent(prev => ({...prev, stats: data})) },
    { key: 'productFeatures', displayName: 'Product Features', getData: () => productFeaturesState, setData: setProductFeaturesState },
    { key: 'useCases', displayName: 'Use Cases', getData: () => useCasesState, setData: setUseCasesState },
    { key: 'roleSolutions', displayName: 'Role Solutions', getData: () => roleSolutionsState, setData: setRoleSolutionsState },
    { key: 'industrySolutions', displayName: 'Industry Solutions', getData: () => industrySolutionsState, setData: setIndustrySolutionsState },
  ];
  
  const [selectedCollectionKey, setSelectedCollectionKey] = useState<string>(collectionDefinitions[0].key);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getSelectedCollectionData = (): CollectionItem[] => {
    const collection = collectionDefinitions.find(c => c.key === selectedCollectionKey);
    return collection ? collection.getData() : [];
  };

  const handleMasterSave = () => {
    console.log("Save All Changes button clicked. Current data states:");
    console.log("Site Content:", siteContent);
    console.log("Product Features:", productFeaturesState);
    console.log("Use Cases:", useCasesState);
    console.log("Role Solutions:", roleSolutionsState);
    console.log("Industry Solutions:", industrySolutionsState);
  };
  
  const currentCollectionDef = collectionDefinitions.find(c => c.key === selectedCollectionKey);
  const selectedData = getSelectedCollectionData();

  const getItemDisplayValues = (item: CollectionItem) => {
    const displayValues: { key: string, value: any }[] = [];
    if (item.id) displayValues.push({ key: 'ID', value: item.id });
    if (item.title) displayValues.push({ key: 'Title', value: item.title });
    else if (item.name) displayValues.push({ key: 'Name', value: item.name });
    else if (item.question) displayValues.push({ key: 'Question', value: item.question });
    else if (item.planName) displayValues.push({ key: 'Plan Name', value: item.planName });
    
    if (displayValues.length === (item.id ? 1:0) ) {
        Object.entries(item).slice(0, item.id ? 2:3).forEach(([key, value]) => {
            if (key !== 'id' && (typeof value === 'string' || typeof value === 'number')) {
                displayValues.push({key, value});
            }
        });
    }
    return displayValues.slice(0,3);
  };

  const openEditModal = (item: CollectionItem, collectionKey: string) => {
    setEditingItem(JSON.parse(JSON.stringify(item))); // Deep copy
    setOriginalItem(item); // Store reference to original for finding it
    setCurrentCollectionKeyForModal(collectionKey);
    setIsModalOpen(true);
  };

  const handleModalInputChange = (fieldKey: string, value: any, parentKey: string | null = null) => {
    setEditingItem(prev => {
      if (!prev) return null;
      const newItem = { ...prev };
      if (parentKey) {
        newItem[parentKey] = { ...(newItem[parentKey] as object || {}), [fieldKey]: value };
      } else {
        newItem[fieldKey] = value;
      }
      return newItem;
    });
  };
  
  const handleModalSave = () => {
    if (!editingItem || !currentCollectionKeyForModal || !originalItem) return;

    const collectionDef = collectionDefinitions.find(c => c.key === currentCollectionKeyForModal);
    if (!collectionDef) return;

    let currentCollectionData = [...collectionDef.getData()];
    const itemIndex = currentCollectionData.findIndex(item => item.id === originalItem.id); // Assuming ID is the unique identifier

    if (itemIndex > -1) {
      // For string arrays managed as comma-separated strings in textarea
      const finalEditingItem = { ...editingItem };
      Object.keys(finalEditingItem).forEach(key => {
        if (Array.isArray(originalItem[key]) && originalItem[key].every((el: any) => typeof el === 'string') && typeof finalEditingItem[key] === 'string') {
          finalEditingItem[key] = (finalEditingItem[key] as string).split(',').map(s => s.trim()).filter(s => s);
        }
      });
      currentCollectionData[itemIndex] = finalEditingItem;
      collectionDef.setData(currentCollectionData);
    } else {
      // Fallback if ID-based find fails (e.g. no ID, or originalItem is not by reference)
      // This part might need more robust handling if items don't have stable IDs
      const refIndex = currentCollectionData.indexOf(originalItem);
      if (refIndex > -1) {
        currentCollectionData[refIndex] = editingItem;
        collectionDef.setData(currentCollectionData);
      } else {
        console.error("Failed to find item in collection to update.");
        // Potentially add the item if not found, or handle error more gracefully
      }
    }

    setIsModalOpen(false);
    setEditingItem(null);
    setOriginalItem(null);
    setCurrentCollectionKeyForModal(null);
  };

  const renderFormElement = (key: string, value: any, parentKey: string | null = null) => {
    const inputId = parentKey ? `${parentKey}-${key}` : key;
    
    if (typeof value === 'string') {
      const isLongString = value.length > 100 || key.toLowerCase().includes('description') || key.toLowerCase().includes('content') || key.toLowerCase().includes('answer');
      return (
        <div key={inputId} className="mb-4">
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
          {isLongString ? (
            <textarea
              id={inputId}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-secondary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-700 dark:text-gray-200"
              value={value}
              onChange={(e) => handleModalInputChange(key, e.target.value, parentKey)}
            />
          ) : (
            <input
              type="text"
              id={inputId}
              className="w-full px-3 py-2 border border-gray-300 dark:border-secondary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-700 dark:text-gray-200"
              value={value}
              onChange={(e) => handleModalInputChange(key, e.target.value, parentKey)}
            />
          )}
        </div>
      );
    } else if (typeof value === 'number') {
      return (
        <div key={inputId} className="mb-4">
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
          <input
            type="number"
            id={inputId}
            className="w-full px-3 py-2 border border-gray-300 dark:border-secondary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-700 dark:text-gray-200"
            value={value}
            onChange={(e) => handleModalInputChange(key, parseFloat(e.target.value) || 0, parentKey)}
          />
        </div>
      );
    } else if (typeof value === 'boolean') {
      return (
        <div key={inputId} className="mb-4 flex items-center">
          <input
            type="checkbox"
            id={inputId}
            className="h-4 w-4 text-primary-600 border-gray-300 dark:border-secondary-600 rounded focus:ring-primary-500 dark:bg-secondary-700 dark:focus:ring-offset-secondary-800"
            checked={value}
            onChange={(e) => handleModalInputChange(key, e.target.checked, parentKey)}
          />
          <label htmlFor={inputId} className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
        </div>
      );
    } else if (Array.isArray(value) && value.every(el => typeof el === 'string')) {
      // Render as comma-separated string in textarea
      return (
        <div key={inputId} className="mb-4">
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')} (comma-separated)</label>
          <textarea
            id={inputId}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-secondary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-700 dark:text-gray-200"
            value={value.join(', ')}
            onChange={(e) => handleModalInputChange(key, e.target.value, parentKey)} // Will be split on save
          />
        </div>
      );
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Support one level of nesting
      if (parentKey) { // Prevent deeper than one level for simplicity
        return <p key={inputId} className="text-sm text-gray-500 dark:text-gray-400 my-1">Nested object '{key}' too deep, not editable here.</p>;
      }
      return (
        <div key={inputId} className="mb-4 p-3 border border-gray-200 dark:border-secondary-600 rounded-md">
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
          {Object.entries(value).map(([nestedKey, nestedValue]) => renderFormElement(nestedKey, nestedValue, key))}
        </div>
      );
    }
    // Fallback for unsupported types (Icon components, functions, complex arrays/objects)
    return (
      <div key={inputId} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
        <p className="text-sm text-gray-500 dark:text-gray-400 p-2 bg-gray-100 dark:bg-secondary-700 rounded-md break-all">
          [Unsupported Type: {typeof value === 'function' ? 'Function' : JSON.stringify(value).substring(0,100) + (JSON.stringify(value).length > 100 ? '...' : '')} - Not Editable]
        </p>
      </div>
    );
  };


  return (
    <div className="p-6 bg-gray-50 dark:bg-secondary-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Content Management</h2>
        <Button variant="primary" onClick={handleMasterSave} leftIcon={<Save size={18} />}>
          Save All Changes
        </Button>
      </div>

      <div className="mb-6 relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-between w-full md:w-1/3 lg:w-1/4 px-4 py-3 bg-white dark:bg-secondary-800 border border-gray-300 dark:border-secondary-700 rounded-lg shadow-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <span>{currentCollectionDef?.displayName || 'Select Collection'}</span>
          <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {isDropdownOpen && (
          <div className="absolute z-20 mt-1 w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-secondary-800 border border-gray-300 dark:border-secondary-700 rounded-lg shadow-xl">
            {collectionDefinitions.map((collection) => (
              <button
                key={collection.key}
                onClick={() => {
                  setSelectedCollectionKey(collection.key);
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-secondary-700 first:rounded-t-lg last:rounded-b-lg"
              >
                {collection.displayName}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg border border-gray-200 dark:border-secondary-700 overflow-hidden">
        <div className="overflow-x-auto">
          {selectedData.length > 0 ? (
            <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-secondary-700">
              <thead className="bg-gray-50 dark:bg-secondary-700/50">
                <tr>
                  {getItemDisplayValues(selectedData[0]).map(val => (
                     <th key={val.key} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                       {val.key}
                     </th>
                  ))}
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-secondary-600">
                {selectedData.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50 dark:hover:bg-secondary-700/30 transition-colors">
                    {getItemDisplayValues(item).map(val => (
                       <td key={val.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                         {typeof val.value === 'object' ? JSON.stringify(val.value) : String(val.value)}
                       </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="outline" size="sm" leftIcon={<Edit2 size={14}/>} onClick={() => openEditModal(item, selectedCollectionKey)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <p className="text-xl">No items in this collection or collection not found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-secondary-700">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Edit Item from <span className="text-primary-600">{collectionDefinitions.find(c => c.key === currentCollectionKeyForModal)?.displayName}</span>
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <XCircle size={24} className="text-gray-500 dark:text-gray-400" />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <form>
                {Object.entries(editingItem).map(([key, value]) => renderFormElement(key, value))}
              </form>
            </div>
            <div className="flex justify-end items-center p-6 border-t border-gray-200 dark:border-secondary-700 space-x-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleModalSave} leftIcon={<Save size={16}/>}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManager;