import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Languages, CheckCircle, Sparkles, ArrowRight, Star, Volume2, Copy, Zap } from 'lucide-react';

const TranslationAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'detecting' | 'selecting' | 'translating' | 'complete'>('detecting');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('spanish');
  const [translationProgress, setTranslationProgress] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [qualityScores, setQualityScores] = useState({
    accuracy: 0,
    fluency: 0,
    contextual: 0,
    cultural: 0
  });

  const sourceText = "Our AI-powered content platform helps businesses create engaging marketing materials that resonate with their target audience across all channels.";
  const detectedLanguage = { code: 'en', name: 'English', flag: '🇺🇸', confidence: 98 };

  const availableLanguages = [
    { code: 'es', name: 'Spanish', flag: '🇪🇸', difficulty: 'easy' },
    { code: 'fr', name: 'French', flag: '🇫🇷', difficulty: 'easy' },
    { code: 'de', name: 'German', flag: '🇩🇪', difficulty: 'medium' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', difficulty: 'hard' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', difficulty: 'hard' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', difficulty: 'hard' }
  ];

  const translations = {
    spanish: "Nuestra plataforma de contenido impulsada por IA ayuda a las empresas a crear materiales de marketing atractivos que resuenen con su audiencia objetivo en todos los canales.",
    french: "Notre plateforme de contenu alimentée par l'IA aide les entreprises à créer des supports marketing engageants qui résonnent avec leur public cible sur tous les canaux.",
    german: "Unsere KI-gestützte Content-Plattform hilft Unternehmen dabei, ansprechende Marketingmaterialien zu erstellen, die bei ihrer Zielgruppe über alle Kanäle hinweg Anklang finden.",
    japanese: "当社のAI搭載コンテンツプラットフォームは、企業がすべてのチャネルでターゲットオーディエンスに響く魅力的なマーケティング資料を作成するのを支援します。",
    arabic: "تساعد منصة المحتوى المدعومة بالذكاء الاصطناعي الشركات على إنشاء مواد تسويقية جذابة تتفاعل مع جمهورها المستهدف عبر جميع القنوات.",
    chinese: "我们的AI驱动内容平台帮助企业创建引人入胜的营销材料，在所有渠道中与目标受众产生共鸣。"
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('selecting'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('translating'), 5000);
    const timer3 = setTimeout(() => setCurrentStep('complete'), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (currentStep === 'translating') {
      const interval = setInterval(() => {
        setTranslationProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'complete') {
      const scoreInterval = setInterval(() => {
        setQualityScores(prev => ({
          accuracy: Math.min(prev.accuracy + 3, 96),
          fluency: Math.min(prev.fluency + 2.5, 94),
          contextual: Math.min(prev.contextual + 2.8, 92),
          cultural: Math.min(prev.cultural + 2.2, 89)
        }));
      }, 100);

      const timer = setTimeout(() => clearInterval(scoreInterval), 2000);
      return () => {
        clearInterval(scoreInterval);
        clearTimeout(timer);
      };
    }
  }, [currentStep]);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
  };

  const getLanguageByCode = (code: string) => {
    return availableLanguages.find(lang => lang.code === code);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-400 transform rotate-12 scale-150"></div>
      </div>

      {/* Source Text Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-36 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Languages className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-semibold text-gray-700">Source Text</span>
          </div>
        </div>

        <div className="p-3">
          <div className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-2">
            {sourceText}
          </div>
          
          {/* Language Detection */}
          {currentStep !== 'detecting' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{detectedLanguage.flag}</span>
                <div>
                  <div className="text-xs font-medium text-gray-800">{detectedLanguage.name}</div>
                  <div className="text-xs text-green-600">{detectedLanguage.confidence}% confident</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Language Detection Phase */}
      <AnimatePresence>
        {currentStep === 'detecting' && (
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
                <Globe className="w-8 h-8 text-cyan-500" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700">Detecting Language...</div>
              <div className="space-y-2 w-32">
                {['Syntax', 'Vocabulary', 'Context'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.5, duration: 0.8 }}
                    className="bg-gray-200 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Selection Panel */}
      <AnimatePresence>
        {currentStep === 'selecting' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-cyan-500" />
              <span className="text-sm font-semibold text-gray-700">Target Language</span>
            </div>

            <div className="space-y-1 max-h-32 overflow-y-auto">
              {availableLanguages.map((language, i) => {
                const isSelected = selectedLanguage === language.code;
                
                return (
                  <motion.button
                    key={language.code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-cyan-500 text-white shadow-lg scale-105'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{language.flag}</span>
                        <span className="text-xs font-medium">{language.name}</span>
                      </div>
                      <span className={`text-xs px-1 py-0.5 rounded ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : getDifficultyColor(language.difficulty)
                      }`}>
                        {language.difficulty}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Translation Progress */}
      <AnimatePresence>
        {currentStep === 'translating' && (
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
                <Zap className="w-6 h-6 text-cyan-500" />
              </motion.div>
              <div>
                <div className="text-sm font-medium text-gray-700">Translating to {getLanguageByCode(selectedLanguage)?.name}</div>
                <div className="text-xs text-gray-500">{getLanguageByCode(selectedLanguage)?.flag} Processing context and meaning...</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Progress</span>
                <span>{translationProgress}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${translationProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Translation Steps */}
              <div className="space-y-2">
                {['Analyzing context', 'Preserving meaning', 'Cultural adaptation', 'Quality check'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: translationProgress > i * 25 ? 1 : 0.3,
                      x: translationProgress > i * 25 ? 0 : -10
                    }}
                    className="flex items-center gap-2 text-xs"
                  >
                    {translationProgress > (i + 1) * 25 ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span className={translationProgress > i * 25 ? 'text-gray-700' : 'text-gray-400'}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Translation Result */}
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
                  <ArrowRight className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm font-semibold text-gray-700">Translation Result</span>
                  <span className="text-lg">{getLanguageByCode(selectedLanguage)?.flag}</span>
                </div>
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowComparison(!showComparison)}
                    className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-cyan-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showComparison ? 'Result' : 'Compare'}
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Copy className="w-3 h-3" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Volume2 className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Translation Content */}
            <div className="p-3 max-h-28 overflow-auto">
              <AnimatePresence mode="wait">
                {!showComparison ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-xs text-gray-700 leading-relaxed mb-3">
                      {translations[selectedLanguage as keyof typeof translations]}
                    </div>

                    {/* Quality Scores */}
                    <div className="grid grid-cols-4 gap-3">
                      {Object.entries(qualityScores).map(([metric, score]) => (
                        <motion.div
                          key={metric}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center"
                        >
                          <div className="text-xs font-medium text-gray-700 mb-1 capitalize">{metric}</div>
                          <div className="flex items-center justify-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-1" />
                            <span className="text-xs font-bold text-gray-800">{score}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="comparison"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {/* Original */}
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{detectedLanguage.flag}</span>
                        <span className="text-xs font-medium text-gray-600">Original</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                        {sourceText}
                      </div>
                    </div>

                    {/* Translated */}
                    <div className="bg-cyan-50 rounded-lg p-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{getLanguageByCode(selectedLanguage)?.flag}</span>
                        <span className="text-xs font-medium text-cyan-700">Translated</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-relaxed line-clamp-2">
                        {translations[selectedLanguage as keyof typeof translations]}
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
          className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
        >
          <CheckCircle className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Language Particles */}
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
              {['🌍', '🗣️', '📝', '🎯', '✨', '🔄'][i]}
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
          stroke="url(#translationGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="translationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default TranslationAnimation; 