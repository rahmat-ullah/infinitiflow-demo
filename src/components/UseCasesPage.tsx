import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Users, Building2, Filter } from 'lucide-react';
import { useCases, roleSolutions, industrySolutions } from '../data/usecases';
import { UseCase } from '../types/usecases';
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

  const categories = [
    { id: 'all', label: 'All Use Cases' },
    { id: 'content', label: 'Content Creation' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'sales', label: 'Sales' },
    { id: 'strategy', label: 'Strategy' }
  ];

  const filteredUseCases = selectedCategory === 'all' 
    ? useCases 
    : useCases.filter(useCase => useCase.category === selectedCategory);

  const featuredUseCase = useCases.find(uc => uc.featured);

  const handleUseCaseClick = (useCase: UseCase) => {
    setSelectedUseCase(useCase);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-900">
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
              <span className="inline-block bg-gradient-to-r from-primary-600 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-full mb-4"> {/* Assuming this vibrant banner is OK for dark mode */}
                Featured
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Create campaigns across email, social, and more with AI
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">All Use Cases</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
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
                      ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-lg'
                      : 'bg-white dark:bg-secondary-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-500'
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
            {filteredUseCases.map((useCase, index) => (
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
        </section>

        {/* Solutions by Role */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-blue-100 dark:bg-accent-800 text-blue-800 dark:text-accent-200 text-sm font-medium px-4 py-2 rounded-full mb-4">
                <Users size={16} className="inline-block mr-2" />
                Solutions by Role
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Tailored solutions for every marketing role
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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

        {/* Solutions by Industry */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-green-100 dark:bg-success-800 text-green-800 dark:text-success-200 text-sm font-medium px-4 py-2 rounded-full mb-4">
                <Building2 size={16} className="inline-block mr-2" />
                Solutions by Industry
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Industry-specific AI solutions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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

        {/* CTA Section */}
        <PageCTA 
          title="Get started with InfinitiFlow today"
          description="Join thousands of marketers who are already transforming their content strategy with our AI-powered platform."
          primaryButton={{
            text: "Start Free Trial",
            onClick: () => console.log('Start Free Trial clicked')
          }}
          secondaryButton={{
            text: "Get a Demo",
            onClick: () => console.log('Get a Demo clicked')
          }}
        />
      </div>

      {/* Use Case Detail Modal (if needed) */}
      {selectedUseCase && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" // Overlay is already dark
          onClick={() => setSelectedUseCase(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-secondary-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedUseCase.title}</h3>
              <button
                onClick={() => setSelectedUseCase(null)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedUseCase.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {selectedUseCase.metrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-secondary-700 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">{metric.value}</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{metric.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Benefits:</h4>
                <ul className="space-y-2">
                  {selectedUseCase.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 dark:text-success-300 mt-1">✓</span>
                      <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Examples:</h4>
                <ul className="space-y-2">
                  {selectedUseCase.examples.map((example, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-500 dark:text-accent-400 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-200">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UseCasesPage; 