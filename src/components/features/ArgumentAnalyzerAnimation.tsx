import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Target, Eye, CheckCircle, AlertTriangle, XCircle, BarChart3, Network, Zap, TrendingUp, Brain } from 'lucide-react';

const ArgumentAnalyzerAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'identifying' | 'evaluating' | 'complete'>('analyzing');
  const [selectedArgumentTypes, setSelectedArgumentTypes] = useState<string[]>(['claim', 'evidence', 'warrant']);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedArgument, setSelectedArgument] = useState<any>(null);
  const [detectedArguments, setDetectedArguments] = useState<any[]>([]);
  const [argumentMetrics, setArgumentMetrics] = useState({
    overallStrength: 0,
    logicalFlow: 0,
    evidenceQuality: 0,
    claimSupport: 0,
    totalClaims: 0,
    totalEvidence: 0,
    weaknesses: 0
  });

  const argumentTypes = [
    { 
      id: 'claim', 
      label: 'Claims', 
      icon: Target,
      color: 'bg-blue-500',
      description: 'Main assertions and positions',
      examples: 'Primary thesis, key arguments',
      count: 0
    },
    { 
      id: 'evidence', 
      label: 'Evidence', 
      icon: BarChart3,
      color: 'bg-green-500',
      description: 'Supporting facts and data',
      examples: 'Statistics, research findings',
      count: 0
    },
    { 
      id: 'warrant', 
      label: 'Warrants', 
      icon: Network,
      color: 'bg-purple-500',
      description: 'Logical connections',
      examples: 'Reasoning bridges, assumptions',
      count: 0
    },
    { 
      id: 'counterargument', 
      label: 'Counter-args', 
      icon: Scale,
      color: 'bg-orange-500',
      description: 'Opposing viewpoints',
      examples: 'Alternative perspectives',
      count: 0
    },
    { 
      id: 'rebuttal', 
      label: 'Rebuttals', 
      icon: CheckCircle,
      color: 'bg-indigo-500',
      description: 'Counter-responses',
      examples: 'Refutations, defenses',
      count: 0
    },
    { 
      id: 'fallacy', 
      label: 'Fallacies', 
      icon: AlertTriangle,
      color: 'bg-red-500',
      description: 'Logical errors',
      examples: 'Ad hominem, straw man',
      count: 0
    }
  ];

  const sampleArguments = [
    {
      id: 1,
      text: 'Remote work significantly increases employee productivity',
      type: 'claim',
      category: 'Primary Claim',
      strength: 0.85,
      context: 'Main thesis statement',
      support: ['Studies show 13% productivity increase', 'Reduced commute stress', 'Flexible schedule benefits'],
      weaknesses: ['Lacks control group comparison']
    },
    {
      id: 2,
      text: 'Studies show 13% productivity increase in remote workers',
      type: 'evidence',
      category: 'Statistical Evidence',
      strength: 0.92,
      context: 'Stanford University research',
      support: ['Peer-reviewed study', '9-month duration', '16,000 participants'],
      weaknesses: []
    },
    {
      id: 3,
      text: 'Increased productivity leads to better business outcomes',
      type: 'warrant',
      category: 'Logical Bridge',
      strength: 0.78,
      context: 'Connects evidence to claim',
      support: ['Economic principle', 'Business logic'],
      weaknesses: ['Assumes direct correlation']
    },
    {
      id: 4,
      text: 'However, remote work may reduce team collaboration',
      type: 'counterargument',
      category: 'Opposing View',
      strength: 0.65,
      context: 'Alternative perspective',
      support: ['Communication challenges', 'Reduced spontaneous interaction'],
      weaknesses: ['Not well-supported with data']
    },
    {
      id: 5,
      text: 'Modern collaboration tools effectively bridge this gap',
      type: 'rebuttal',
      category: 'Counter-response',
      strength: 0.75,
      context: 'Response to counterargument',
      support: ['Slack, Zoom adoption', 'Digital workflow tools'],
      weaknesses: ['Could use more specific evidence']
    },
    {
      id: 6,
      text: 'Everyone prefers remote work because it\'s convenient',
      type: 'fallacy',
      category: 'Hasty Generalization',
      strength: 0.25,
      context: 'Logical error - overgeneralization',
      support: [],
      weaknesses: ['No supporting data', 'Sweeping statement', 'Ignores individual preferences']
    }
  ];

  const sampleText = "Remote work significantly increases employee productivity, as demonstrated by studies showing a 13% productivity increase in remote workers. This increased productivity leads to better business outcomes for companies. However, remote work may reduce team collaboration and spontaneous innovation. Nevertheless, modern collaboration tools effectively bridge this gap. Everyone prefers remote work because it's convenient and eliminates commuting hassles.";

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('identifying'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('evaluating'), 6000);
    const timer3 = setTimeout(() => setCurrentStep('complete'), 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'identifying') {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + 1.8;
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
      const filteredArguments = sampleArguments.filter(arg => 
        selectedArgumentTypes.includes(arg.type)
      );
      
      setDetectedArguments(filteredArguments);

      const metricsInterval = setInterval(() => {
        setArgumentMetrics(prev => {
          const claims = filteredArguments.filter(a => a.type === 'claim').length;
          const evidence = filteredArguments.filter(a => a.type === 'evidence').length;
          const fallacies = filteredArguments.filter(a => a.type === 'fallacy').length;
          const weaknesses = filteredArguments.reduce((sum, arg) => sum + arg.weaknesses.length, 0);
          
          const avgStrength = filteredArguments.reduce((sum, arg) => sum + arg.strength, 0) / filteredArguments.length || 0;
          const evidenceQuality = evidence > 0 ? 85 : 60;
          const claimSupport = claims > 0 && evidence > 0 ? 88 : 45;
          const logicalFlow = fallacies === 0 ? 92 : Math.max(60 - fallacies * 15, 30);
          
          return {
            overallStrength: Math.min(prev.overallStrength + 2, Math.round(avgStrength * 100)),
            logicalFlow: Math.min(prev.logicalFlow + 3, logicalFlow),
            evidenceQuality: Math.min(prev.evidenceQuality + 3, evidenceQuality),
            claimSupport: Math.min(prev.claimSupport + 3, claimSupport),
            totalClaims: Math.min(prev.totalClaims + 1, claims),
            totalEvidence: Math.min(prev.totalEvidence + 1, evidence),
            weaknesses: Math.min(prev.weaknesses + 1, weaknesses)
          };
        });
      }, 150);

      const timer = setTimeout(() => clearInterval(metricsInterval), 2500);
      return () => {
        clearInterval(metricsInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep, selectedArgumentTypes]);

  const handleArgumentTypeToggle = (typeId: string) => {
    setSelectedArgumentTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const getArgumentTypeById = (id: string) => {
    return argumentTypes.find(type => type.id === id);
  };

  const getArgumentColor = (type: string) => {
    const argType = getArgumentTypeById(type);
    return argType ? argType.color : 'bg-gray-500';
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 0.8) return 'text-green-600';
    if (strength >= 0.6) return 'text-yellow-600';
    if (strength >= 0.4) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStrengthIcon = (strength: number) => {
    if (strength >= 0.8) return <CheckCircle className="w-3 h-3 text-green-500" />;
    if (strength >= 0.6) return <AlertTriangle className="w-3 h-3 text-yellow-500" />;
    return <XCircle className="w-3 h-3 text-red-500" />;
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-violet-400 to-purple-400 transform rotate-12 scale-150"></div>
      </div>

      {/* Argument Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-semibold text-gray-700">Argument Strength</span>
          </div>
        </div>

        <div className="p-3">
          {currentStep === 'complete' ? (
            <div className="space-y-2">
              {/* Overall Strength */}
              <div className="text-center">
                <div className={`text-lg font-bold ${getScoreColor(argumentMetrics.overallStrength)}`}>
                  {argumentMetrics.overallStrength}%
                </div>
                <div className="text-xs text-gray-600">Overall Strength</div>
              </div>

              {/* Quality Metrics */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-gray-700">Claims</span>
                  </div>
                  <span className="text-xs font-medium text-blue-600">
                    {argumentMetrics.totalClaims}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-700">Evidence</span>
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    {argumentMetrics.totalEvidence}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-gray-700">Logic</span>
                  </div>
                  <span className={`text-xs font-medium ${getScoreColor(argumentMetrics.logicalFlow)}`}>
                    {argumentMetrics.logicalFlow}%
                  </span>
                </div>
              </div>

              {/* Weaknesses */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Issues:</span>
                  <span className="px-1 py-0.5 bg-red-100 text-red-700 rounded">
                    {argumentMetrics.weaknesses}
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
                  <Scale className="w-full h-full text-violet-500" />
                </motion.div>
                <div className="text-xs text-gray-600">Analyzing...</div>
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
                <Brain className="w-8 h-8 text-violet-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Analyzing Argument Structure...</div>
              <div className="space-y-2 w-40">
                {['Text parsing', 'Claim identification', 'Logic mapping'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.6, duration: 0.8 }}
                    className="bg-gray-200 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-violet-400 to-purple-500 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Argument Type Selection */}
      <AnimatePresence>
        {currentStep === 'identifying' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-52 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Network className="w-4 h-4 text-violet-500" />
              <span className="text-sm font-semibold text-gray-700">Argument Types</span>
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto">
              {argumentTypes.map((type, i) => {
                const isSelected = selectedArgumentTypes.includes(type.id);
                const IconComponent = type.icon;
                
                return (
                  <motion.button
                    key={type.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleArgumentTypeToggle(type.id)}
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

      {/* Argument Analysis Progress */}
      <AnimatePresence>
        {currentStep === 'identifying' && (
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
                <Zap className="w-6 h-6 text-violet-500" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700">Argument Identification</div>
                <div className="text-xs text-gray-500">🔍 Mapping {selectedArgumentTypes.length} argument types...</div>
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
                  className="bg-gradient-to-r from-violet-400 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Analysis Steps */}
              <div className="space-y-2">
                {['Claim extraction', 'Evidence linking', 'Logic validation', 'Fallacy detection'].map((step, i) => (
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

      {/* Argument Evaluation */}
      <AnimatePresence>
        {currentStep === 'evaluating' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 w-80"
          >
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-violet-500" />
              <div>
                <div className="text-sm font-medium text-gray-700">Argument Evaluation</div>
                <div className="text-xs text-gray-500">Assessing logical strength and coherence</div>
              </div>
            </div>

            {/* Evaluation Preview */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4 max-h-32 overflow-auto">
              <div className="text-xs font-medium text-gray-600 mb-2">Argument Structure:</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">Main Claim → Remote work increases productivity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">Supporting Evidence → 13% increase study</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-700">Logical Fallacy → Hasty generalization</span>
                </div>
              </div>
            </div>

            {/* Strength Preview */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-xs font-bold text-green-600">85%</div>
                <div className="text-xs text-gray-600">Claims</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded">
                <div className="text-xs font-bold text-yellow-600">78%</div>
                <div className="text-xs text-gray-600">Evidence</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <div className="text-xs font-bold text-red-600">65%</div>
                <div className="text-xs text-gray-600">Logic</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Argument Results */}
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
                  <Scale className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-semibold text-gray-700">Argument Analysis</span>
                  <span className={`text-xs px-2 py-1 rounded ${getScoreColor(argumentMetrics.overallStrength) === 'text-green-600' ? 'bg-green-500' : getScoreColor(argumentMetrics.overallStrength) === 'text-yellow-600' ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                    {argumentMetrics.overallStrength}% strength
                  </span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-violet-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-violet-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Report
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

              {/* Argument Quality Metrics */}
              <div className="grid grid-cols-4 gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Logic</div>
                  <div className={`text-xs font-bold ${getScoreColor(argumentMetrics.logicalFlow)}`}>
                    {argumentMetrics.logicalFlow}%
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Evidence</div>
                  <div className={`text-xs font-bold ${getScoreColor(argumentMetrics.evidenceQuality)}`}>
                    {argumentMetrics.evidenceQuality}%
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Support</div>
                  <div className={`text-xs font-bold ${getScoreColor(argumentMetrics.claimSupport)}`}>
                    {argumentMetrics.claimSupport}%
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-xs font-medium text-gray-700 mb-1">Issues</div>
                  <div className="text-xs font-bold text-red-600">
                    {argumentMetrics.weaknesses}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Argument Text Display */}
            <div className="p-3 max-h-24 overflow-auto">
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-600 mb-2">Document with Argument Structure:</div>
                <div className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-2 rounded">
                  <span className="bg-blue-200 px-1 rounded cursor-pointer hover:bg-blue-300 transition-colors"
                        onClick={() => setSelectedArgument(sampleArguments[0])}>
                    Remote work significantly increases employee productivity
                  </span>
                  , as demonstrated by{' '}
                  <span className="bg-green-200 px-1 rounded cursor-pointer hover:bg-green-300 transition-colors"
                        onClick={() => setSelectedArgument(sampleArguments[1])}>
                    studies showing a 13% productivity increase
                  </span>
                  .{' '}
                  <span className="bg-purple-200 px-1 rounded cursor-pointer hover:bg-purple-300 transition-colors"
                        onClick={() => setSelectedArgument(sampleArguments[2])}>
                    This increased productivity leads to better business outcomes
                  </span>
                  .{' '}
                  <span className="bg-orange-200 px-1 rounded cursor-pointer hover:bg-orange-300 transition-colors"
                        onClick={() => setSelectedArgument(sampleArguments[3])}>
                    However, remote work may reduce team collaboration
                  </span>
                  .{' '}
                  <span className="bg-indigo-200 px-1 rounded cursor-pointer hover:bg-indigo-300 transition-colors"
                        onClick={() => setSelectedArgument(sampleArguments[4])}>
                    Modern collaboration tools effectively bridge this gap
                  </span>
                  .{' '}
                  <span className="bg-red-200 px-1 rounded cursor-pointer hover:bg-red-300 transition-colors"
                        onClick={() => setSelectedArgument(sampleArguments[5])}>
                    Everyone prefers remote work because it's convenient
                  </span>
                  .
                </div>

                {/* Argument Detail Panel */}
                <AnimatePresence>
                  {selectedArgument && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-white border border-gray-200 rounded-lg p-2 mt-2"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getArgumentColor(selectedArgument.type)} text-white`}>
                            {selectedArgument.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {selectedArgument.category}
                          </span>
                          {getStrengthIcon(selectedArgument.strength)}
                        </div>
                        <span className={`text-xs font-medium ${getStrengthColor(selectedArgument.strength)}`}>
                          {(selectedArgument.strength * 100).toFixed(0)}% strength
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mb-1">{selectedArgument.context}</div>
                      {selectedArgument.support.length > 0 && (
                        <div className="text-xs text-green-700 bg-green-50 p-1 rounded mb-1">
                          ✓ Support: {selectedArgument.support.join(', ')}
                        </div>
                      )}
                      {selectedArgument.weaknesses.length > 0 && (
                        <div className="text-xs text-red-700 bg-red-50 p-1 rounded">
                          ⚠ Issues: {selectedArgument.weaknesses.join(', ')}
                        </div>
                      )}
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
          className="absolute top-4 right-4 bg-violet-500 text-white p-2 rounded-full shadow-lg"
        >
          <Scale className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Argument Particles */}
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
              {['🎯', '📊', '🔗', '⚖️', '✅', '⚠️'][i]}
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
          stroke="url(#argumentGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="argumentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default ArgumentAnalyzerAnimation; 