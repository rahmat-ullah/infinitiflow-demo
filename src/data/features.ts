import { Feature } from '../types/features';
import { Brain, LayoutTemplate, Languages, TrendingUp, RefreshCw, Mail, Share2, Target, Calendar } from 'lucide-react';
import AIContentAnimation from '../components/features/AIContentAnimation';
import SmartTemplatesAnimation from '../components/features/SmartTemplatesAnimation';
import MultiLanguageAnimation from '../components/features/MultiLanguageAnimation';
import SEOOptimizationAnimation from '../components/features/SEOOptimizationAnimation';
import ContentRepurposingAnimation from '../components/features/ContentRepurposingAnimation';
import EmailMarketingAnimation from '../components/features/EmailMarketingAnimation';
import SocialMediaAnimation from '../components/features/SocialMediaAnimation';
import CopywritingAnimation from '../components/features/CopywritingAnimation';
import ContentStrategyAnimation from '../components/features/ContentStrategyAnimation';

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
  },
  {
    id: 6,
    title: "Email Marketing Automation",
    description: "Create personalized email campaigns that engage audiences and boost conversion rates.",
    detailedDescription: "Craft compelling email campaigns with AI-powered subject line generation, personalized content, and optimal send time recommendations. Our email marketing suite includes automated sequences, A/B testing capabilities, and advanced analytics to maximize your email performance and drive revenue growth.",
    icon: Mail,
    animation: EmailMarketingAnimation,
    benefits: [
      "AI-generated subject lines that increase open rates by 55%",
      "Personalized content for each subscriber segment",
      "Automated drip campaigns and sequences",
      "Advanced A/B testing for optimization",
      "Real-time performance analytics and insights"
    ],
    color: "text-indigo-600",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    id: 7,
    title: "Social Media Content Engine",
    description: "Generate platform-optimized social media content with trending hashtags and engagement strategies.",
    detailedDescription: "Scale your social media presence with AI-powered content creation for every major platform. Our social media engine understands platform-specific best practices, trending topics, and audience preferences to create engaging posts that drive interaction and grow your following across all channels.",
    icon: Share2,
    animation: SocialMediaAnimation,
    benefits: [
      "Platform-specific content optimization",
      "Trending hashtag recommendations",
      "Visual content suggestions and captions",
      "Optimal posting time recommendations",
      "Cross-platform content adaptation"
    ],
    color: "text-purple-600",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 8,
    title: "High-Converting Copywriting",
    description: "Create persuasive sales copy and marketing materials that drive conversions and revenue.",
    detailedDescription: "Transform your marketing efforts with AI-powered copywriting that converts. Our advanced algorithms analyze successful campaigns, consumer psychology, and market trends to generate compelling headlines, product descriptions, and sales pages that drive action and increase your bottom line.",
    icon: Target,
    animation: CopywritingAnimation,
    benefits: [
      "Conversion-optimized headlines and CTAs",
      "Psychology-driven persuasive copy",
      "A/B testing variations for optimization",
      "Industry-specific copywriting frameworks",
      "Real-time conversion tracking and insights"
    ],
    color: "text-red-600",
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: 9,
    title: "Content Strategy & Planning",
    description: "Develop comprehensive content strategies with AI-powered insights and performance analytics.",
    detailedDescription: "Elevate your content marketing with intelligent strategy planning and execution. Our AI analyzes your audience, competitors, and market trends to create data-driven content calendars, identify content gaps, and recommend high-impact topics that align with your business goals and drive measurable results.",
    icon: Calendar,
    animation: ContentStrategyAnimation,
    benefits: [
      "AI-powered content calendar planning",
      "Competitive content gap analysis",
      "Performance prediction and optimization",
      "Multi-channel content distribution strategies",
      "ROI tracking and content attribution"
    ],
    color: "text-cyan-600",
    gradient: "from-cyan-500 to-blue-500"
  }
]; 