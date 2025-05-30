import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, AlertTriangle, XCircle, FileText, BarChart3, Target, Zap, Eye, Settings } from 'lucide-react';

const ComplianceCheckerAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'checking' | 'reporting' | 'complete'>('analyzing');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['regulatory', 'style', 'policy']);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [complianceIssues, setComplianceIssues] = useState<any[]>([]);
  const [complianceMetrics, setComplianceMetrics] = useState({
    overallScore: 0,
    regulatory: 0,
    style: 0,
    policy: 0,
    totalIssues: 0,
    criticalIssues: 0
  });

  const complianceCategories = [
    { 
      id: 'regulatory', 
      label: 'Regulatory', 
      icon: '⚖️',
      color: 'bg-red-500',
      description: 'Legal and regulatory compliance',
      requirements: 'GDPR, SOX, HIPAA',
      riskLevel: 'Critical'
    },
    { 
      id: 'style', 
      label: 'Style Guide', 
      icon: '📝',
      color: 'bg-blue-500',
      description: 'Writing style and formatting',
      requirements: 'AP Style, Company Brand',
      riskLevel: 'Medium'
    },
    { 
      id: 'policy', 
      label: 'Organizational', 
      icon: '🏢',
      color: 'bg-purple-500',
      description: 'Internal policies and standards',
      requirements: 'HR Policies, Code of Conduct',
      riskLevel: 'High'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: '🔒',
      color: 'bg-orange-500',
      description: 'Information security standards',
      requirements: 'ISO 27001, Data Classification',
      riskLevel: 'Critical'
    },
    { 
      id: 'accessibility', 
      label: 'Accessibility', 
      icon: '♿',
      color: 'bg-green-500',
      description: 'Accessibility guidelines',
      requirements: 'WCAG 2.1, Section 508',
      riskLevel: 'Medium'
    },
    { 
      id: 'quality', 
      label: 'Quality', 
      icon: '⭐',
      color: 'bg-cyan-500',
      description: 'Quality assurance standards',
      requirements: 'ISO 9001, Six Sigma',
      riskLevel: 'Low'
    }
  ];

  const sampleIssues = [
    {
      id: 1,
      category: 'regulatory',
      severity: 'critical',
      title: 'Missing GDPR Data Processing Clause',
      description: 'Document lacks required data processing disclosure under GDPR Article 13',
      line: 45,
      suggestion: 'Add data processing clause with legal basis, retention period, and contact details'
    },
    {
      id: 2,
      category: 'style',
      severity: 'medium',
      title: 'Inconsistent Date Format',
      description: 'Multiple date formats used throughout document (MM/DD/YYYY vs DD/MM/YYYY)',
      line: 23,
      suggestion: 'Standardize to ISO 8601 format (YYYY-MM-DD) as per style guide'
    },
    {
      id: 3,
      category: 'policy',
      severity: 'high',
      title: 'Unapproved External Reference',
      description: 'Reference to third-party service not on approved vendor list',
      line: 67,
      suggestion: 'Replace with approved vendor or submit vendor approval request'
    },
    {
      id: 4,
      category: 'security',
      severity: 'critical',
      title: 'Sensitive Data Exposure',
      description: 'Personal identifiable information (PII) detected without proper classification',
      line: 89,
      suggestion: 'Apply data classification label and implement access controls'
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('checking'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('reporting'), 6000);
    const timer3 = setTimeout(() => setCurrentStep('complete'), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'checking') {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + 1.5;
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
      const filteredIssues = sampleIssues.filter(issue => 
        selectedCategories.includes(issue.category)
      );
      
      setComplianceIssues(filteredIssues);

      const metricsInterval = setInterval(() => {
        setComplianceMetrics(prev => {
          const criticalCount = filteredIssues.filter(i => i.severity === 'critical').length;
          const totalIssues = filteredIssues.length;
          const baseScore = Math.max(60, 100 - (totalIssues * 8) - (criticalCount * 10));
          
          return {
            overallScore: Math.min(prev.overallScore + 2, baseScore),
            regulatory: Math.min(prev.regulatory + 3, selectedCategories.includes('regulatory') ? (criticalCount > 0 ? 65 : 92) : 95),
            style: Math.min(prev.style + 4, selectedCategories.includes('style') ? 88 : 95),
            policy: Math.min(prev.policy + 3, selectedCategories.includes('policy') ? 76 : 95),
            totalIssues: Math.min(prev.totalIssues + 1, totalIssues),
            criticalIssues: Math.min(prev.criticalIssues + 1, criticalCount)
          };
        });
      }, 150);

      const timer = setTimeout(() => clearInterval(metricsInterval), 2500);
      return () => {
        clearInterval(metricsInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep, selectedCategories]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getCategoryById = (id: string) => {
    return complianceCategories.find(cat => cat.id === id);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-3 h-3" />;
      case 'high': return <AlertTriangle className="w-3 h-3" />;
      case 'medium': return <AlertTriangle className="w-3 h-3" />;
      case 'low': return <CheckCircle className="w-3 h-3" />;
      default: return <AlertTriangle className="w-3 h-3" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Critical': return 'text-red-600';
      case 'High': return 'text-orange-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900 dark:via-green-800 dark:to-teal-800 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-400 to-green-400 dark:from-emerald-700 dark:to-green-700 transform rotate-12 scale-150"></div>
      </div>

      {/* Compliance Dashboard */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 dark:border-secondary-700/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100 dark:border-secondary-700">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Compliance Status</span>
          </div>
        </div>

        <div className="p-3">
          {currentStep === 'complete' ? (
            <div className="space-y-2">
              {/* Overall Score */}
              <div className="text-center">
                <div className={`text-lg font-bold ${getScoreColor(complianceMetrics.overallScore).replace('text-','dark:text-')}`}>
                  {complianceMetrics.overallScore}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Overall Score</div>
              </div>

              {/* Category Scores */}
              <div className="space-y-1">
                {selectedCategories.slice(0, 3).map((catId, i) => {
                  const category = getCategoryById(catId);
                  const score = complianceMetrics[catId as keyof typeof complianceMetrics] as number;
                  
                  return (
                    <div key={catId} className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">{category?.icon}</span> {/* Emoji, no color change */}
                        <span className="text-xs text-gray-700 dark:text-gray-300">{category?.label}</span>
                      </div>
                      <span className={`text-xs font-medium ${getScoreColor(score).replace('text-','dark:text-')}`}>
                        {score}%
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Issues Summary */}
              <div className="pt-2 border-t border-gray-100 dark:border-secondary-700">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Issues:</span>
                  <div className="flex gap-2">
                    <span className="px-1 py-0.5 bg-red-100 dark:bg-error-700/30 text-red-700 dark:text-error-300 rounded">
                      {complianceMetrics.criticalIssues}
                    </span>
                    <span className="px-1 py-0.5 bg-gray-100 dark:bg-secondary-600 text-gray-700 dark:text-gray-300 rounded">
                      {complianceMetrics.totalIssues}
                    </span>
                  </div>
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
                  <Shield className="w-full h-full text-emerald-500 dark:text-emerald-400" />
                </motion.div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Analyzing...</div>
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
                <FileText className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Analyzing Document...</div>
              <div className="space-y-2 w-40">
                {['Document structure', 'Content extraction', 'Compliance mapping'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.6, duration: 0.8 }}
                    className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-emerald-400 to-green-500 dark:from-emerald-600 dark:to-green-700 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Selection */}
      <AnimatePresence>
        {currentStep === 'checking' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-52 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50 dark:border-secondary-700/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Compliance Categories</span>
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto">
              {complianceCategories.map((category, i) => {
                const isSelected = selectedCategories.includes(category.id);
                const darkColor = category.color.replace('-500', '-600'); // Assuming -600 exists for dark variant
                
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${category.color} dark:${darkColor} text-white shadow-lg scale-105`
                        : 'bg-gray-50 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{category.icon}</span>
                        <span className="text-xs font-medium">{category.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/* Dynamic risk level color needs JS theme awareness */}
                        <span className={`text-xs px-1 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : `${getRiskLevelColor(category.riskLevel).replace('text-','bg-').replace('-600','-100')} ${getRiskLevelColor(category.riskLevel)}`
                        }`}>
                          {category.riskLevel}
                        </span>
                        <div className={`w-3 h-3 rounded border-2 ${
                          isSelected 
                            ? 'bg-white border-white' 
                            : 'border-gray-300 dark:border-gray-500'
                        }`}>
                          {isSelected && <CheckCircle className="w-full h-full text-current" />}
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      {category.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compliance Checking Progress */}
      <AnimatePresence>
        {currentStep === 'checking' && (
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
                <Zap className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Compliance Checking</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">🔍 Validating against {selectedCategories.length} standards...</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Validation Progress</span>
                <span>{analysisProgress.toFixed(0)}%</span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-emerald-400 to-green-500 dark:from-emerald-600 dark:to-green-700 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Checking Steps */}
              <div className="space-y-2">
                {['Regulatory scan', 'Style validation', 'Policy verification', 'Risk assessment'].map((step, i) => (
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
                      <CheckCircle className="w-3 h-3 text-green-500 dark:text-success-400" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 dark:border-gray-500 rounded-full" />
                    )}
                    <span className={analysisProgress > i * 25 ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compliance Report */}
      <AnimatePresence>
        {currentStep === 'reporting' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 dark:border-secondary-700/50 w-80"
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Compliance Report</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Generating findings and recommendations</div>
              </div>
            </div>

            {/* Sample Report */}
            <div className="bg-gray-50 dark:bg-secondary-700 rounded-lg p-3 mb-4 max-h-32 overflow-auto">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Key Findings:</div>
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <XCircle className="w-3 h-3 text-red-500 dark:text-error-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Missing GDPR compliance statement</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3 h-3 text-orange-500 dark:text-warning-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Unapproved vendor reference found</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-3 h-3 text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Inconsistent date formatting</span>
                </div>
              </div>
            </div>

            {/* Compliance Scores Preview */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-red-50 dark:bg-error-700/20 rounded">
                <div className="text-xs font-bold text-red-600 dark:text-error-300">65%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Regulatory</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 dark:bg-warning-700/20 rounded">
                <div className="text-xs font-bold text-yellow-600 dark:text-warning-300">88%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Style</div>
              </div>
              <div className="text-center p-2 bg-orange-50 dark:bg-orange-700/20 rounded"> {/* Assuming orange is like warning */}
                <div className="text-xs font-bold text-orange-600 dark:text-orange-300">76%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Policy</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compliance Results */}
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
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Compliance Results</span>
                  <span className="text-xs px-2 py-1 rounded bg-emerald-500 dark:bg-emerald-600 text-white">
                    {complianceMetrics.totalIssues} issues
                  </span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowDetailedView(!showDetailedView)}
                    className="bg-emerald-500 dark:bg-emerald-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showDetailedView ? 'Summary' : 'Details'}
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

              {/* Metrics */}
              <div className="grid grid-cols-5 gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Overall</div>
                  <div className={`text-xs font-bold ${getScoreColor(complianceMetrics.overallScore).replace('text-','dark:text-')}`}>
                    {complianceMetrics.overallScore}%
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Regulatory</div>
                  <div className={`text-xs font-bold ${getScoreColor(complianceMetrics.regulatory).replace('text-','dark:text-')}`}>
                    {complianceMetrics.regulatory}%
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Style</div>
                  <div className={`text-xs font-bold ${getScoreColor(complianceMetrics.style).replace('text-','dark:text-')}`}>
                    {complianceMetrics.style}%
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Policy</div>
                  <div className={`text-xs font-bold ${getScoreColor(complianceMetrics.policy).replace('text-','dark:text-')}`}>
                    {complianceMetrics.policy}%
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Critical</div>
                  <div className="text-xs font-bold text-red-600 dark:text-error-300">
                    {complianceMetrics.criticalIssues}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Results Content */}
            <div className="p-3 max-h-24 overflow-auto">
              <AnimatePresence mode="wait">
                {!showDetailedView ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {complianceIssues.slice(0, 3).map((issue, i) => (
                      <motion.div
                        key={issue.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border border-gray-200 dark:border-secondary-600 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-secondary-700/50 transition-colors"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {/* Dynamic severity color/icon needs JS theme awareness */}
                            <span className={`p-1 rounded ${getSeverityColor(issue.severity)}`}>
                              {getSeverityIcon(issue.severity)}
                            </span>
                            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{issue.title}</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Line {issue.line}</span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1 pl-6">
                          {issue.description}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="detailed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {complianceIssues.map((issue, i) => (
                      <motion.div
                        key={issue.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border border-gray-200 dark:border-secondary-600 rounded-lg p-2"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`p-1 rounded ${getSeverityColor(issue.severity)}`}>
                              {getSeverityIcon(issue.severity)}
                            </span>
                            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{issue.title}</span>
                            {/* Dynamic category color needs JS theme awareness */}
                            <span className={`text-xs px-1 py-0.5 rounded ${getCategoryById(issue.category)?.color} text-white`}>
                              {getCategoryById(issue.category)?.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Line {issue.line}</span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 mb-1 pl-6">
                          {issue.description}
                        </div>
                        <div className="text-xs text-green-700 dark:text-success-300 bg-green-50 dark:bg-success-700/20 p-1 rounded pl-6">
                          💡 {issue.suggestion}
                        </div>
                      </motion.div>
                    ))}
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
          className="absolute top-4 right-4 bg-emerald-500 dark:bg-emerald-600 text-white p-2 rounded-full shadow-lg"
        >
          <Shield className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Compliance Particles */}
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
              {['⚖️', '🔒', '📋', '🛡️', '✅', '⚠️'][i]}
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
          stroke="url(#complianceGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="complianceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default ComplianceCheckerAnimation; 