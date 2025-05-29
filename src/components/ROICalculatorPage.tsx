import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { 
  ChevronLeft, 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Clock,
  Building,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Brain,
  Zap,
  Sparkles,
  Users,
  Award,
  Rocket,
  Play,
  Pause
} from 'lucide-react';

interface ROICalculatorPageProps {
  onBackToHome?: () => void;
}

const ROICalculatorPage: React.FC<ROICalculatorPageProps> = ({ onBackToHome }) => {
  // Enhanced state with AI-driven features
  const [currentStep, setCurrentStep] = useState<'input' | 'calculating' | 'results'>('input');
  const [calculationProgress, setCalculationProgress] = useState(0);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [animateResults, setAnimateResults] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  // Enhanced industry presets with AI recommendations
  const industryPresets = {
    retail: {
      name: 'Retail & E-commerce',
      icon: '🛍️',
      operationalSavings: 0.15,
      revenueIncrease: 0.20,
      implementationCost: 85000,
      ongoingCost: 28000,
      aiRecommendation: 'High impact on product descriptions and marketing content'
    },
    healthcare: {
      name: 'Healthcare & Medical',
      icon: '🏥',
      operationalSavings: 0.22,
      revenueIncrease: 0.12,
      implementationCost: 140000,
      ongoingCost: 38000,
      aiRecommendation: 'Excellent for patient communications and documentation'
    },
    finance: {
      name: 'Financial Services',
      icon: '🏦',
      operationalSavings: 0.18,
      revenueIncrease: 0.25,
      implementationCost: 160000,
      ongoingCost: 48000,
      aiRecommendation: 'Perfect for reports, proposals, and client communications'
    },
    technology: {
      name: 'Technology & SaaS',
      icon: '💻',
      operationalSavings: 0.12,
      revenueIncrease: 0.30,
      implementationCost: 110000,
      ongoingCost: 32000,
      aiRecommendation: 'Ideal for documentation, marketing, and user content'
    },
    marketing: {
      name: 'Marketing Agency',
      icon: '📢',
      operationalSavings: 0.25,
      revenueIncrease: 0.35,
      implementationCost: 75000,
      ongoingCost: 25000,
      aiRecommendation: 'Maximum ROI for content creation and campaigns'
    },
    custom: {
      name: 'Custom Business',
      icon: '🏢',
      operationalSavings: 0.15,
      revenueIncrease: 0.18,
      implementationCost: 100000,
      ongoingCost: 30000,
      aiRecommendation: 'Tailored solution for your specific needs'
    }
  };

  // State variables
  const [industry, setIndustry] = useState('custom');
  const [companyName, setCompanyName] = useState('');
  const [teamSize, setTeamSize] = useState(15);
  const [contentVolume, setContentVolume] = useState(100);
  const [annualRevenue, setAnnualRevenue] = useState(5000000);
  const [operationalCosts, setOperationalCosts] = useState(3000000);
  const [years, setYears] = useState(5);

  // AI-calculated metrics based on inputs
  const [metrics, setMetrics] = useState({
    operationalSavings: 0.15,
    revenueIncrease: 0.18,
    implementationCost: 100000,
    ongoingCost: 30000,
    timeToValue: 3,
    productivityGain: 8.5
  });

  // Enhanced calculation with AI predictions
  const calculateAdvancedROI = () => {
    const results = [];
    let cumulativeCost = metrics.implementationCost;
    let cumulativeBenefits = 0;
    let netROI = -metrics.implementationCost;

    for (let year = 1; year <= years; year++) {
      // AI-enhanced calculations
      const yearMultiplier = Math.min(1 + (year - 1) * 0.05, 1.25); // Compound growth
      const efficiencyGain = Math.min(0.15 + (year - 1) * 0.03, 0.30); // Increasing efficiency
      
      const annualOpSavings = operationalCosts * metrics.operationalSavings * yearMultiplier;
      const annualRevIncrease = annualRevenue * metrics.revenueIncrease * yearMultiplier;
      const efficiencyBonus = (teamSize * 50000) * efficiencyGain; // Team productivity gains
      
      const annualBenefit = annualOpSavings + annualRevIncrease + efficiencyBonus;
      
      cumulativeCost += metrics.ongoingCost;
      cumulativeBenefits += annualBenefit;
      netROI = cumulativeBenefits - cumulativeCost;

      results.push({
        year,
        operationalSavings: Math.round(annualOpSavings),
        revenueIncrease: Math.round(annualRevIncrease),
        efficiencyBonus: Math.round(efficiencyBonus),
        annualBenefit: Math.round(annualBenefit),
        ongoingCost: metrics.ongoingCost,
        cumulativeCost: Math.round(cumulativeCost),
        cumulativeBenefits: Math.round(cumulativeBenefits),
        netROI: Math.round(netROI),
        roi: cumulativeBenefits > 0 ? ((cumulativeBenefits - cumulativeCost) / cumulativeCost) * 100 : -100
      });
    }

    return results;
  };

  // AI Insights generation
  const generateAIInsights = () => {
    const preset = industryPresets[industry as keyof typeof industryPresets];
    const insights = [
      `🎯 ${preset.aiRecommendation}`,
      `⚡ Expected ${Math.round(metrics.productivityGain)}x productivity increase`,
      `📈 Break-even estimated in ${metrics.timeToValue} months`,
      `🚀 Content volume can increase by ${Math.round(contentVolume * 2.5)}% with same resources`,
      `💰 ROI accelerates significantly after year 2 due to compound benefits`
    ];
    setAiInsights(insights);
  };

  // Auto-update metrics based on industry selection
  useEffect(() => {
    const preset = industryPresets[industry as keyof typeof industryPresets];
    setMetrics(prev => ({
      ...prev,
      operationalSavings: preset.operationalSavings,
      revenueIncrease: preset.revenueIncrease,
      implementationCost: preset.implementationCost,
      ongoingCost: preset.ongoingCost,
      timeToValue: Math.max(2, Math.min(6, Math.round(preset.implementationCost / 50000))),
      productivityGain: 5 + (preset.operationalSavings * 20)
    }));
  }, [industry]);

  // Calculation animation
  const handleCalculate = async () => {
    setCurrentStep('calculating');
    setCalculationProgress(0);
    
    // Simulate AI calculation process
    const steps = [
      'Analyzing company data...',
      'Processing industry benchmarks...',
      'Calculating productivity gains...',
      'Generating revenue projections...',
      'Optimizing implementation timeline...',
      'Finalizing ROI analysis...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setCalculationProgress((i + 1) / steps.length * 100);
    }

    generateAIInsights();
    setCurrentStep('results');
    setAnimateResults(true);
  };

  // Format functions
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Calculate results
  const roiResults = calculateAdvancedROI();
  const breakEvenPoint = roiResults.findIndex(year => year.netROI > 0) + 1;
  const fiveYearROI = roiResults.length >= 5 ? roiResults[4].roi : 0;
  const totalBenefit = roiResults.length >= 5 ? roiResults[4].cumulativeBenefits : 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const chartData = roiResults.map(result => ({
    year: `Year ${result.year}`,
    'Cumulative Benefits': result.cumulativeBenefits,
    'Cumulative Costs': result.cumulativeCost,
    'Net ROI': result.netROI,
    'ROI %': result.roi
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-100 sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button 
              onClick={onBackToHome}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to Home
            </motion.button>
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: currentStep === 'calculating' ? 360 : 0 }}
                transition={{ duration: 2, repeat: currentStep === 'calculating' ? Infinity : 0 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg"
              >
                <Brain className="text-white" size={24} />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered ROI Calculator
                </h1>
                <p className="text-sm text-gray-600">Intelligent business impact analysis</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Input Phase */}
          {currentStep === 'input' && (
            <motion.div
              key="input"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -100 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              <motion.div variants={itemVariants} className="text-center mb-12">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-full mb-6"
                >
                  <Sparkles className="text-indigo-600 mr-2" size={20} />
                  <span className="text-indigo-800 font-semibold">AI-Enhanced Analysis</span>
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                  Calculate Your
                  <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI Content ROI
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Discover your potential returns with our intelligent calculator that adapts to your industry and business model.
                </p>
              </motion.div>

              {/* Input Form */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
              >
                {/* Company Details */}
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8">
                  <div className="flex items-center mb-6">
                    <Building className="text-indigo-600 mr-3" size={28} />
                    <h2 className="text-2xl font-bold text-gray-900">Company Profile</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Company Name</label>
                      <motion.input
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)" }}
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 transition-all duration-300 bg-white/50"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Industry</label>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(industryPresets).map(([key, preset]) => (
                          <motion.button
                            key={key}
                            onClick={() => setIndustry(key)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                              industry === key
                                ? 'border-indigo-500 bg-indigo-50 shadow-lg scale-105'
                                : 'border-gray-200 bg-white/50 hover:border-indigo-300'
                            }`}
                            whileHover={{ scale: industry === key ? 1.05 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="text-2xl mb-1">{preset.icon}</div>
                            <div className="font-semibold text-sm text-gray-900">{preset.name}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Team Size</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="number"
                            value={teamSize}
                            onChange={(e) => setTeamSize(Number(e.target.value))}
                            className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 transition-all duration-300 bg-white/50"
                            min="1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Monthly Content</label>
                        <div className="relative">
                          <BarChart3 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="number"
                            value={contentVolume}
                            onChange={(e) => setContentVolume(Number(e.target.value))}
                            className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 transition-all duration-300 bg-white/50"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8">
                  <div className="flex items-center mb-6">
                    <DollarSign className="text-green-600 mr-3" size={28} />
                    <h2 className="text-2xl font-bold text-gray-900">Financial Metrics</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Annual Revenue</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="number"
                          value={annualRevenue}
                          onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                          className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 transition-all duration-300 bg-white/50"
                          min="0"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Operational Costs</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="number"
                          value={operationalCosts}
                          onChange={(e) => setOperationalCosts(Number(e.target.value))}
                          className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 transition-all duration-300 bg-white/50"
                          min="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Analysis Period</label>
                      <select
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 transition-all duration-300 bg-white/50"
                      >
                        <option value="3">3 Years</option>
                        <option value="5">5 Years</option>
                        <option value="7">7 Years</option>
                        <option value="10">10 Years</option>
                      </select>
                    </div>

                    {/* AI Recommendation Preview */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200"
                    >
                      <div className="flex items-center mb-2">
                        <Brain className="text-indigo-600 mr-2" size={16} />
                        <span className="text-sm font-semibold text-indigo-800">AI Insight</span>
                      </div>
                      <p className="text-sm text-indigo-700">
                        {industryPresets[industry as keyof typeof industryPresets].aiRecommendation}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Calculate Button */}
              <motion.div
                variants={itemVariants}
                className="text-center"
              >
                <motion.button
                  onClick={handleCalculate}
                  className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!companyName}
                >
                  <Brain size={24} className="mr-3" />
                  <span>Calculate AI ROI</span>
                  <Rocket size={24} className="ml-3 transform group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Calculation Phase */}
          {currentStep === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity }
                }}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-full mb-8 shadow-2xl"
              >
                <Brain className="text-white" size={64} />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-4">AI is Analyzing Your Business</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Our intelligent system is processing your data and generating personalized ROI projections...
              </p>
              
              <div className="w-full max-w-md">
                <div className="bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${calculationProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-gray-600">{calculationProgress.toFixed(0)}% Complete</p>
              </div>
            </motion.div>
          )}

          {/* Results Phase */}
          {currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  ROI Analysis for {companyName}
                </h2>
                <p className="text-xl text-gray-600">AI-powered insights for your content transformation</p>
              </motion.div>

              {/* Key Metrics Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
              >
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl shadow-2xl border border-blue-200">
                  <div className="flex items-center justify-between mb-6">
                    <Clock className="text-blue-600" size={40} />
                    <span className="text-blue-600 text-sm font-bold bg-blue-200 px-3 py-1 rounded-full">BREAK-EVEN</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">Payback Period</h3>
                  <p className="text-5xl font-bold text-blue-600 mb-2">
                    {breakEvenPoint > years ? `>${years}` : breakEvenPoint}
                    <span className="text-xl ml-2">years</span>
                  </p>
                  <p className="text-blue-700">Faster than industry average</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl shadow-2xl border border-green-200">
                  <div className="flex items-center justify-between mb-6">
                    <TrendingUp className="text-green-600" size={40} />
                    <span className="text-green-600 text-sm font-bold bg-green-200 px-3 py-1 rounded-full">ROI</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">5-Year Return</h3>
                  <p className="text-5xl font-bold text-green-600 mb-2">
                    {formatPercentage(fiveYearROI)}
                  </p>
                  <p className="text-green-700">Exceptional growth potential</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl shadow-2xl border border-purple-200">
                  <div className="flex items-center justify-between mb-6">
                    <Target className="text-purple-600" size={40} />
                    <span className="text-purple-600 text-sm font-bold bg-purple-200 px-3 py-1 rounded-full">BENEFIT</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-800 mb-2">Total Value</h3>
                  <p className="text-5xl font-bold text-purple-600 mb-2">
                    {formatCurrency(totalBenefit)}
                  </p>
                  <p className="text-purple-700">Cumulative 5-year benefit</p>
                </motion.div>
              </motion.div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl border border-indigo-200 max-w-6xl mx-auto"
              >
                <div className="flex items-center mb-6">
                  <Brain className="text-indigo-600 mr-3" size={32} />
                  <h3 className="text-2xl font-bold text-gray-900">AI-Generated Insights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start p-4 bg-white/60 rounded-xl"
                    >
                      <span className="text-lg mr-3">{insight.split(' ')[0]}</span>
                      <p className="text-gray-700">{insight.substring(2)}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Interactive Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 max-w-6xl mx-auto"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 flex items-center">
                    <BarChart3 className="text-indigo-600 mr-3" size={36} />
                    ROI Projection Timeline
                  </h3>
                  <motion.button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      autoPlay ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {autoPlay ? <Pause size={16} className="mr-2" /> : <Play size={16} className="mr-2" />}
                    {autoPlay ? 'Pause' : 'Play'}
                  </motion.button>
                </div>
                
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <defs>
                        <linearGradient id="benefitsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="costsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" stroke="#6b7280" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} stroke="#6b7280" />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="Cumulative Benefits"
                        stroke="#22C55E"
                        strokeWidth={3}
                        fill="url(#benefitsGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="Cumulative Costs"
                        stroke="#EF4444"
                        strokeWidth={3}
                        fill="url(#costsGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white max-w-4xl mx-auto"
              >
                <Award className="mx-auto mb-6" size={64} />
                <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Content Strategy?</h3>
                <p className="text-xl mb-8 opacity-90">
                  Start your AI content journey today and realize these projected returns
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Free Trial
                  </motion.button>
                  <motion.button
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-indigo-600 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule Demo
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ROICalculatorPage; 