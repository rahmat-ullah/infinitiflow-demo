import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
  CheckCircle
} from 'lucide-react';

interface ROICalculatorPageProps {
  onBackToHome?: () => void;
}

const ROICalculatorPage: React.FC<ROICalculatorPageProps> = ({ onBackToHome }) => {
  // Industry presets
  const industryPresets = {
    retail: {
      operationalSavings: 0.12,
      revenueIncrease: 0.15,
      implementationCost: 75000,
      ongoingCost: 25000
    },
    healthcare: {
      operationalSavings: 0.18,
      revenueIncrease: 0.10,
      implementationCost: 120000,
      ongoingCost: 35000
    },
    finance: {
      operationalSavings: 0.15,
      revenueIncrease: 0.20,
      implementationCost: 150000,
      ongoingCost: 45000
    },
    manufacturing: {
      operationalSavings: 0.22,
      revenueIncrease: 0.08,
      implementationCost: 200000,
      ongoingCost: 40000
    },
    technology: {
      operationalSavings: 0.10,
      revenueIncrease: 0.25,
      implementationCost: 100000,
      ongoingCost: 30000
    },
    custom: {
      operationalSavings: 0.15,
      revenueIncrease: 0.15,
      implementationCost: 100000,
      ongoingCost: 30000
    }
  };

  // State variables
  const [industry, setIndustry] = useState('custom');
  const [companyName, setCompanyName] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState(5000000);
  const [operationalCosts, setOperationalCosts] = useState(3000000);
  const [operationalSavings, setOperationalSavings] = useState(industryPresets.custom.operationalSavings);
  const [revenueIncrease, setRevenueIncrease] = useState(industryPresets.custom.revenueIncrease);
  const [implementationCost, setImplementationCost] = useState(industryPresets.custom.implementationCost);
  const [ongoingCost, setOngoingCost] = useState(industryPresets.custom.ongoingCost);
  const [years, setYears] = useState(5);
  const [showResults, setShowResults] = useState(false);

  // Handle industry change
  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndustry = e.target.value as keyof typeof industryPresets;
    setIndustry(selectedIndustry);
    setOperationalSavings(industryPresets[selectedIndustry].operationalSavings);
    setRevenueIncrease(industryPresets[selectedIndustry].revenueIncrease);
    setImplementationCost(industryPresets[selectedIndustry].implementationCost);
    setOngoingCost(industryPresets[selectedIndustry].ongoingCost);
  };

  // Calculate ROI
  const calculateROI = () => {
    const results = [];
    let cumulativeCost = implementationCost;
    let cumulativeBenefits = 0;
    let netROI = -implementationCost;

    for (let year = 1; year <= years; year++) {
      // Annual operational savings
      const annualOpSavings = operationalCosts * operationalSavings;
      
      // Annual revenue increase
      const annualRevIncrease = annualRevenue * revenueIncrease;
      
      // Total annual benefit
      const annualBenefit = annualOpSavings + annualRevIncrease;
      
      // Update cumulative metrics
      cumulativeCost += ongoingCost;
      cumulativeBenefits += annualBenefit;
      netROI = cumulativeBenefits - cumulativeCost;

      results.push({
        year,
        operationalSavings: annualOpSavings,
        revenueIncrease: annualRevIncrease,
        annualBenefit,
        ongoingCost,
        cumulativeCost,
        cumulativeBenefits,
        netROI
      });
    }

    return results;
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Calculate ROI results
  const roiResults = showResults ? calculateROI() : [];

  // Calculate key metrics for summary
  const breakEvenPoint = showResults ? roiResults.findIndex(year => year.netROI > 0) + 1 : 0;
  const fiveYearROI = showResults && roiResults.length >= 5 ? (roiResults[4].cumulativeBenefits / roiResults[4].cumulativeCost - 1) : 0;
  const totalFiveYearBenefit = showResults && roiResults.length >= 5 ? roiResults[4].cumulativeBenefits : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={onBackToHome}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to Home
            </button>
            <div className="flex items-center space-x-2">
              <Calculator className="text-primary-600" size={24} />
              <h1 className="text-xl font-semibold text-gray-900">ROI Calculator</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-4 py-2 rounded-full mb-4">
              <BarChart3 size={16} className="inline-block mr-2" />
              Investment Calculator
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Calculate Your
              <span className="block bg-gradient-to-r from-primary-600 to-[#020043] bg-clip-text text-transparent">
                InfinitiFlow ROI
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the potential return on investment and cost savings when implementing 
              InfinitiFlow's AI-powered content generation platform in your business.
            </p>
          </motion.div>
        </div>

        {/* Input Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Company Information */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-6">
                <Building className="text-primary-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                  <select
                    value={industry}
                    onChange={handleIndustryChange}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="retail">Retail</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="technology">Technology</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Revenue</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={annualRevenue}
                      onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                      className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      min="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Operational Costs</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={operationalCosts}
                      onChange={(e) => setOperationalCosts(Number(e.target.value))}
                      className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* InfinitiFlow Impact Metrics */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-6">
                <TrendingUp className="text-primary-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">InfinitiFlow Impact</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Operational Cost Savings ({formatPercentage(operationalSavings)})
                  </label>
                  <input
                    type="range"
                    value={operationalSavings}
                    onChange={(e) => setOperationalSavings(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    min="0.05"
                    max="0.30"
                    step="0.01"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5%</span>
                    <span>30%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Revenue Increase ({formatPercentage(revenueIncrease)})
                  </label>
                  <input
                    type="range"
                    value={revenueIncrease}
                    onChange={(e) => setRevenueIncrease(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    min="0.05"
                    max="0.30"
                    step="0.01"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5%</span>
                    <span>30%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Initial Implementation Cost</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={implementationCost}
                      onChange={(e) => setImplementationCost(Number(e.target.value))}
                      className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      min="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Ongoing Cost</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      value={ongoingCost}
                      onChange={(e) => setOngoingCost(Number(e.target.value))}
                      className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      min="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Projection Period</label>
                  <select
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option value="3">3 Years</option>
                    <option value="5">5 Years</option>
                    <option value="7">7 Years</option>
                    <option value="10">10 Years</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <motion.button
              onClick={() => setShowResults(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-[#020043] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calculator size={20} className="mr-2" />
              <span>Calculate ROI</span>
              <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Results Section */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ROI Analysis for {companyName || "Your Company"}
              </h2>
              <p className="text-lg text-gray-600">
                Based on your inputs, here's your projected return on investment
              </p>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="text-blue-600" size={32} />
                  <span className="text-blue-600 text-sm font-medium">Break-Even</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Break-Even Point</h3>
                <p className="text-4xl font-bold text-blue-600">
                  {breakEvenPoint > years ? `> ${years}` : `${breakEvenPoint}`}
                  <span className="text-lg ml-1">Years</span>
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl shadow-lg border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="text-green-600" size={32} />
                  <span className="text-green-600 text-sm font-medium">Growth</span>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">5-Year ROI</h3>
                <p className="text-4xl font-bold text-green-600">
                  {formatPercentage(fiveYearROI)}
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-[#e6e3ff] to-[#e6e3ff] p-6 rounded-2xl shadow-lg border border-[#c7c2f5]">
                <div className="flex items-center justify-between mb-4">
                  <Target className="text-[#020043]" size={32} />
                  <span className="text-[#020043] text-sm font-medium">Total Benefit</span>
                </div>
                <h3 className="text-lg font-semibold text-[#020043] mb-2">5-Year Benefit</h3>
                <p className="text-4xl font-bold text-[#020043]">
                  {formatCurrency(totalFiveYearBenefit)}
                </p>
              </div>
            </div>
            
            {/* ROI Chart */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="text-primary-600 mr-3" size={28} />
                Cumulative ROI Over Time
              </h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={roiResults}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Year', position: 'insideBottomRight', offset: -10 }}
                      stroke="#6b7280"
                    />
                    <YAxis
                      tickFormatter={(value) => formatCurrency(value)}
                      label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                      stroke="#6b7280"
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="cumulativeCost" 
                      name="Cumulative Cost" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cumulativeBenefits" 
                      name="Cumulative Benefits" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="netROI" 
                      name="Net ROI" 
                      stroke="#3b82f6" 
                      strokeWidth={4}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Detailed Results Table */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed ROI Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Op. Savings</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rev. Increase</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Benefit</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Cost</th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cumulative ROI</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {roiResults.map((result) => (
                      <tr key={result.year} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{result.year}</td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-gray-700">{formatCurrency(result.operationalSavings)}</td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-gray-700">{formatCurrency(result.revenueIncrease)}</td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-gray-700">{formatCurrency(result.annualBenefit)}</td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-gray-700">
                          {result.year === 1
                            ? formatCurrency(implementationCost + ongoingCost)
                            : formatCurrency(ongoingCost)}
                        </td>
                        <td className={`px-6 py-4 text-right whitespace-nowrap font-bold ${result.netROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(result.netROI)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-primary-600 to-[#020043] rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative z-10">
                  <CheckCircle size={64} className="mx-auto mb-6 opacity-90" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Achieve These Results?
                  </h2>
                  <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                    Join thousands of companies already using InfinitiFlow to transform their content strategy and achieve measurable ROI.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Free Trial
                    </motion.button>
                    <motion.button
                      className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Schedule Demo
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ROICalculatorPage; 