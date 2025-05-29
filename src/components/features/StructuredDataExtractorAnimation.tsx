import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileBarChart, Calendar, DollarSign, MapPin, Mail, Phone, Eye, CheckCircle, AlertTriangle, BarChart3, Zap, Database, Hash } from 'lucide-react';

const StructuredDataExtractorAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'scanning' | 'detecting' | 'extracting' | 'complete'>('scanning');
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>(['date', 'money', 'location']);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);
  const [extractedData, setExtractedData] = useState<any[]>([]);
  const [dataMetrics, setDataMetrics] = useState({
    totalDataPoints: 0,
    dates: 0,
    money: 0,
    locations: 0,
    contacts: 0,
    measurements: 0,
    validationScore: 0
  });

  const dataTypes = [
    { 
      id: 'date', 
      label: 'Dates', 
      icon: Calendar,
      color: 'bg-blue-500',
      description: 'Dates and timestamps',
      examples: 'Jan 15, 2024, 12/25/2023',
      count: 0
    },
    { 
      id: 'money', 
      label: 'Financial', 
      icon: DollarSign,
      color: 'bg-green-500',
      description: 'Monetary amounts',
      examples: '$1,500, €99.99, £45.50',
      count: 0
    },
    { 
      id: 'location', 
      label: 'Locations', 
      icon: MapPin,
      color: 'bg-red-500',
      description: 'Places and addresses',
      examples: 'New York, 123 Main St',
      count: 0
    },
    { 
      id: 'contact', 
      label: 'Contacts', 
      icon: Mail,
      color: 'bg-purple-500',
      description: 'Email and phone numbers',
      examples: 'user@email.com, (555) 123-4567',
      count: 0
    },
    { 
      id: 'measurement', 
      label: 'Measurements', 
      icon: BarChart3,
      color: 'bg-orange-500',
      description: 'Units and quantities',
      examples: '5.2 kg, 120 mph, 15%',
      count: 0
    },
    { 
      id: 'identifier', 
      label: 'Identifiers', 
      icon: Hash,
      color: 'bg-indigo-500',
      description: 'IDs and codes',
      examples: 'SKU-12345, #ABC-789',
      count: 0
    }
  ];

  const sampleDataPoints = [
    {
      id: 1,
      text: 'January 15, 2024',
      type: 'date',
      category: 'Contract Date',
      value: '2024-01-15',
      confidence: 0.98,
      context: 'Agreement execution date',
      format: 'MMMM DD, YYYY',
      validation: 'valid'
    },
    {
      id: 2,
      text: '$2,500,000',
      type: 'money',
      category: 'Investment Amount',
      value: 2500000,
      confidence: 0.95,
      context: 'Series A funding amount',
      format: 'USD Currency',
      validation: 'valid'
    },
    {
      id: 3,
      text: 'San Francisco, CA 94105',
      type: 'location',
      category: 'Business Address',
      value: { city: 'San Francisco', state: 'CA', zip: '94105' },
      confidence: 0.92,
      context: 'Company headquarters',
      format: 'City, State ZIP',
      validation: 'valid'
    },
    {
      id: 4,
      text: 'sarah.johnson@techcorp.com',
      type: 'contact',
      category: 'Email Address',
      value: 'sarah.johnson@techcorp.com',
      confidence: 0.99,
      context: 'CEO contact information',
      format: 'Email',
      validation: 'valid'
    },
    {
      id: 5,
      text: '(555) 123-4567',
      type: 'contact',
      category: 'Phone Number',
      value: '+15551234567',
      confidence: 0.94,
      context: 'Office phone number',
      format: 'US Phone',
      validation: 'valid'
    },
    {
      id: 6,
      text: '150 employees',
      type: 'measurement',
      category: 'Count',
      value: { amount: 150, unit: 'employees' },
      confidence: 0.89,
      context: 'Company size metric',
      format: 'Number + Unit',
      validation: 'valid'
    },
    {
      id: 7,
      text: 'SKU-TC-2024-001',
      type: 'identifier',
      category: 'Product SKU',
      value: 'SKU-TC-2024-001',
      confidence: 0.87,
      context: 'Product identifier code',
      format: 'SKU Pattern',
      validation: 'valid'
    },
    {
      id: 8,
      text: '13% growth rate',
      type: 'measurement',
      category: 'Percentage',
      value: { amount: 13, unit: 'percent' },
      confidence: 0.91,
      context: 'Annual growth metric',
      format: 'Percentage',
      validation: 'valid'
    }
  ];

  const sampleText = "Following the meeting on January 15, 2024, TechCorp Inc. secured $2,500,000 in Series A funding. The company, headquartered at San Francisco, CA 94105, employs 150 employees and has achieved a 13% growth rate. For more information, contact CEO Sarah Johnson at sarah.johnson@techcorp.com or (555) 123-4567. Product catalog includes SKU-TC-2024-001 and related items.";

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('detecting'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('extracting'), 6000);
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
        setExtractionProgress(prev => {
          const newProgress = prev + 2.2;
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
      const filteredData = sampleDataPoints.filter(dataPoint => 
        selectedDataTypes.includes(dataPoint.type)
      );
      
      setExtractedData(filteredData);

      const metricsInterval = setInterval(() => {
        setDataMetrics(prev => {
          const dates = filteredData.filter(d => d.type === 'date').length;
          const money = filteredData.filter(d => d.type === 'money').length;
          const locations = filteredData.filter(d => d.type === 'location').length;
          const contacts = filteredData.filter(d => d.type === 'contact').length;
          const measurements = filteredData.filter(d => d.type === 'measurement').length;
          const totalDataPoints = filteredData.length;
          
          const avgConfidence = filteredData.reduce((sum, dp) => sum + dp.confidence, 0) / filteredData.length || 0;
          const validationScore = Math.round(avgConfidence * 100);
          
          return {
            totalDataPoints: Math.min(prev.totalDataPoints + 1, totalDataPoints),
            dates: Math.min(prev.dates + 1, dates),
            money: Math.min(prev.money + 1, money),
            locations: Math.min(prev.locations + 1, locations),
            contacts: Math.min(prev.contacts + 1, contacts),
            measurements: Math.min(prev.measurements + 1, measurements),
            validationScore: Math.min(prev.validationScore + 3, validationScore)
          };
        });
      }, 200);

      const timer = setTimeout(() => clearInterval(metricsInterval), 2500);
      return () => {
        clearInterval(metricsInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep, selectedDataTypes]);

  const handleDataTypeToggle = (typeId: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const getDataTypeById = (id: string) => {
    return dataTypes.find(type => type.id === id);
  };

  const getDataColor = (type: string) => {
    const dataType = getDataTypeById(type);
    return dataType ? dataType.color : 'bg-gray-500';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.95) return 'text-green-600';
    if (confidence >= 0.90) return 'text-yellow-600';
    if (confidence >= 0.85) return 'text-orange-600';
    return 'text-red-600';
  };

  const getValidationIcon = (validation: string) => {
    switch (validation) {
      case 'valid': return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-3 h-3 text-yellow-500" />;
      case 'invalid': return <AlertTriangle className="w-3 h-3 text-red-500" />;
      default: return <CheckCircle className="w-3 h-3 text-green-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    if (score >= 75) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-400 to-cyan-400 transform -rotate-12 scale-150"></div>
      </div>

      {/* Data Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <FileBarChart className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-semibold text-gray-700">Data Extraction</span>
          </div>
        </div>

        <div className="p-3">
          {currentStep === 'complete' ? (
            <div className="space-y-2">
              {/* Total Data Points */}
              <div className="text-center">
                <div className="text-lg font-bold text-teal-600">
                  {dataMetrics.totalDataPoints}
                </div>
                <div className="text-xs text-gray-600">Data Points</div>
              </div>

              {/* Data Breakdown */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-gray-700">Dates</span>
                  </div>
                  <span className="text-xs font-medium text-blue-600">
                    {dataMetrics.dates}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-700">Money</span>
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    {dataMetrics.money}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-gray-700">Places</span>
                  </div>
                  <span className="text-xs font-medium text-red-600">
                    {dataMetrics.locations}
                  </span>
                </div>
              </div>

              {/* Validation Score */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className={`px-1 py-0.5 bg-teal-100 text-teal-700 rounded font-medium ${getScoreColor(dataMetrics.validationScore)}`}>
                    {dataMetrics.validationScore}%
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
                  <FileBarChart className="w-full h-full text-teal-500" />
                </motion.div>
                <div className="text-xs text-gray-600">Scanning...</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Document Scanning Phase */}
      <AnimatePresence>
        {currentStep === 'scanning' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50"
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
                <Database className="w-8 h-8 text-teal-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Scanning Document Structure...</div>
              <div className="space-y-2 w-40">
                {['Text tokenization', 'Pattern recognition', 'Data classification'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.6, duration: 0.8 }}
                    className="bg-gray-200 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-teal-400 to-cyan-500 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Type Selection */}
      <AnimatePresence>
        {currentStep === 'detecting' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-52 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-teal-500" />
              <span className="text-sm font-semibold text-gray-700">Data Types</span>
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto">
              {dataTypes.map((type, i) => {
                const isSelected = selectedDataTypes.includes(type.id);
                const IconComponent = type.icon;
                
                return (
                  <motion.button
                    key={type.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleDataTypeToggle(type.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${type.color} text-white shadow-lg scale-105`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-3 h-3" />
                        <span className="text-xs font-medium">{type.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`text-xs px-1 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {type.count}
                        </span>
                        <div className={`w-3 h-3 rounded border-2 ${
                          isSelected 
                            ? 'bg-white border-white' 
                            : 'border-gray-300'
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
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {type.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Extraction Progress */}
      <AnimatePresence>
        {currentStep === 'detecting' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 w-72"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-6 h-6 text-teal-500" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700">Data Detection</div>
                <div className="text-xs text-gray-500">🔍 Identifying {selectedDataTypes.length} data types...</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Extraction Progress</span>
                <span>{extractionProgress.toFixed(0)}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-teal-400 to-cyan-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${extractionProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Extraction Steps */}
              <div className="space-y-2">
                {['Pattern matching', 'Data validation', 'Format recognition', 'Quality assessment'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: extractionProgress > i * 25 ? 1 : 0.3,
                      x: extractionProgress > i * 25 ? 0 : -10
                    }}
                    className="flex items-center gap-2 text-xs"
                  >
                    {extractionProgress > (i + 1) * 25 ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span className={extractionProgress > i * 25 ? 'text-gray-700' : 'text-gray-400'}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Processing */}
      <AnimatePresence>
        {currentStep === 'extracting' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 w-80"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileBarChart className="w-6 h-6 text-teal-500" />
              <div>
                <div className="text-sm font-medium text-gray-700">Data Processing</div>
                <div className="text-xs text-gray-500">Structuring and validating extracted data</div>
              </div>
            </div>

            {/* Processing Preview */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4 max-h-32 overflow-auto">
              <div className="text-xs font-medium text-gray-600 mb-2">Extracted Data Preview:</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">Date: January 15, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">Amount: $2,500,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">Location: San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">Email: sarah.johnson@techcorp.com</span>
                </div>
              </div>
            </div>

            {/* Validation Preview */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-xs font-bold text-green-600">95%</div>
                <div className="text-xs text-gray-600">Accuracy</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-xs font-bold text-blue-600">8</div>
                <div className="text-xs text-gray-600">Found</div>
              </div>
              <div className="text-center p-2 bg-teal-50 rounded">
                <div className="text-xs font-bold text-teal-600">100%</div>
                <div className="text-xs text-gray-600">Valid</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extraction Results */}
      <AnimatePresence>
        {currentStep === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
          >
            {/* Result Controls */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileBarChart className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-semibold text-gray-700">Extracted Data</span>
                  <span className="text-xs px-2 py-1 rounded bg-teal-500 text-white">
                    {dataMetrics.totalDataPoints} points
                  </span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-teal-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-teal-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Export
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>

              {/* Data Type Metrics */}
              <div className="grid grid-cols-6 gap-2">
                {dataTypes.map((type, i) => {
                  const count = dataMetrics[type.id as keyof typeof dataMetrics] as number || 0;
                  const IconComponent = type.icon;
                  
                  return (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div className="flex items-center justify-center mb-1">
                        <IconComponent className={`w-3 h-3 ${type.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div className={`text-xs font-bold ${type.color.replace('bg-', 'text-')}`}>
                        {count}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Data Display */}
            <div className="p-3 max-h-24 overflow-auto">
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-600 mb-2">Document with Extracted Data:</div>
                <div className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-2 rounded">
                  Following the meeting on{' '}
                  <span className="bg-blue-200 px-1 rounded cursor-pointer hover:bg-blue-300 transition-colors"
                        onClick={() => setSelectedDataPoint(sampleDataPoints[0])}>
                    January 15, 2024
                  </span>
                  , TechCorp Inc. secured{' '}
                  <span className="bg-green-200 px-1 rounded cursor-pointer hover:bg-green-300 transition-colors"
                        onClick={() => setSelectedDataPoint(sampleDataPoints[1])}>
                    $2,500,000
                  </span>
                  {' '}in Series A funding. The company, headquartered at{' '}
                  <span className="bg-red-200 px-1 rounded cursor-pointer hover:bg-red-300 transition-colors"
                        onClick={() => setSelectedDataPoint(sampleDataPoints[2])}>
                    San Francisco, CA 94105
                  </span>
                  , employs{' '}
                  <span className="bg-orange-200 px-1 rounded cursor-pointer hover:bg-orange-300 transition-colors"
                        onClick={() => setSelectedDataPoint(sampleDataPoints[5])}>
                    150 employees
                  </span>
                  {' '}and has achieved a{' '}
                  <span className="bg-orange-200 px-1 rounded cursor-pointer hover:bg-orange-300 transition-colors"
                        onClick={() => setSelectedDataPoint(sampleDataPoints[7])}>
                    13% growth rate
                  </span>
                  . Contact CEO at{' '}
                  <span className="bg-purple-200 px-1 rounded cursor-pointer hover:bg-purple-300 transition-colors"
                        onClick={() => setSelectedDataPoint(sampleDataPoints[3])}>
                    sarah.johnson@techcorp.com
                  </span>
                  {' '}or{' '}
                  <span className="bg-purple-200 px-1 rounded cursor-pointer hover:bg-purple-300 transition-colors"
                        onClick={() => setSelectedDataPoint(sampleDataPoints[4])}>
                    (555) 123-4567
                  </span>
                  .
                </div>

                {/* Data Point Detail Panel */}
                <AnimatePresence>
                  {selectedDataPoint && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-white border border-gray-200 rounded-lg p-2 mt-2"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDataColor(selectedDataPoint.type)} text-white`}>
                            {selectedDataPoint.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {selectedDataPoint.category}
                          </span>
                          {getValidationIcon(selectedDataPoint.validation)}
                        </div>
                        <span className={`text-xs font-medium ${getConfidenceColor(selectedDataPoint.confidence)}`}>
                          {(selectedDataPoint.confidence * 100).toFixed(0)}% confident
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mb-1">{selectedDataPoint.context}</div>
                      <div className="text-xs text-blue-700 bg-blue-50 p-1 rounded mb-1">
                        📋 Format: {selectedDataPoint.format}
                      </div>
                      <div className="text-xs text-green-700 bg-green-50 p-1 rounded">
                        💾 Value: {typeof selectedDataPoint.value === 'object' 
                          ? JSON.stringify(selectedDataPoint.value)
                          : selectedDataPoint.value.toString()}
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
          className="absolute top-4 right-4 bg-teal-500 text-white p-2 rounded-full shadow-lg"
        >
          <FileBarChart className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Data Particles */}
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
              {['📅', '💰', '📍', '📧', '📏', '#️⃣'][i]}
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
          stroke="url(#dataGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default StructuredDataExtractorAnimation; 