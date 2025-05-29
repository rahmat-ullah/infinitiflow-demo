import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Users, Building2, Filter, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';
import { UseCase } from '../types/usecases';
import { useUseCases } from '../hooks/useUseCases';
import { apiClient } from '../services/api';
import PageHeader from './ui/PageHeader';
import PageHero from './ui/PageHero';
import PageCTA from './ui/PageCTA';
import UseCaseCard from './usecases/UseCaseCard';
import RoleSolutionCard from './usecases/RoleSolutionCard';
import IndustrySolutionCard from './usecases/IndustrySolutionCard';

interface UseCasesPageProps {
  onBackToHome?: () => void;
}

const UseCasesPage: React.FC<UseCasesPageProps> = ({ onBackToHome }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  const {
    useCases,
    roleSolutions,
    industrySolutions,
    categories,
    featuredUseCase,
    loading,
    error,
    fetchUseCases
  } = useUseCases();

  // Check backend connection status
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        await apiClient.checkHealth();
        setBackendStatus('connected');
      } catch (error) {
        console.error('Backend connection failed:', error);
        setBackendStatus('disconnected');
      }
    };

    checkBackendConnection();
  }, []);

  // Filter use cases when category changes
  useEffect(() => {
    fetchUseCases({ category: selectedCategory });
  }, [selectedCategory, fetchUseCases]);

  const handleUseCaseClick = (useCase: UseCase) => {
    setSelectedUseCase(useCase);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <PageHeader 
          title="Use Cases"
          icon={Sparkles}
          onBackToHome={onBackToHome}
        />
        
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-600" />
              <p className="text-gray-600">Loading use cases...</p>
              
              {/* Backend Status Indicator */}
              <div className="mt-4 flex items-center justify-center space-x-2">
                {backendStatus === 'checking' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    <span className="text-xs text-gray-500">Connecting to backend...</span>
                  </>
                )}
                {backendStatus === 'connected' && (
                  <>
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">Backend connected</span>
                  </>
                )}
                {backendStatus === 'disconnected' && (
                  <>
                    <WifiOff className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-600">Backend disconnected</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <PageHeader 
          title="Use Cases"
          icon={Sparkles}
          onBackToHome={onBackToHome}
        />
        
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="text-center max-w-md">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-500" />
              <p className="text-red-600 font-medium">Failed to load use cases</p>
              <p className="text-gray-600 mt-2">{error}</p>
              
              {/* Backend Status */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {backendStatus === 'connected' ? (
                    <>
                      <Wifi className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Backend: Connected</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">Backend: Disconnected</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Backend URL: http://localhost:5001/api
                </p>
                {backendStatus === 'disconnected' && (
                  <p className="text-xs text-red-500 mt-1">
                    Make sure the backend server is running on port 5001
                  </p>
                )}
              </div>
              
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <PageHeader 
        title="Use Cases"
        icon={Sparkles}
        onBackToHome={onBackToHome}
      />

      {/* Hero Section */}
      <PageHero 
        badge={{
          icon: Zap,
          text: "Powerful Use Cases"
        }}
        title="Whatever marketers need done,"
        highlightedTitle="InfinitiFlow can do"
        description="Scale up marketing content like blog articles, social media posts, sales emails & more with AI-powered solutions designed for every marketing challenge."
      />

      <div className="container mx-auto px-4">
        {/* Featured Use Case */}
        {featuredUseCase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <span className="inline-block bg-gradient-to-r from-primary-600 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full mb-4">
                Featured
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Create campaigns across email, social, and more with AI
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Keep your marketing campaigns aligned and on brand with AI-powered integrated marketing.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <UseCaseCard
                useCase={featuredUseCase}
                isHovered={hoveredCard === featuredUseCase.id}
                onHover={setHoveredCard}
                onClick={handleUseCaseClick}
              />
            </div>
          </motion.div>
        )}

        {/* Use Cases Grid */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Use Cases</h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover AI-powered solutions for every content and marketing challenge
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 border border-gray-300 hover:border-primary-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <UseCaseCard
                  useCase={useCase}
                  isHovered={hoveredCard === useCase.id}
                  onHover={setHoveredCard}
                  onClick={handleUseCaseClick}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* No results message */}
          {useCases.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">No use cases found for the selected category.</p>
            </div>
          )}
        </section>

        {/* Solutions by Role */}
        {roleSolutions.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full mb-4">
                  <Users size={16} className="inline-block mr-2" />
                  Solutions by Role
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Tailored solutions for every marketing role
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Get role-specific AI tools and workflows designed for your unique challenges and objectives.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roleSolutions.map((solution, index) => (
                <RoleSolutionCard
                  key={solution.id}
                  solution={solution}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Solutions by Industry */}
        {industrySolutions.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full mb-4">
                  <Building2 size={16} className="inline-block mr-2" />
                  Solutions by Industry
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Industry-specific AI solutions
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Specialized features and workflows designed for the unique needs of your industry.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industrySolutions.map((solution, index) => (
                <IndustrySolutionCard
                  key={solution.id}
                  solution={solution}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Data Source & Connection Status */}
        <div className="text-center py-4 mb-8">
          <div className="flex items-center justify-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Connected to Backend API
            </span>
            
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {backendStatus === 'connected' ? (
                <>
                  <Wifi className="w-3 h-3 mr-1" />
                  Backend Online
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 mr-1" />
                  Backend Offline
                </>
              )}
            </span>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            API: http://localhost:5001/api | Frontend: http://localhost:5174
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <PageCTA 
        title="Ready to transform your content creation?"
        description="Join thousands of marketers who are already using InfinitiFlow to create better content faster."
        primaryButton={{
          text: "Get Started Free",
          onClick: () => console.log('Get started clicked')
        }}
        secondaryButton={{
          text: "View All Features",
          onClick: () => console.log('View features clicked')
        }}
      />
    </div>
  );
};

export default UseCasesPage; 