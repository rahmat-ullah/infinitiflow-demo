import { Feature } from '../types/features';
import { Brain, LayoutTemplate, Languages, TrendingUp, RefreshCw } from 'lucide-react';
import AIContentAnimation from '../components/features/AIContentAnimation';
import SmartTemplatesAnimation from '../components/features/SmartTemplatesAnimation';
import MultiLanguageAnimation from '../components/features/MultiLanguageAnimation';
import SEOOptimizationAnimation from '../components/features/SEOOptimizationAnimation';
import ContentRepurposingAnimation from '../components/features/ContentRepurposingAnimation';

export const features: Feature[] = [
  {
    id: 1,
    title: "AI-Powered Content Creation",
    description: "Generate high-quality, engaging content in seconds with our advanced AI algorithms.",
    detailedDescription: "Our AI-powered content creation engine leverages state-of-the-art natural language processing models to understand context, tone, and style preferences. Whether you need blog posts, product descriptions, or creative copy, our AI adapts to your voice and brand guidelines to produce content that resonates with your audience.",
    icon: Brain,
    animation: AIContentAnimation,
    benefits: [
      "Generate content 10x faster than traditional methods",
      "Maintain consistent brand voice across all content",
      "Create content in multiple tones and styles",
      "Built-in fact-checking and accuracy validation",
      "Contextual understanding for better relevance"
    ],
    color: "text-[#020043]",
    gradient: "from-[#020043] to-[#4b39cd]"
  },
  {
    id: 2,
    title: "Smart Templates",
    description: "Choose from hundreds of pre-built templates for blogs, ads, social media, and more.",
    detailedDescription: "Our extensive template library covers every content type imaginable, from social media posts to comprehensive white papers. Each template is designed by content experts and powered by AI to ensure optimal performance. The smart template system learns from your preferences and suggests the most effective formats for your specific use cases.",
    icon: LayoutTemplate,
    animation: SmartTemplatesAnimation,
    benefits: [
      "300+ professionally designed templates",
      "Templates optimized for each platform",
      "Custom template creation tools",
      "Performance analytics for each template",
      "Industry-specific template collections"
    ],
    color: "text-green-600",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    title: "Multi-Language Support",
    description: "Create and translate content in over 50 languages with native-level fluency.",
    detailedDescription: "Break down language barriers with our comprehensive multi-language content creation and translation system. Our AI understands cultural nuances, idioms, and regional preferences to ensure your content feels native in every language. Perfect for global brands looking to scale their content strategy internationally.",
    icon: Languages,
    animation: MultiLanguageAnimation,
    benefits: [
      "Support for 50+ languages",
      "Cultural context awareness",
      "Real-time translation capabilities",
      "Regional dialect variations",
      "Localization for different markets"
    ],
    color: "text-blue-600",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 4,
    title: "SEO Optimization",
    description: "Built-in SEO tools that analyze and enhance your content for better search rankings.",
    detailedDescription: "Maximize your content's visibility with our integrated SEO optimization suite. Our AI analyzes search trends, competitor content, and ranking factors to suggest improvements. From keyword density to meta descriptions, every aspect of your content is optimized for search engines while maintaining readability for humans.",
    icon: TrendingUp,
    animation: SEOOptimizationAnimation,
    benefits: [
      "Keyword research and optimization",
      "Competitive analysis insights",
      "Meta tag generation",
      "Content structure recommendations",
      "Performance tracking and analytics"
    ],
    color: "text-yellow-600",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    id: 5,
    title: "Content Repurposing",
    description: "Transform existing content into different formats to maximize your content strategy.",
    detailedDescription: "Maximize the value of your existing content by automatically transforming it into multiple formats. Turn a blog post into social media content, email newsletters, video scripts, or infographics. Our intelligent repurposing engine maintains the core message while adapting the format, tone, and structure for each specific platform.",
    icon: RefreshCw,
    animation: ContentRepurposingAnimation,
    benefits: [
      "One-click format transformation",
      "Platform-specific optimization",
      "Maintain brand consistency",
      "Increase content reach and engagement",
      "Save time and resources"
    ],
    color: "text-pink-600",
    gradient: "from-pink-500 to-purple-500"
  }
]; 