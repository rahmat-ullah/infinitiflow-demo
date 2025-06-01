import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, Scan, Eye, FileText, CheckCircle, AlertCircle, XCircle, Zap } from 'lucide-react';

const RiskFinderAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'selecting' | 'scanning' | 'complete'>('analyzing');
  const [selectedRiskTypes, setSelectedRiskTypes] = useState<string[]>(['legal', 'compliance']);
  const [scanProgress, setScanProgress] = useState(0);
  const [showRiskDetails, setShowRiskDetails] = useState(false);
  const [detectedRisks, setDetectedRisks] = useState<any[]>([]);
  const [riskMetrics, setRiskMetrics] = useState({
    totalRisks: 0,
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
    riskScore: 0
  });

  const sourceDocument = "Our company collects personal data including social security numbers, credit card information, and private communications from users without explicit consent. We share this data with third-party vendors globally and store it indefinitely on unsecured servers. Employees can access any customer data without restrictions or logging.";

  const riskTypes = [
    { 
      id: 'legal', 
      label: 'Legal Issues', 
      icon: '⚖️',
      color: 'bg-red-500',
      description: 'Contract violations & liability'
    },
    { 
      id: 'compliance', 
      label: 'Compliance', 
      icon: '📋',
      color: 'bg-orange-500',
      description: 'Regulatory requirements'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: '🔒',
      color: 'bg-purple-500',
      description: 'Data protection & privacy'
    },
    { 
      id: 'financial', 
      label: 'Financial', 
      icon: '💰',
      color: 'bg-yellow-500',
      description: 'Financial exposure & fraud'
    },
    { 
      id: 'reputation', 
      label: 'Reputational', 
      icon: '📢',
      color: 'bg-pink-500',
      description: 'Brand & public relations'
    },
    { 
      id: 'operational', 
      label: 'Operational', 
      icon: '⚙️',
      color: 'bg-blue-500',
      description: 'Business continuity'
    }
  ];

  const allDetectedRisks = [
    {
      id: 1,
      type: 'legal',
      severity: 'critical',
      title: 'Data Collection Without Consent',
      description: 'Collecting personal data without explicit user consent violates privacy laws',
      position: { start: 89, end: 156 },
      recommendation: 'Implement clear consent mechanisms'
    },
    {
      id: 2,
      type: 'compliance',
      severity: 'high',
      title: 'GDPR Violation',
      description: 'Global data sharing without proper safeguards violates GDPR',
      position: { start: 157, end: 220 },
      recommendation: 'Review data transfer agreements'
    },
    {
      id: 3,
      type: 'security',
      severity: 'critical',
      title: 'Unsecured Data Storage',
      description: 'Storing sensitive data on unsecured servers creates security risk',
      position: { start: 265, end: 299 },
      recommendation: 'Implement encryption and security controls'
    },
    {
      id: 4,
      type: 'operational',
      severity: 'medium',
      title: 'Unrestricted Data Access',
      description: 'Employees having unrestricted access poses operational risks',
      position: { start: 300, end: 380 },
      recommendation: 'Implement role-based access controls'
    }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('selecting'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('scanning'), 5500);
    const timer3 = setTimeout(() => setCurrentStep('complete'), 8500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          const newProgress = prev + 3;
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
      const filteredRisks = allDetectedRisks.filter(risk => 
        selectedRiskTypes.includes(risk.type)
      );
      
      setDetectedRisks(filteredRisks);

      const metricsInterval = setInterval(() => {
        setRiskMetrics(prev => {
          const critical = filteredRisks.filter(r => r.severity === 'critical').length;
          const high = filteredRisks.filter(r => r.severity === 'high').length;
          const medium = filteredRisks.filter(r => r.severity === 'medium').length;
          const low = filteredRisks.filter(r => r.severity === 'low').length;
          
          return {
            totalRisks: Math.min(prev.totalRisks + 1, filteredRisks.length),
            highRisk: Math.min(prev.highRisk + 1, critical + high),
            mediumRisk: Math.min(prev.mediumRisk + 1, medium),
            lowRisk: Math.min(prev.lowRisk + 1, low),
            riskScore: Math.min(prev.riskScore + 5, critical * 25 + high * 15 + medium * 8 + low * 3)
          };
        });
      }, 200);

      const timer = setTimeout(() => clearInterval(metricsInterval), 2000);
      return () => {
        clearInterval(metricsInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep, selectedRiskTypes]);

  const handleRiskTypeToggle = (typeId: string) => {
    setSelectedRiskTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const getRiskTypeById = (id: string) => {
    return riskTypes.find(type => type.id === id);
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
      case 'medium': return <AlertCircle className="w-3 h-3" />;
      case 'low': return <CheckCircle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 40) return 'text-orange-600';
    if (score >= 20) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-400 to-orange-400 transform rotate-12 scale-150"></div>
      </div>

      {/* Document Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-red-600" />
            <span className="text-xs font-semibold text-gray-700">Document</span>
          </div>
        </div>

        <div className="p-3">
          <div className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-2">
            {sourceDocument}
          </div>
          
          {/* Document Stats */}
          {currentStep !== 'analyzing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Words:</span>
                <span className="text-xs font-medium text-gray-800">{sourceDocument.split(' ').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Status:</span>
                <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                  Needs Review
                </span>
              </div>
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
                <Scan className="w-8 h-8 text-red-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Analyzing Document...</div>
              <div className="space-y-2 w-32">
                {['Content Structure', 'Risk Patterns', 'Context Analysis'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.5, duration: 0.8 }}
                    className="bg-gray-200 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-red-400 to-orange-500 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Risk Type Selection */}
      <AnimatePresence>
        {currentStep === 'selecting' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-gray-700">Risk Categories</span>
            </div>

            <div className="space-y-1 max-h-32 overflow-y-auto">
              {riskTypes.map((riskType, i) => {
                const isSelected = selectedRiskTypes.includes(riskType.id);
                
                return (
                  <motion.button
                    key={riskType.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleRiskTypeToggle(riskType.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${riskType.color} text-white shadow-lg scale-105`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{riskType.icon}</span>
                        <span className="text-xs font-medium">{riskType.label}</span>
                      </div>
                      <div className={`w-3 h-3 rounded border-2 ${
                        isSelected 
                          ? 'bg-white border-white' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle className="w-full h-full text-current" />}
                      </div>
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {riskType.description}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Risk Scanning Progress */}
      <AnimatePresence>
        {currentStep === 'scanning' && (
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
                <Zap className="w-6 h-6 text-red-500" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700">Scanning for Risks</div>
                <div className="text-xs text-gray-500">🔍 Analyzing {selectedRiskTypes.length} risk categories...</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Progress</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-red-400 to-orange-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Scanning Steps */}
              <div className="space-y-2">
                {['Pattern recognition', 'Risk classification', 'Severity assessment', 'Generating report'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: scanProgress > i * 25 ? 1 : 0.3,
                      x: scanProgress > i * 25 ? 0 : -10
                    }}
                    className="flex items-center gap-2 text-xs"
                  >
                    {scanProgress > (i + 1) * 25 ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span className={scanProgress > i * 25 ? 'text-gray-700' : 'text-gray-400'}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Risk Detection Results */}
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
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-gray-700">Risk Assessment</span>
                  <span className={`text-xs px-2 py-1 rounded ${getSeverityColor('critical')}`}>
                    {riskMetrics.totalRisks} Risks Found
                  </span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowRiskDetails(!showRiskDetails)}
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showRiskDetails ? 'Summary' : 'Details'}
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
            </div>

            {/* Risk Content */}
            <div className="p-3 max-h-28 overflow-auto">
              <AnimatePresence mode="wait">
                {!showRiskDetails ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Risk Metrics */}
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">Total Risks</div>
                        <div className="text-xs font-bold text-red-600">
                          {riskMetrics.totalRisks}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">High Risk</div>
                        <div className="text-xs font-bold text-orange-600">
                          {riskMetrics.highRisk}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">Medium Risk</div>
                        <div className="text-xs font-bold text-yellow-600">
                          {riskMetrics.mediumRisk}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="text-xs font-medium text-gray-700 mb-1">Risk Score</div>
                        <div className={`text-xs font-bold ${getRiskScoreColor(riskMetrics.riskScore)}`}>
                          {riskMetrics.riskScore}
                        </div>
                      </motion.div>
                    </div>

                    {/* Top Risks */}
                    <div className="space-y-1">
                      {detectedRisks.slice(0, 2).map((risk, i) => (
                        <motion.div
                          key={risk.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-red-50 rounded-lg p-2"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {getSeverityIcon(risk.severity)}
                            <span className="text-xs font-medium text-red-700">{risk.title}</span>
                            <span className={`text-xs px-1 py-0.5 rounded text-white ${risk.severity === 'critical' ? 'bg-red-500' : 'bg-orange-500'}`}>
                              {risk.severity}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 line-clamp-1">
                            {risk.description}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {detectedRisks.map((risk, i) => (
                      <motion.div
                        key={risk.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border border-gray-200 rounded-lg p-2"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{getRiskTypeById(risk.type)?.icon}</span>
                            <span className="text-xs font-medium text-gray-800">{risk.title}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(risk.severity)}`}>
                            {risk.severity}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          {risk.description}
                        </div>
                        <div className="text-xs text-blue-600">
                          💡 {risk.recommendation}
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
          className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg"
        >
          <AlertTriangle className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Risk Particles */}
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
              {['⚠️', '🔍', '🛡️', '📊', '⚖️', '🔒'][i]}
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
          stroke="url(#riskGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default RiskFinderAnimation; 