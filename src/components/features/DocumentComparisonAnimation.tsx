import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, FileText, Eye, BarChart3, Plus, Minus, Edit, CheckCircle, Zap, ArrowLeftRight } from 'lucide-react';

const DocumentComparisonAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'selecting' | 'analyzing' | 'comparing' | 'complete'>('selecting');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>(['v1', 'v2']);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showSideBySide, setShowSideBySide] = useState(false);
  const [highlightedChanges, setHighlightedChanges] = useState<any[]>([]);
  const [comparisonMetrics, setComparisonMetrics] = useState({
    totalChanges: 0,
    additions: 0,
    deletions: 0,
    modifications: 0,
    similarity: 0
  });

  const documentVersions = [
    { 
      id: 'v1', 
      label: 'Contract v1.0', 
      icon: '📄',
      color: 'bg-blue-500',
      description: 'Original contract draft',
      date: '2024-01-15',
      pages: 12
    },
    { 
      id: 'v2', 
      label: 'Contract v1.1', 
      icon: '📋',
      color: 'bg-green-500',
      description: 'Revised contract with amendments',
      date: '2024-02-08',
      pages: 14
    },
    { 
      id: 'v3', 
      label: 'Contract v2.0', 
      icon: '📑',
      color: 'bg-purple-500',
      description: 'Final approved version',
      date: '2024-02-20',
      pages: 15
    },
    { 
      id: 'policy', 
      label: 'Policy Document', 
      icon: '📜',
      color: 'bg-orange-500',
      description: 'Company policy reference',
      date: '2024-01-10',
      pages: 8
    }
  ];

  const sampleChanges = [
    {
      id: 1,
      type: 'addition',
      line: 23,
      content: 'Additional clause regarding data protection compliance with GDPR requirements',
      impact: 'high'
    },
    {
      id: 2,
      type: 'deletion',
      line: 45,
      content: 'Outdated reference to previous regulatory framework',
      impact: 'medium'
    },
    {
      id: 3,
      type: 'modification',
      line: 67,
      content: 'Updated payment terms from NET 30 to NET 15 days',
      impact: 'high'
    },
    {
      id: 4,
      type: 'addition',
      line: 89,
      content: 'New termination clause with 90-day notice period',
      impact: 'medium'
    }
  ];

  const originalText = "This Service Agreement governs the provision of consulting services between the parties. Payment terms are NET 30 days from invoice date. Either party may terminate with 60-day written notice.";
  const revisedText = "This Service Agreement governs the provision of consulting services between the parties, ensuring GDPR compliance. Payment terms are NET 15 days from invoice date. Either party may terminate with 90-day written notice, subject to data protection requirements.";

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('analyzing'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('comparing'), 6000);
    const timer3 = setTimeout(() => setCurrentStep('complete'), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'analyzing') {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + 2.5;
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
      setHighlightedChanges(sampleChanges);

      const metricsInterval = setInterval(() => {
        setComparisonMetrics(prev => ({
          totalChanges: Math.min(prev.totalChanges + 1, sampleChanges.length),
          additions: Math.min(prev.additions + 1, sampleChanges.filter(c => c.type === 'addition').length),
          deletions: Math.min(prev.deletions + 1, sampleChanges.filter(c => c.type === 'deletion').length),
          modifications: Math.min(prev.modifications + 1, sampleChanges.filter(c => c.type === 'modification').length),
          similarity: Math.min(prev.similarity + 2, 87)
        }));
      }, 200);

      const timer = setTimeout(() => clearInterval(metricsInterval), 2000);
      return () => {
        clearInterval(metricsInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep]);

  const handleDocumentToggle = (docId: string) => {
    setSelectedDocuments(prev => {
      if (prev.includes(docId)) {
        return prev.filter(id => id !== docId);
      } else if (prev.length < 2) {
        return [...prev, docId];
      } else {
        return [prev[1], docId]; // Replace first document
      }
    });
  };

  const getDocumentById = (id: string) => {
    return documentVersions.find(doc => doc.id === id);
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'addition': return 'bg-green-500 text-white';
      case 'deletion': return 'bg-red-500 text-white';
      case 'modification': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'addition': return <Plus className="w-3 h-3" />;
      case 'deletion': return <Minus className="w-3 h-3" />;
      case 'modification': return <Edit className="w-3 h-3" />;
      default: return <Edit className="w-3 h-3" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400 to-cyan-400 transform -rotate-12 scale-150"></div>
      </div>

      {/* Document Previews */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <GitCompare className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-gray-700">Documents</span>
          </div>
        </div>

        <div className="p-3">
          {selectedDocuments.length === 2 ? (
            <div className="space-y-2">
              {selectedDocuments.map((docId, i) => {
                const doc = getDocumentById(docId);
                return (
                  <div key={docId} className="flex items-center gap-2">
                    <span className="text-sm">{doc?.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-800">{doc?.label}</div>
                      <div className="text-xs text-gray-500">{doc?.date}</div>
                    </div>
                    <span className={`text-xs px-1 py-0.5 rounded ${i === 0 ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {i === 0 ? 'A' : 'B'}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-xs text-gray-500 text-center">
              Select 2 documents to compare
            </div>
          )}

          {/* Document Stats */}
          {currentStep !== 'selecting' && selectedDocuments.length === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 pt-2 border-t border-gray-100"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Status:</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {currentStep === 'complete' ? 'Compared' : 'Processing'}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Document Selection */}
      <AnimatePresence>
        {currentStep === 'selecting' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">Select Documents</span>
            </div>

            <div className="space-y-1 max-h-32 overflow-y-auto">
              {documentVersions.map((doc, i) => {
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
                        {isSelected && (
                          <span className={`text-xs px-1 py-0.5 rounded ${
                            selectedDocuments.indexOf(doc.id) === 0 
                              ? 'bg-white/20 text-white' 
                              : 'bg-white/30 text-white'
                          }`}>
                            {selectedDocuments.indexOf(doc.id) === 0 ? 'A' : 'B'}
                          </span>
                        )}
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

      {/* Analysis Progress */}
      <AnimatePresence>
        {currentStep === 'analyzing' && (
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
                <Zap className="w-6 h-6 text-blue-500" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700">Analyzing Differences</div>
                <div className="text-xs text-gray-500">🔍 Comparing {selectedDocuments.length} documents...</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Analysis Progress</span>
                <span>{analysisProgress.toFixed(0)}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Analysis Steps */}
              <div className="space-y-2">
                {['Text extraction', 'Semantic analysis', 'Change detection', 'Diff generation'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: analysisProgress > i * 25 ? 1 : 0.3,
                      x: analysisProgress > i * 25 ? 0 : -10
                    }}
                    className="flex items-center gap-2 text-xs"
                  >
                    {analysisProgress > (i + 1) * 25 ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span className={analysisProgress > i * 25 ? 'text-gray-700' : 'text-gray-400'}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison View */}
      <AnimatePresence>
        {currentStep === 'comparing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 w-80"
          >
            <div className="flex items-center gap-3 mb-4">
              <ArrowLeftRight className="w-6 h-6 text-blue-500" />
              <div>
                <div className="text-sm font-medium text-gray-700">Document Comparison</div>
                <div className="text-xs text-gray-500">Highlighting differences and changes</div>
              </div>
            </div>

            {/* Sample Diff */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4 max-h-32 overflow-auto">
              <div className="text-xs font-medium text-gray-600 mb-2">Sample Changes:</div>
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <Plus className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700 bg-green-100 px-1 rounded">GDPR compliance</span>
                </div>
                <div className="flex items-start gap-2">
                  <Edit className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700">NET <span className="bg-red-100 px-1 rounded">30</span> → <span className="bg-green-100 px-1 rounded">15</span> days</span>
                </div>
                <div className="flex items-start gap-2">
                  <Plus className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700 bg-green-100 px-1 rounded">90-day notice period</span>
                </div>
              </div>
            </div>

            {/* Change Summary */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-xs font-bold text-green-600">+2</div>
                <div className="text-xs text-gray-600">Added</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <div className="text-xs font-bold text-red-600">-1</div>
                <div className="text-xs text-gray-600">Removed</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-xs font-bold text-blue-600">~1</div>
                <div className="text-xs text-gray-600">Modified</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Results */}
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
                  <GitCompare className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">Comparison Results</span>
                  <span className="text-xs px-2 py-1 rounded bg-blue-500 text-white">
                    {comparisonMetrics.totalChanges} changes
                  </span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowSideBySide(!showSideBySide)}
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showSideBySide ? 'Changes' : 'Side by Side'}
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

              {/* Metrics */}
              <div className="grid grid-cols-5 gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Total</div>
                  <div className="text-xs font-bold text-blue-600">
                    {comparisonMetrics.totalChanges}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Added</div>
                  <div className="text-xs font-bold text-green-600">
                    {comparisonMetrics.additions}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Removed</div>
                  <div className="text-xs font-bold text-red-600">
                    {comparisonMetrics.deletions}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Modified</div>
                  <div className="text-xs font-bold text-orange-600">
                    {comparisonMetrics.modifications}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Similar</div>
                  <div className="text-xs font-bold text-purple-600">
                    {comparisonMetrics.similarity}%
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Results Content */}
            <div className="p-3 max-h-24 overflow-auto">
              <AnimatePresence mode="wait">
                {!showSideBySide ? (
                  <motion.div
                    key="changes"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {highlightedChanges.map((change, i) => (
                      <motion.div
                        key={change.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border border-gray-200 rounded-lg p-2 hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`p-1 rounded ${getChangeTypeColor(change.type)}`}>
                              {getChangeTypeIcon(change.type)}
                            </span>
                            <span className="text-xs font-medium text-gray-800">Line {change.line}</span>
                          </div>
                          <span className={`text-xs font-medium ${getImpactColor(change.impact)}`}>
                            {change.impact} impact
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 line-clamp-1 pl-6">
                          {change.content}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="sidebyside"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {/* Original */}
                    <div className="bg-red-50 rounded-lg p-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Original</span>
                        <span className="text-xs font-medium text-gray-600">{getDocumentById(selectedDocuments[0])?.label}</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed">
                        This Service Agreement governs the provision of consulting services between the parties. Payment terms are <span className="bg-red-200 px-1 rounded">NET 30 days</span> from invoice date. Either party may terminate with <span className="bg-red-200 px-1 rounded">60-day</span> written notice.
                      </div>
                    </div>

                    {/* Revised */}
                    <div className="bg-green-50 rounded-lg p-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Revised</span>
                        <span className="text-xs font-medium text-gray-600">{getDocumentById(selectedDocuments[1])?.label}</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed">
                        This Service Agreement governs the provision of consulting services between the parties<span className="bg-green-200 px-1 rounded">, ensuring GDPR compliance</span>. Payment terms are <span className="bg-green-200 px-1 rounded">NET 15 days</span> from invoice date. Either party may terminate with <span className="bg-green-200 px-1 rounded">90-day</span> written notice<span className="bg-green-200 px-1 rounded">, subject to data protection requirements</span>.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Indicator */}
      {currentStep === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        >
          <GitCompare className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Comparison Particles */}
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
              {['📊', '🔍', '📝', '⚡', '🎯', '📋'][i]}
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
          stroke="url(#comparisonGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="comparisonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default DocumentComparisonAnimation; 