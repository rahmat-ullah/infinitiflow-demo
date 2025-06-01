import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, Zap, FileText, Target, CheckCircle, Layers, GitBranch, BarChart3, Sparkles } from 'lucide-react';

const VectorDatabaseAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'indexing' | 'querying' | 'complete'>('analyzing');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>(['tech', 'business']);
  const [vectorProgress, setVectorProgress] = useState(0);
  const [queryText, setQueryText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [vectorMetrics, setVectorMetrics] = useState({
    totalVectors: 0,
    dimensions: 0,
    indexSize: 0,
    queryTime: 0
  });

  const sourceQuery = "Find documents about artificial intelligence implementation strategies for enterprise applications";

  const documentTypes = [
    { 
      id: 'tech', 
      label: 'Technical Docs', 
      icon: '⚙️',
      color: 'bg-blue-500',
      description: 'APIs, specifications, guides',
      count: 156
    },
    { 
      id: 'business', 
      label: 'Business Plans', 
      icon: '📊',
      color: 'bg-green-500',
      description: 'Strategies, reports, analysis',
      count: 89
    },
    { 
      id: 'research', 
      label: 'Research Papers', 
      icon: '📚',
      color: 'bg-purple-500',
      description: 'Academic, studies, findings',
      count: 234
    },
    { 
      id: 'legal', 
      label: 'Legal Documents', 
      icon: '⚖️',
      color: 'bg-red-500',
      description: 'Contracts, policies, terms',
      count: 67
    },
    { 
      id: 'marketing', 
      label: 'Marketing Content', 
      icon: '📢',
      color: 'bg-orange-500',
      description: 'Campaigns, copy, materials',
      count: 123
    },
    { 
      id: 'support', 
      label: 'Support Docs', 
      icon: '🛠️',
      color: 'bg-cyan-500',
      description: 'Help articles, FAQs, guides',
      count: 345
    }
  ];

  const allSearchResults = [
    {
      id: 1,
      title: 'AI Implementation Strategy for Enterprise',
      similarity: 0.94,
      category: 'business',
      snippet: 'Comprehensive guide to implementing artificial intelligence solutions in large-scale enterprise environments...',
      metadata: { author: 'Dr. Sarah Chen', date: '2024-01-15', pages: 42 }
    },
    {
      id: 2,
      title: 'Machine Learning API Integration Guide',
      similarity: 0.89,
      category: 'tech',
      snippet: 'Technical documentation for integrating ML models into existing enterprise application architectures...',
      metadata: { author: 'Engineering Team', date: '2024-02-08', pages: 28 }
    },
    {
      id: 3,
      title: 'Enterprise AI Adoption Research Study',
      similarity: 0.86,
      category: 'research',
      snippet: 'Longitudinal study analyzing successful AI adoption patterns across Fortune 500 companies...',
      metadata: { author: 'MIT Research Lab', date: '2023-12-20', pages: 156 }
    },
    {
      id: 4,
      title: 'AI Governance and Risk Management',
      similarity: 0.82,
      category: 'business',
      snippet: 'Framework for managing risks and establishing governance structures for enterprise AI initiatives...',
      metadata: { author: 'Risk Analytics Corp', date: '2024-01-30', pages: 73 }
    }
  ];

  const vectorPoints = [
    { x: 20, y: 30, category: 'tech', active: false },
    { x: 45, y: 25, category: 'business', active: false },
    { x: 70, y: 40, category: 'research', active: false },
    { x: 30, y: 55, category: 'legal', active: false },
    { x: 60, y: 60, category: 'marketing', active: false },
    { x: 80, y: 20, category: 'support', active: false },
    { x: 25, y: 75, category: 'tech', active: false },
    { x: 55, y: 35, category: 'business', active: true }, // Query result
    { x: 35, y: 20, category: 'tech', active: true }, // Query result
    { x: 65, y: 50, category: 'research', active: true }, // Query result
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('indexing'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('querying'), 6000);
    const timer3 = setTimeout(() => setCurrentStep('complete'), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'indexing') {
      const interval = setInterval(() => {
        setVectorProgress(prev => {
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
    if (currentStep === 'querying') {
      const typewriterInterval = setInterval(() => {
        setQueryText(prev => {
          if (prev.length < sourceQuery.length) {
            return sourceQuery.slice(0, prev.length + 1);
          }
          clearInterval(typewriterInterval);
          return prev;
        });
      }, 50);

      return () => clearInterval(typewriterInterval);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'complete') {
      const filteredResults = allSearchResults.filter(result => 
        selectedDocuments.includes(result.category)
      );
      
      setSearchResults(filteredResults);

      const metricsInterval = setInterval(() => {
        setVectorMetrics(prev => {
          const totalDocs = selectedDocuments.reduce((sum, docType) => {
            const type = documentTypes.find(t => t.id === docType);
            return sum + (type?.count || 0);
          }, 0);
          
          return {
            totalVectors: Math.min(prev.totalVectors + 50, totalDocs),
            dimensions: Math.min(prev.dimensions + 32, 1536),
            indexSize: Math.min(prev.indexSize + 0.5, 12.8),
            queryTime: Math.min(prev.queryTime + 2, 23)
          };
        });
      }, 100);

      const timer = setTimeout(() => clearInterval(metricsInterval), 2000);
      return () => {
        clearInterval(metricsInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep, selectedDocuments]);

  const handleDocumentToggle = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const getDocumentById = (id: string) => {
    return documentTypes.find(doc => doc.id === id);
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 0.9) return 'bg-green-500 text-white';
    if (similarity >= 0.8) return 'bg-blue-500 text-white';
    if (similarity >= 0.7) return 'bg-yellow-500 text-black';
    return 'bg-gray-500 text-white';
  };

  const getCategoryColor = (category: string) => {
    const doc = documentTypes.find(d => d.id === category);
    return doc ? doc.color + ' text-white' : 'bg-gray-500 text-white';
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-400 to-blue-400 transform rotate-12 scale-150"></div>
      </div>

      {/* Vector Space Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: currentStep === 'complete' ? 1 : 0.3 }}
        transition={{ duration: 1 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-semibold text-gray-700">Vector Space</span>
          </div>
        </div>

        <div className="p-3 relative h-24">
          {/* Vector Points */}
          <svg className="w-full h-full">
            {vectorPoints.map((point, i) => {
              const doc = getDocumentById(point.category);
              const isActive = point.active && currentStep === 'complete';
              
              return (
                <motion.g key={i}>
                  <motion.circle
                    cx={`${point.x}%`}
                    cy={`${point.y}%`}
                    r={isActive ? "4" : "2"}
                    className={isActive ? "fill-blue-500" : "fill-gray-400"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  />
                  {isActive && (
                    <motion.circle
                      cx={`${point.x}%`}
                      cy={`${point.y}%`}
                      r="8"
                      className="fill-none stroke-blue-500 stroke-1"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.5 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                    />
                  )}
                </motion.g>
              );
            })}
            
            {/* Connection Lines for Similar Vectors */}
            {currentStep === 'complete' && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <line x1="45%" y1="25%" x2="55%" y2="35%" className="stroke-blue-300 stroke-1" strokeDasharray="2,2" />
                <line x1="55%" y1="35%" x2="35%" y2="20%" className="stroke-blue-300 stroke-1" strokeDasharray="2,2" />
                <line x1="65%" y1="50%" x2="55%" y2="35%" className="stroke-blue-300 stroke-1" strokeDasharray="2,2" />
              </motion.g>
            )}
          </svg>
          
          {/* Dimensions Label */}
          {currentStep !== 'analyzing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-1 right-1 text-xs text-gray-500"
            >
              1536D
            </motion.div>
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
                <Database className="w-8 h-8 text-slate-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Processing Documents...</div>
              <div className="space-y-2 w-32">
                {['Text Extraction', 'Embedding Generation', 'Vector Indexing'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.5, duration: 0.8 }}
                    className="bg-gray-200 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-slate-400 to-blue-500 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Type Selection */}
      <AnimatePresence>
        {currentStep === 'indexing' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <GitBranch className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-semibold text-gray-700">Document Types</span>
            </div>

            <div className="space-y-1 max-h-32 overflow-y-auto">
              {documentTypes.map((doc, i) => {
                const isSelected = selectedDocuments.includes(doc.id);
                
                return (
                  <motion.button
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleDocumentToggle(doc.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${doc.color} text-white shadow-lg scale-105`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{doc.icon}</span>
                        <span className="text-xs font-medium">{doc.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`text-xs px-1 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {doc.count}
                        </span>
                        <div className={`w-3 h-3 rounded border-2 ${
                          isSelected 
                            ? 'bg-white border-white' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <CheckCircle className="w-full h-full text-current" />}
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {doc.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vector Indexing Progress */}
      <AnimatePresence>
        {currentStep === 'indexing' && (
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
                <Zap className="w-6 h-6 text-slate-500" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700">Building Vector Index</div>
                <div className="text-xs text-gray-500">🔗 Processing {selectedDocuments.length} document types...</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Vectorization</span>
                <span>{vectorProgress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-slate-400 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${vectorProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Indexing Steps */}
              <div className="space-y-2">
                {['Embedding documents', 'Building HNSW index', 'Optimizing clusters', 'Storing vectors'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: vectorProgress > i * 25 ? 1 : 0.3,
                      x: vectorProgress > i * 25 ? 0 : -10
                    }}
                    className="flex items-center gap-2 text-xs"
                  >
                    {vectorProgress > (i + 1) * 25 ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span className={vectorProgress > i * 25 ? 'text-gray-700' : 'text-gray-400'}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Semantic Query Interface */}
      <AnimatePresence>
        {currentStep === 'querying' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 w-80"
          >
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-slate-500" />
              <div>
                <div className="text-sm font-medium text-gray-700">Semantic Search</div>
                <div className="text-xs text-gray-500">Natural language query processing</div>
              </div>
            </div>

            {/* Query Input */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="text-xs text-gray-600 mb-2">Query:</div>
              <div className="text-sm text-gray-800 min-h-[2rem] leading-relaxed">
                {queryText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-0.5 h-4 bg-slate-400 ml-1"
                />
              </div>
            </div>

            {/* Query Processing */}
            <div className="space-y-2">
              {['Generating query embedding', 'Computing similarities', 'Ranking results'].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: queryText.length > i * 20 ? 1 : 0.3,
                    x: queryText.length > i * 20 ? 0 : -10
                  }}
                  className="flex items-center gap-2 text-xs"
                >
                  {queryText.length > (i + 1) * 20 ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 border border-gray-300 border-t-slate-400 rounded-full"
                    />
                  )}
                  <span className={queryText.length > i * 20 ? 'text-gray-700' : 'text-gray-400'}>
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
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
                  <Target className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-semibold text-gray-700">Semantic Results</span>
                  <span className="text-xs px-2 py-1 rounded bg-slate-500 text-white">
                    {searchResults.length} matches
                  </span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-slate-600 transition-colors"
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
                    <BarChart3 className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-4 gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Vectors</div>
                  <div className="text-xs font-bold text-slate-600">
                    {vectorMetrics.totalVectors}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Dimensions</div>
                  <div className="text-xs font-bold text-blue-600">
                    {vectorMetrics.dimensions}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Index Size</div>
                  <div className="text-xs font-bold text-green-600">
                    {vectorMetrics.indexSize.toFixed(1)}MB
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Query Time</div>
                  <div className="text-xs font-bold text-orange-600">
                    {vectorMetrics.queryTime}ms
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Results Content */}
            <div className="p-3 max-h-24 overflow-auto">
              <div className="space-y-2">
                {searchResults.map((result, i) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border border-gray-200 rounded-lg p-2 hover:bg-gray-50 cursor-pointer transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getDocumentById(result.category)?.icon}</span>
                        <span className="text-xs font-medium text-gray-800">{result.title}</span>
                      </div>
                      <div className="flex gap-1">
                        <span className={`text-xs px-1 py-0.5 rounded ${getCategoryColor(result.category)}`}>
                          {getDocumentById(result.category)?.label}
                        </span>
                        <span className={`text-xs px-1 py-0.5 rounded ${getSimilarityColor(result.similarity)}`}>
                          {(result.similarity * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-1 line-clamp-1">
                      {result.snippet}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{result.metadata.author}</span>
                      <span>{result.metadata.date}</span>
                      <span>{result.metadata.pages} pages</span>
                    </div>
                  </motion.div>
                ))}
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
          className="absolute top-4 right-4 bg-slate-500 text-white p-2 rounded-full shadow-lg"
        >
          <Database className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Vector Particles */}
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
              {['🔗', '📊', '🎯', '⚡', '🔍', '💾'][i]}
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
          stroke="url(#vectorGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="vectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default VectorDatabaseAnimation; 