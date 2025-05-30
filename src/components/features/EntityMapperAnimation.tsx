import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Building2, Globe, Calendar, DollarSign, Tag, Eye, BarChart3, Network, Zap } from 'lucide-react';

const EntityMapperAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'detecting' | 'mapping' | 'complete'>('analyzing');
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<string[]>(['person', 'organization', 'location']);
  const [detectionProgress, setDetectionProgress] = useState(0);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [detectedEntities, setDetectedEntities] = useState<any[]>([]);
  const [entityMetrics, setEntityMetrics] = useState({
    totalEntities: 0,
    people: 0,
    organizations: 0,
    locations: 0,
    dates: 0,
    money: 0,
    relationships: 0
  });

  const entityTypes = [
    { 
      id: 'person', 
      label: 'People', 
      icon: Users,
      color: 'bg-blue-500',
      description: 'Names of individuals',
      examples: 'John Smith, Dr. Sarah Chen',
      count: 0
    },
    { 
      id: 'organization', 
      label: 'Organizations', 
      icon: Building2,
      color: 'bg-purple-500',
      description: 'Companies and institutions',
      examples: 'Microsoft, Harvard University',
      count: 0
    },
    { 
      id: 'location', 
      label: 'Locations', 
      icon: Globe,
      color: 'bg-green-500',
      description: 'Places and addresses',
      examples: 'New York, 123 Main St',
      count: 0
    },
    { 
      id: 'date', 
      label: 'Dates', 
      icon: Calendar,
      color: 'bg-indigo-500',
      description: 'Temporal references',
      examples: 'January 15, 2024',
      count: 0
    },
    { 
      id: 'money', 
      label: 'Financial', 
      icon: DollarSign,
      color: 'bg-emerald-500',
      description: 'Monetary amounts',
      examples: '$50,000, €25.99',
      count: 0
    },
    { 
      id: 'misc', 
      label: 'Other', 
      icon: Tag,
      color: 'bg-gray-500',
      description: 'Products, technologies',
      examples: 'iPhone, React.js',
      count: 0
    }
  ];

  const sampleEntities = [
    {
      id: 1,
      text: 'Sarah Johnson',
      type: 'person',
      category: 'CEO',
      startPos: 23,
      endPos: 35,
      confidence: 0.98,
      context: 'Chief Executive Officer',
      relationships: ['TechCorp Inc.', 'San Francisco']
    },
    {
      id: 2,
      text: 'TechCorp Inc.',
      type: 'organization',
      category: 'Technology Company',
      startPos: 45,
      endPos: 57,
      confidence: 0.95,
      context: 'Technology corporation',
      relationships: ['Sarah Johnson', 'San Francisco', '$2.5M']
    },
    {
      id: 3,
      text: 'San Francisco',
      type: 'location',
      category: 'City',
      startPos: 78,
      endPos: 91,
      confidence: 0.92,
      context: 'Business headquarters location',
      relationships: ['TechCorp Inc.', 'Sarah Johnson']
    },
    {
      id: 4,
      text: 'January 15, 2024',
      type: 'date',
      category: 'Contract Date',
      startPos: 103,
      endPos: 118,
      confidence: 0.99,
      context: 'Agreement execution date',
      relationships: ['TechCorp Inc.']
    },
    {
      id: 5,
      text: '$2.5M',
      type: 'money',
      category: 'Investment Amount',
      startPos: 145,
      endPos: 150,
      confidence: 0.97,
      context: 'Series A funding amount',
      relationships: ['TechCorp Inc.', 'January 15, 2024']
    },
    {
      id: 6,
      text: 'React.js',
      type: 'misc',
      category: 'Technology',
      startPos: 167,
      endPos: 174,
      confidence: 0.89,
      context: 'JavaScript framework',
      relationships: ['TechCorp Inc.']
    }
  ];

  const sampleText = "Following the meeting with Sarah Johnson, CEO of TechCorp Inc. based in San Francisco on January 15, 2024, we discussed the $2.5M Series A funding round. The company specializes in React.js development and has shown remarkable growth in the enterprise market.";

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('detecting'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('mapping'), 6000);
    const timer3 = setTimeout(() => setCurrentStep('complete'), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'detecting') {
      const interval = setInterval(() => {
        setDetectionProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 80);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'complete') {
      const filteredEntities = sampleEntities.filter(entity => 
        selectedEntityTypes.includes(entity.type)
      );
      
      setDetectedEntities(filteredEntities);

      const metricsInterval = setInterval(() => {
        setEntityMetrics(prev => {
          const people = filteredEntities.filter(e => e.type === 'person').length;
          const organizations = filteredEntities.filter(e => e.type === 'organization').length;
          const locations = filteredEntities.filter(e => e.type === 'location').length;
          const dates = filteredEntities.filter(e => e.type === 'date').length;
          const money = filteredEntities.filter(e => e.type === 'money').length;
          const totalEntities = filteredEntities.length;
          
          return {
            totalEntities: Math.min(prev.totalEntities + 1, totalEntities),
            people: Math.min(prev.people + 1, people),
            organizations: Math.min(prev.organizations + 1, organizations),
            locations: Math.min(prev.locations + 1, locations),
            dates: Math.min(prev.dates + 1, dates),
            money: Math.min(prev.money + 1, money),
            relationships: Math.min(prev.relationships + 1, 8)
          };
        });
      }, 200);

      const timer = setTimeout(() => clearInterval(metricsInterval), 2500);
      return () => {
        clearInterval(metricsInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep, selectedEntityTypes]);

  const handleEntityTypeToggle = (typeId: string) => {
    setSelectedEntityTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const getEntityTypeById = (id: string) => {
    return entityTypes.find(type => type.id === id);
  };

  const getEntityColor = (type: string) => {
    const entityType = getEntityTypeById(type);
    return entityType ? entityType.color : 'bg-gray-500';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.95) return 'text-green-600';
    if (confidence >= 0.90) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const renderHighlightedText = () => {
    if (currentStep !== 'complete') return sampleText;

    let highlightedText = sampleText;
    const sortedEntities = [...detectedEntities].sort((a, b) => b.startPos - a.startPos);

    sortedEntities.forEach(entity => {
      const entityType = getEntityTypeById(entity.type);
      const colorClass = entityType?.color.replace('bg-', 'bg-').replace('-500', '-200');
      
      const before = highlightedText.substring(0, entity.startPos);
      const entityText = highlightedText.substring(entity.startPos, entity.endPos);
      const after = highlightedText.substring(entity.endPos);
      
      highlightedText = before + 
        `<span class="${colorClass} px-1 rounded cursor-pointer hover:scale-105 transition-transform" 
         onclick="selectEntity(${entity.id})">${entityText}</span>` + 
        after;
    });

    return highlightedText;
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-orange-900 dark:via-red-800 dark:to-pink-800 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-700 dark:to-red-700 transform -rotate-12 scale-150"></div>
      </div>

      {/* Entity Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 dark:border-secondary-700/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100 dark:border-secondary-700">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-orange-600 dark:text-warning-400" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Entity Analytics</span>
          </div>
        </div>

        <div className="p-3">
          {currentStep === 'complete' ? (
            <div className="space-y-2">
              {/* Total Entities */}
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600 dark:text-warning-400">
                  {entityMetrics.totalEntities}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Total Entities</div>
              </div>

              {/* Entity Breakdown */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-blue-500 dark:text-accent-400" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">People</span>
                  </div>
                  <span className="text-xs font-medium text-blue-600 dark:text-accent-400">
                    {entityMetrics.people}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-purple-500 dark:text-primary-400" /> {/* Assuming purple is primary-like */}
                    <span className="text-xs text-gray-700 dark:text-gray-300">Orgs</span>
                  </div>
                  <span className="text-xs font-medium text-purple-600 dark:text-primary-400">
                    {entityMetrics.organizations}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-green-500 dark:text-success-400" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">Places</span>
                  </div>
                  <span className="text-xs font-medium text-green-600 dark:text-success-400">
                    {entityMetrics.locations}
                  </span>
                </div>
              </div>

              {/* Relationships */}
              <div className="pt-2 border-t border-gray-100 dark:border-secondary-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Links:</span>
                  <span className="px-1 py-0.5 bg-orange-100 dark:bg-orange-700/30 text-orange-700 dark:text-orange-300 rounded">
                    {entityMetrics.relationships}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-20">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 mx-auto mb-2"
                >
                  <MapPin className="w-full h-full text-orange-500 dark:text-warning-400" />
                </motion.div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Scanning...</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Document Analysis Phase */}
      <AnimatePresence>
        {currentStep === 'analyzing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 dark:border-secondary-700/50"
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity }
                }}
              >
                <Network className="w-8 h-8 text-orange-500 dark:text-warning-400" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Analyzing Document Structure...</div>
              <div className="space-y-2 w-40">
                {['Text preprocessing', 'Language analysis', 'Pattern recognition'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.6, duration: 0.8 }}
                    className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 dark:from-orange-600 dark:to-red-700 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entity Type Selection */}
      <AnimatePresence>
        {currentStep === 'detecting' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-52 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50 dark:border-secondary-700/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-orange-500 dark:text-warning-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Entity Types</span>
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto">
              {entityTypes.map((type, i) => {
                const isSelected = selectedEntityTypes.includes(type.id);
                const IconComponent = type.icon;
                const darkColor = type.color.replace('-500', '-600');
                
                return (
                  <motion.button
                    key={type.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleEntityTypeToggle(type.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${type.color} dark:${darkColor} text-white shadow-lg scale-105`
                        : 'bg-gray-50 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-3 h-3 ${isSelected ? 'text-white' : type.color.replace('bg-','text-')} dark:${isSelected ? 'text-white' : type.color.replace('bg-','text-').replace('-500','-400')}`} />
                        <span className="text-xs font-medium">{type.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`text-xs px-1 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-secondary-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          {type.count}
                        </span>
                        <div className={`w-3 h-3 rounded border-2 ${
                          isSelected 
                            ? 'bg-white border-white' 
                            : 'border-gray-300 dark:border-gray-500'
                        }`}>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-full h-full bg-current rounded-full"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      {type.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entity Detection Progress */}
      <AnimatePresence>
        {currentStep === 'detecting' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 dark:border-secondary-700/50 w-72"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-orange-500 dark:text-warning-400" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Entity Detection</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">🔍 Scanning for {selectedEntityTypes.length} entity types...</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Detection Progress</span>
                <span>{detectionProgress.toFixed(0)}%</span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-orange-400 to-red-500 dark:from-orange-600 dark:to-red-700 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${detectionProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Detection Steps */}
              <div className="space-y-2">
                {['Named entity recognition', 'Entity classification', 'Confidence scoring', 'Relationship mapping'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: detectionProgress > i * 25 ? 1 : 0.3,
                      x: detectionProgress > i * 25 ? 0 : -10
                    }}
                    className="flex items-center gap-2 text-xs"
                  >
                    {detectionProgress > (i + 1) * 25 ? (
                      <div className="w-3 h-3 bg-green-500 dark:bg-success-400 rounded-full" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 dark:border-gray-500 rounded-full" />
                    )}
                    <span className={detectionProgress > i * 25 ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entity Mapping View */}
      <AnimatePresence>
        {currentStep === 'mapping' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 dark:border-secondary-700/50 w-80"
          >
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-6 h-6 text-orange-500 dark:text-warning-400" />
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Entity Relationship Mapping</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Building entity connections and context</div>
              </div>
            </div>

            {/* Entity Relationship Preview */}
            <div className="bg-gray-50 dark:bg-secondary-700 rounded-lg p-3 mb-4 max-h-32 overflow-auto">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Detected Relationships:</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 dark:bg-accent-500 rounded-full"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">Sarah Johnson → CEO → TechCorp Inc.</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 dark:bg-primary-500 rounded-full"></div> {/* Assuming purple is primary-like */}
                  <span className="text-xs text-gray-700 dark:text-gray-300">TechCorp Inc. → Located in → San Francisco</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-600 rounded-full"></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">$2.5M → Funding for → TechCorp Inc.</span>
                </div>
              </div>
            </div>

            {/* Entity Count Preview */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-blue-50 dark:bg-accent-700/20 rounded">
                <div className="text-xs font-bold text-blue-600 dark:text-accent-300">1</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">People</div>
              </div>
              <div className="text-center p-2 bg-purple-50 dark:bg-primary-700/20 rounded"> {/* Assuming purple is primary-like */}
                <div className="text-xs font-bold text-purple-600 dark:text-primary-300">1</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Orgs</div>
              </div>
              <div className="text-center p-2 bg-green-50 dark:bg-success-700/20 rounded">
                <div className="text-xs font-bold text-green-600 dark:text-success-300">1</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Places</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entity Results */}
      <AnimatePresence>
        {currentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 dark:border-secondary-700/50 overflow-hidden"
          >
            {/* Result Controls */}
            <div className="p-3 border-b border-gray-100 dark:border-secondary-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600 dark:text-warning-400" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Entity Map</span>
                  <span className="text-xs px-2 py-1 rounded bg-orange-500 dark:bg-orange-600 text-white">
                    {entityMetrics.totalEntities} entities
                  </span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-orange-500 dark:bg-orange-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Export
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>

              {/* Entity Type Metrics */}
              <div className="grid grid-cols-6 gap-2">
                {entityTypes.map((type, i) => {
                  const count = entityMetrics[type.id as keyof typeof entityMetrics] as number || 0;
                  const IconComponent = type.icon;
                  const darkTextColor = type.color.replace('bg-', 'text-').replace('-500', '-400');
                  
                  return (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div className="flex items-center justify-center mb-1">
                        <IconComponent className={`w-3 h-3 ${type.color.replace('bg-', 'text-')} dark:${darkTextColor}`} />
                      </div>
                      <div className={`text-xs font-bold ${type.color.replace('bg-', 'text-')} dark:${darkTextColor}`}>
                        {count}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Highlighted Text Display */}
            <div className="p-3 max-h-24 overflow-auto">
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Document with Detected Entities:</div>
                <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-secondary-700 p-2 rounded">
                  Following the meeting with{' '}
                  <span className="bg-blue-200 dark:bg-accent-700/40 px-1 rounded cursor-pointer hover:bg-blue-300 dark:hover:bg-accent-600/50 transition-colors"
                        onClick={() => setSelectedEntity(sampleEntities[0])}>
                    Sarah Johnson
                  </span>
                  , CEO of{' '}
                  <span className="bg-purple-200 dark:bg-primary-700/40 px-1 rounded cursor-pointer hover:bg-purple-300 dark:hover:bg-primary-600/50 transition-colors" // Assuming purple is primary-like
                        onClick={() => setSelectedEntity(sampleEntities[1])}>
                    TechCorp Inc.
                  </span>
                  {' '}based in{' '}
                  <span className="bg-green-200 dark:bg-success-700/40 px-1 rounded cursor-pointer hover:bg-green-300 dark:hover:bg-success-600/50 transition-colors"
                        onClick={() => setSelectedEntity(sampleEntities[2])}>
                    San Francisco
                  </span>
                  {' '}on{' '}
                  <span className="bg-indigo-200 dark:bg-indigo-700/40 px-1 rounded cursor-pointer hover:bg-indigo-300 dark:hover:bg-indigo-600/50 transition-colors"
                        onClick={() => setSelectedEntity(sampleEntities[3])}>
                    January 15, 2024
                  </span>
                  , we discussed the{' '}
                  <span className="bg-emerald-200 dark:bg-emerald-700/40 px-1 rounded cursor-pointer hover:bg-emerald-300 dark:hover:bg-emerald-600/50 transition-colors"
                        onClick={() => setSelectedEntity(sampleEntities[4])}>
                    $2.5M
                  </span>
                  {' '}Series A funding round. The company specializes in{' '}
                  <span className="bg-gray-200 dark:bg-secondary-600/40 px-1 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-secondary-500/50 transition-colors"
                        onClick={() => setSelectedEntity(sampleEntities[5])}>
                    React.js
                  </span>
                  {' '}development and has shown remarkable growth.
                </div>

                {/* Entity Detail Panel */}
                <AnimatePresence>
                  {selectedEntity && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-white dark:bg-secondary-700 border border-gray-200 dark:border-secondary-600 rounded-lg p-2 mt-2"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getEntityColor(selectedEntity.type).replace('-500', '-600')} dark:${getEntityColor(selectedEntity.type).replace('-500','-500')} text-white`}>
                            {selectedEntity.text}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {selectedEntity.type} • {selectedEntity.category}
                          </span>
                        </div>
                        <span className={`text-xs font-medium ${getConfidenceColor(selectedEntity.confidence).replace('text-','dark:text-')}`}>
                          {(selectedEntity.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">{selectedEntity.context}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Related: {selectedEntity.relationships.join(', ')}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Indicator */}
      {currentStep === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-orange-500 dark:bg-orange-600 text-white p-2 rounded-full shadow-lg"
        >
          <MapPin className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Entity Particles */}
      {currentStep === 'complete' && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -30, -60],
                x: [0, Math.random() * 20 - 10],
              }}
              transition={{
                duration: 3.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 5,
              }}
              style={{
                left: `${25 + i * 10}%`,
                top: `75%`,
              }}
            >
              {['👤', '🏢', '🌍', '📅', '💰', '🔗'][i]}
            </motion.div>
          ))}
        </>
      )}

      {/* Connection Lines */}
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: currentStep === 'complete' ? 1 : 0, 
          opacity: currentStep === 'complete' ? 0.3 : 0 
        }}
        transition={{ duration: 1.5 }}
        className="absolute top-28 left-48 w-16 h-12"
        viewBox="0 0 64 48"
      >
        <motion.path
          d="M 0 24 Q 32 12 64 24"
          stroke="url(#entityGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="entityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default EntityMapperAnimation; 