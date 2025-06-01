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
  Settings
} from 'lucide-react';
import Button from '../ui/Button';
import { HeroSection, HeroCTA, HeroFloatingElement } from '../../types/hero';

const API_BASE_URL = 'http://localhost:3001/api';

interface HeroApiResponse {
  success: boolean;
  data: HeroSection;
  error?: string;
  details?: string[];
}

interface HeroListResponse {
  success: boolean;
  data: {
    heroSections: HeroSection[];
    pagination: {
      current: number;
      total: number;
      totalItems: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  error?: string;
}

const HeroManager: React.FC = () => {
  const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
  const [currentHero, setCurrentHero] = useState<HeroSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingHero, setEditingHero] = useState<Partial<HeroSection> | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'edit' | 'preview'>('list');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load hero sections on component mount
  useEffect(() => {
    fetchHeroSections();
    fetchCurrentHero();
  }, []);

  const fetchHeroSections = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hero/all`);
      const result: HeroListResponse = await response.json();
      
      if (result.success) {
        setHeroSections(result.data.heroSections);
      } else {
        setError(result.error || 'Failed to fetch hero sections');
      }
    } catch (err) {
      setError('Error fetching hero sections');
      console.error('Error:', err);
    }
  };

  const fetchCurrentHero = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/hero`);
      const result: HeroApiResponse = await response.json();
      
      if (result.success) {
        setCurrentHero(result.data);
      } else {
        setError(result.error || 'Failed to fetch current hero');
      }
    } catch (err) {
      setError('Error fetching current hero');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveHero = async (heroData: Partial<HeroSection>) => {
    try {
      setIsLoading(true);
      const url = heroData._id ? `${API_BASE_URL}/hero/${heroData._id}` : `${API_BASE_URL}/hero`;
      const method = heroData._id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroData),
      });

      const result: HeroApiResponse = await response.json();
      
      if (result.success) {
        setSuccessMessage(`Hero section ${heroData._id ? 'updated' : 'created'} successfully`);
        setIsEditing(false);
        setEditingHero(null);
        await fetchHeroSections();
        if (result.data.isActive) {
          await fetchCurrentHero();
        }
        setActiveTab('list');
      } else {
        setError(result.error || 'Failed to save hero section');
      }
    } catch (err) {
      setError('Error saving hero section');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHero = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero section?')) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/hero/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage('Hero section deleted successfully');
        await fetchHeroSections();
        await fetchCurrentHero();
      } else {
        setError(result.error || 'Failed to delete hero section');
      }
    } catch (err) {
      setError('Error deleting hero section');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const activateHero = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/hero/${id}/activate`, {
        method: 'PATCH',
      });

      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage('Hero section activated successfully');
        await fetchHeroSections();
        await fetchCurrentHero();
      } else {
        setError(result.error || 'Failed to activate hero section');
      }
    } catch (err) {
      setError('Error activating hero section');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (hero?: HeroSection) => {
    if (hero) {
      setEditingHero({ ...hero });
    } else {
      // Create new hero with default values
      setEditingHero({
        badge: '',
        title: '',
        titleHighlight: '',
        subtitle: '',
        description: '',
        primaryCTA: {
          text: 'Get Started',
          url: '/signup',
          style: 'primary'
        },
        secondaryCTA: {
          text: 'Learn More',
          url: '/about',
          style: 'outline'
        },
        additionalInfo: '',
        heroImage: '',
        floatingElements: [],
        stats: [],
        features: [],
        theme: {
          particles: true,
          animations: true,
          gradientEffects: true
        },
        isActive: false,
        version: '1.0.0'
      });
    }
    setIsEditing(true);
    setActiveTab('edit');
  };

  const updateEditingHero = (field: keyof HeroSection, value: any) => {
    setEditingHero(prev => prev ? { ...prev, [field]: value } : null);
  };

  const updateNestedField = (parent: keyof HeroSection, field: string, value: any) => {
    setEditingHero(prev => {
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

  const addFloatingElement = () => {
    setEditingHero(prev => {
      if (!prev) return null;
      return {
        ...prev,
        floatingElements: [
          ...(prev.floatingElements || []),
          {
            text: '',
            type: 'badge' as const,
            position: 'top-right',
            color: 'primary',
            icon: 'circle'
          }
        ]
      };
    });
  };

  const updateFloatingElement = (index: number, field: string, value: any) => {
    setEditingHero(prev => {
      if (!prev || !prev.floatingElements) return prev;
      const updated = [...prev.floatingElements];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, floatingElements: updated };
    });
  };

  const removeFloatingElement = (index: number) => {
    setEditingHero(prev => {
      if (!prev || !prev.floatingElements) return prev;
      return {
        ...prev,
        floatingElements: prev.floatingElements.filter((_, i) => i !== index)
      };
    });
  };

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const renderHeroList = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Hero Sections ({heroSections.length})
        </h3>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            leftIcon={<RefreshCw size={18} />}
            onClick={() => { fetchHeroSections(); fetchCurrentHero(); }}
          >
            Refresh
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={18} />}
            onClick={() => startEditing()}
          >
            Create New
          </Button>
        </div>
      </div>

      {/* Current Active Hero */}
      {currentHero && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-300 flex items-center">
                <Star className="mr-2" size={16} />
                Currently Active Hero Section
              </h4>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                {currentHero.title} {currentHero.titleHighlight} • v{currentHero.version}
              </p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              leftIcon={<Edit2 size={14} />}
              onClick={() => startEditing(currentHero)}
            >
              Edit
            </Button>
          </div>
        </div>
      )}

      {/* Hero Sections List */}
      <div className="grid gap-4">
        {heroSections.map((hero) => (
          <div 
            key={hero._id} 
            className={`border rounded-lg p-4 ${
              hero.isActive 
                ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {hero.title} {hero.titleHighlight}
                  </h4>
                  {hero.isActive && (
                    <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full">
                      Active
                    </span>
                  )}
                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                    v{hero.version}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {hero.description}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 space-x-4">
                  <span>Created: {new Date(hero.createdAt || '').toLocaleDateString()}</span>
                  <span>Updated: {new Date(hero.updatedAt || '').toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    leftIcon={<Eye size={14} />}
                    onClick={() => {
                      setEditingHero(hero);
                      setActiveTab('preview');
                    }}
                  >
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    leftIcon={<Edit2 size={14} />}
                    onClick={() => startEditing(hero)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="flex space-x-2">
                  {!hero.isActive && (
                    <Button 
                      size="sm" 
                      variant="primary"
                      leftIcon={<CheckCircle size={14} />}
                      onClick={() => activateHero(hero._id!)}
                    >
                      Activate
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    leftIcon={<Trash2 size={14} />}
                    onClick={() => deleteHero(hero._id!)}
                    disabled={hero.isActive}
                    className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {heroSections.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No hero sections found</p>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={18} />}
            onClick={() => startEditing()}
          >
            Create Your First Hero Section
          </Button>
        </div>
      )}
    </div>
  );

  const renderHeroEditor = () => {
    if (!editingHero) return null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {editingHero._id ? 'Edit Hero Section' : 'Create New Hero Section'}
          </h3>
          <div className="flex space-x-3">
            <Button 
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setEditingHero(null);
                setActiveTab('list');
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              leftIcon={<Save size={18} />}
              onClick={() => saveHero(editingHero)}
              disabled={isLoading}
            >
              Save Hero
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">Basic Information</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Badge Text
              </label>
              <input
                type="text"
                value={editingHero.badge || ''}
                onChange={(e) => updateEditingHero('badge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="AI-Powered Content Generation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Main Title
              </label>
              <input
                type="text"
                value={editingHero.title || ''}
                onChange={(e) => updateEditingHero('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Create"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Highlighted Title Part
              </label>
              <input
                type="text"
                value={editingHero.titleHighlight || ''}
                onChange={(e) => updateEditingHero('titleHighlight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="exceptional content"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={editingHero.subtitle || ''}
                onChange={(e) => updateEditingHero('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="in seconds"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={editingHero.description || ''}
                onChange={(e) => updateEditingHero('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Leverage AI to produce high-quality, engaging content 10x faster than traditional methods."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Additional Info
              </label>
              <input
                type="text"
                value={editingHero.additionalInfo || ''}
                onChange={(e) => updateEditingHero('additionalInfo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="No credit card required • Free 14-day trial"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hero Image URL
              </label>
              <input
                type="url"
                value={editingHero.heroImage || ''}
                onChange={(e) => updateEditingHero('heroImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="https://images.pexels.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Version
              </label>
              <input
                type="text"
                value={editingHero.version || ''}
                onChange={(e) => updateEditingHero('version', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="1.0.0"
              />
            </div>
          </div>

          {/* CTAs and Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">Call-to-Actions & Settings</h4>
            
            {/* Primary CTA */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-md p-4">
              <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Primary CTA</h5>
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingHero.primaryCTA?.text || ''}
                  onChange={(e) => updateNestedField('primaryCTA', 'text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Start Free Trial"
                />
                <input
                  type="url"
                  value={editingHero.primaryCTA?.url || ''}
                  onChange={(e) => updateNestedField('primaryCTA', 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="/signup"
                />
                <select
                  value={editingHero.primaryCTA?.style || 'primary'}
                  onChange={(e) => updateNestedField('primaryCTA', 'style', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                </select>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-md p-4">
              <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Secondary CTA</h5>
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingHero.secondaryCTA?.text || ''}
                  onChange={(e) => updateNestedField('secondaryCTA', 'text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Watch Demo"
                />
                <input
                  type="url"
                  value={editingHero.secondaryCTA?.url || ''}
                  onChange={(e) => updateNestedField('secondaryCTA', 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="/demo"
                />
                <select
                  value={editingHero.secondaryCTA?.style || 'outline'}
                  onChange={(e) => updateNestedField('secondaryCTA', 'style', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                </select>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-md p-4">
              <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Theme Settings</h5>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingHero.theme?.particles || false}
                    onChange={(e) => updateNestedField('theme', 'particles', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enable Particles</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingHero.theme?.animations || false}
                    onChange={(e) => updateNestedField('theme', 'animations', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enable Animations</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingHero.theme?.gradientEffects || false}
                    onChange={(e) => updateNestedField('theme', 'gradientEffects', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enable Gradient Effects</span>
                </label>
              </div>
            </div>

            {/* Status */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-md p-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingHero.isActive || false}
                  onChange={(e) => updateEditingHero('isActive', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Set as Active Hero Section</span>
              </label>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">Floating Elements</h4>
            <Button 
              size="sm" 
              variant="outline" 
              leftIcon={<Plus size={16} />}
              onClick={addFloatingElement}
            >
              Add Element
            </Button>
          </div>
          
          {editingHero.floatingElements?.map((element, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-md p-4">
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-medium text-gray-700 dark:text-gray-300">Element {index + 1}</h5>
                <Button 
                  size="sm" 
                  variant="outline"
                  leftIcon={<Trash2 size={14} />}
                  onClick={() => removeFloatingElement(index)}
                  className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={element.text}
                  onChange={(e) => updateFloatingElement(index, 'text', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Element text"
                />
                <select
                  value={element.type}
                  onChange={(e) => updateFloatingElement(index, 'type', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="badge">Badge</option>
                  <option value="indicator">Indicator</option>
                  <option value="feature">Feature</option>
                </select>
                <select
                  value={element.position}
                  onChange={(e) => updateFloatingElement(index, 'position', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="center-left">Center Left</option>
                </select>
                <select
                  value={element.color}
                  onChange={(e) => updateFloatingElement(index, 'color', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="primary">Primary</option>
                  <option value="success">Success</option>
                  <option value="accent">Accent</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHeroPreview = () => {
    if (!editingHero) return null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Preview Hero Section
          </h3>
          <Button 
            variant="outline"
            onClick={() => setActiveTab('edit')}
          >
            Back to Edit
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
          <div className="text-center max-w-3xl mx-auto">
            {editingHero.badge && (
              <span className="inline-block bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
                {editingHero.badge}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100">
              {editingHero.title}
              {editingHero.titleHighlight && (
                <span className="text-primary-500 dark:text-primary-400"> {editingHero.titleHighlight}</span>
              )}
              {editingHero.subtitle && ` ${editingHero.subtitle}`}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {editingHero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              {editingHero.primaryCTA && (
                <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  {editingHero.primaryCTA.text}
                </button>
              )}
              {editingHero.secondaryCTA && (
                <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {editingHero.secondaryCTA.text}
                </button>
              )}
            </div>
            
            {editingHero.additionalInfo && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {editingHero.additionalInfo}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading && !heroSections.length) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Hero Section Manager</h2>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'list' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('list')}
          >
            List
          </Button>
          {isEditing && (
            <>
              <Button
                variant={activeTab === 'edit' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('edit')}
              >
                Edit
              </Button>
              <Button
                variant={activeTab === 'preview' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button onClick={clearMessages} className="text-red-500 hover:text-red-700">
              <XCircle size={20} />
            </button>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <p className="text-green-800 dark:text-green-200">{successMessage}</p>
            <button onClick={clearMessages} className="text-green-500 hover:text-green-700">
              <XCircle size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {activeTab === 'list' && renderHeroList()}
      {activeTab === 'edit' && renderHeroEditor()}
      {activeTab === 'preview' && renderHeroPreview()}
    </div>
  );
};

export default HeroManager; 