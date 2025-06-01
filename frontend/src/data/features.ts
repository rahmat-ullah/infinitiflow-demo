import { Feature } from '../types/features';
import { 
  Brain, LayoutTemplate, Languages, TrendingUp, RefreshCw, Mail, Share2, Target, Calendar,
  MessageCircle, Edit3, FileText, CheckCircle, FileDigit, Sparkles, Search, Table,
  BarChart3, Globe, BookOpen, AlertTriangle, Building2, Database, GitCompare,
  Shield, MapPin, Scale, FileBarChart, Hash
} from 'lucide-react';
import AIContentAnimation from '../components/features/AIContentAnimation';
import SmartTemplatesAnimation from '../components/features/SmartTemplatesAnimation';
import MultiLanguageAnimation from '../components/features/MultiLanguageAnimation';
import SEOOptimizationAnimation from '../components/features/SEOOptimizationAnimation';
import ContentRepurposingAnimation from '../components/features/ContentRepurposingAnimation';
import EmailMarketingAnimation from '../components/features/EmailMarketingAnimation';
import SocialMediaAnimation from '../components/features/SocialMediaAnimation';
import CopywritingAnimation from '../components/features/CopywritingAnimation';
import ContentStrategyAnimation from '../components/features/ContentStrategyAnimation';
import ChatAssistantAnimation from '../components/features/ChatAssistantAnimation';
import AIEditAnimation from '../components/features/AIEditAnimation';
import DocumentRefinementAnimation from '../components/features/DocumentRefinementAnimation';
import ProofreadingAnimation from '../components/features/ProofreadingAnimation';
import TextSummarizationAnimation from '../components/features/TextSummarizationAnimation';
import ContentImprovementAnimation from '../components/features/ContentImprovementAnimation';
import ContentSuggestionsAnimation from '../components/features/ContentSuggestionsAnimation';
import MarkdownTableAnimation from '../components/features/MarkdownTableAnimation';
import DiagramGeneratorAnimation from '../components/features/DiagramGeneratorAnimation';
import TranslationAnimation from '../components/features/TranslationAnimation';
import TextSimplificationAnimation from '../components/features/TextSimplificationAnimation';
import RiskFinderAnimation from '../components/features/RiskFinderAnimation';
import RFPFinderAnimation from '../components/features/RFPFinderAnimation';
import VectorDatabaseAnimation from '../components/features/VectorDatabaseAnimation';
import DocumentComparisonAnimation from '../components/features/DocumentComparisonAnimation';
import ComplianceCheckerAnimation from '../components/features/ComplianceCheckerAnimation';
import EntityMapperAnimation from '../components/features/EntityMapperAnimation';
import ArgumentAnalyzerAnimation from '../components/features/ArgumentAnalyzerAnimation';
import StructuredDataExtractorAnimation from '../components/features/StructuredDataExtractorAnimation';
import AcronymManagerAnimation from '../components/features/AcronymManagerAnimation';
import DefaultFeatureAnimation from '../components/features/DefaultFeatureAnimation';

// Create wrapper components for features using DefaultFeatureAnimation

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
  },
  {
    id: 10,
    title: "Chat Assistant",
    description: "Get real-time assistance and answers to document-related questions through an intelligent chat interface.",
    detailedDescription: "Users can ask questions about their document and receive AI-generated responses through a chat interface. The system analyzes the document content and uses OpenAI's API to generate context-aware answers, providing real-time assistance and helping users understand complex content without leaving Microsoft Word.",
    icon: MessageCircle,
    animation: ChatAssistantAnimation,
    benefits: [
      "Real-time document analysis and Q&A",
      "Context-aware AI responses",
      "Instant help without leaving your document",
      "Complex content explanation and clarification",
      "24/7 intelligent document assistance"
    ],
    color: "text-blue-600",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 11,
    title: "AI Edit",
    description: "Select text and provide editing instructions for AI-generated improvements with side-by-side comparison.",
    detailedDescription: "Users can select text and provide editing instructions. The AI generates an improved version with side-by-side comparison, allowing users to accept or reject changes. This enhances writing quality with smart text improvements, saves time on manual editing, and provides context-sensitive editing suggestions while giving users final control over changes.",
    icon: Edit3,
    animation: AIEditAnimation,
    benefits: [
      "Smart text improvements with AI assistance",
      "Side-by-side comparison for review",
      "Context-sensitive editing suggestions",
      "User control over final changes",
      "Time-saving automated editing workflow"
    ],
    color: "text-green-600",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 12,
    title: "Document Refinement",
    description: "Analyze and improve entire document structure, organization, and content flow comprehensively.",
    detailedDescription: "Analyzes the entire document structure, organization, and content flow, then suggests comprehensive improvements to enhance overall quality. This improves document structure, flow, and readability with minimal effort, creating more professional and polished documents.",
    icon: FileText,
    animation: DocumentRefinementAnimation,
    benefits: [
      "Comprehensive document structure analysis",
      "Organization and flow improvements",
      "Enhanced readability and professionalism",
      "Minimal effort for maximum impact",
      "Overall quality enhancement"
    ],
    color: "text-blue-600",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 13,
    title: "Proofreading",
    description: "Scan text for grammar, spelling, style, and clarity issues with detailed explanations and corrections.",
    detailedDescription: "Scans selected text for grammar, spelling, style, and clarity issues, then provides detailed explanations and suggested corrections. This ensures error-free documents, improves writing quality, and educates users on proper grammar and style.",
    icon: CheckCircle,
    animation: ProofreadingAnimation,
    benefits: [
      "Comprehensive grammar and spelling check",
      "Style and clarity improvements",
      "Detailed explanations for corrections",
      "Educational feedback on writing quality",
      "Error-free document guarantee"
    ],
    color: "text-red-600",
    gradient: "from-red-500 to-pink-500"
  },
  {
    id: 14,
    title: "Text Summarization",
    description: "Create concise summaries of selected text at different lengths using advanced AI.",
    detailedDescription: "Creates concise summaries of selected text at different lengths (short, medium, long) using AI. This helps users quickly understand lengthy documents, create executive summaries, and extract key points from complex content.",
    icon: FileDigit,
    animation: TextSummarizationAnimation,
    benefits: [
      "Multiple summary length options",
      "Quick understanding of lengthy content",
      "Executive summary generation",
      "Key point extraction",
      "Time-saving content digestion"
    ],
    color: "text-purple-600",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 15,
    title: "Content Improvement",
    description: "Analyze content quality, clarity, and engagement to make writing more effective and impactful.",
    detailedDescription: "Analyzes content quality, clarity, and engagement, then suggests improvements to make writing more effective and impactful. This enhances the quality and impact of writing, making documents more engaging and persuasive.",
    icon: Sparkles,
    animation: ContentImprovementAnimation,
    benefits: [
      "Content quality analysis",
      "Clarity and engagement improvements",
      "More effective and impactful writing",
      "Enhanced persuasiveness",
      "Professional content enhancement"
    ],
    color: "text-yellow-600",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    id: 16,
    title: "Content Suggestions",
    description: "Generate search queries and find relevant web content across multiple search engines with categorized results.",
    detailedDescription: "Generates search queries based on document content and finds relevant web content across multiple search engines. Results are categorized with tags for easy reference, providing valuable research support and helping users discover relevant resources without switching between applications.",
    icon: Search,
    animation: ContentSuggestionsAnimation,
    benefits: [
      "Automated search query generation",
      "Multi-search engine results",
      "Categorized and tagged results",
      "Valuable research support",
      "In-app resource discovery"
    ],
    color: "text-green-600",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 17,
    title: "Markdown Table",
    description: "Convert selected text or generate structured table content in Markdown format for easy insertion.",
    detailedDescription: "Converts selected text or generates structured table content in Markdown format, which can be inserted into the document. This simplifies creating structured data in documents and enables easy conversion between formats.",
    icon: Table,
    animation: MarkdownTableAnimation,
    benefits: [
      "Text to table conversion",
      "Markdown format generation",
      "Structured data creation",
      "Format conversion capabilities",
      "Easy document integration"
    ],
    color: "text-gray-600",
    gradient: "from-gray-500 to-slate-500"
  },
  {
    id: 18,
    title: "Diagram Generator",
    description: "Create visual diagrams and flowcharts using Mermaid syntax based on user instructions or content.",
    detailedDescription: "Creates visual diagrams and flowcharts using the Mermaid syntax based on user instructions or selected content. This enhances documents with visual representations of concepts, processes, or relationships without requiring design skills.",
    icon: BarChart3,
    animation: DiagramGeneratorAnimation,
    benefits: [
      "Visual diagram creation",
      "Flowchart generation",
      "Mermaid syntax support",
      "No design skills required",
      "Enhanced document visualization"
    ],
    color: "text-indigo-600",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    id: 19,
    title: "Translation",
    description: "Translate selected text into multiple languages while preserving formatting and context.",
    detailedDescription: "Translates selected text into multiple languages while preserving formatting and context. This facilitates multilingual communication and document creation without requiring language expertise.",
    icon: Globe,
    animation: TranslationAnimation,
    benefits: [
      "Multi-language translation",
      "Format and context preservation",
      "Multilingual communication support",
      "No language expertise required",
      "Global document accessibility"
    ],
    color: "text-cyan-600",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    id: 20,
    title: "Text Simplification",
    description: "Rewrite complex text into more accessible language, adjusting for reading level and clarity.",
    detailedDescription: "Rewrites complex text into more accessible language, adjusting for reading level and clarity. This makes documents more accessible to diverse audiences and improves comprehension of complex topics.",
    icon: BookOpen,
    animation: TextSimplificationAnimation,
    benefits: [
      "Complex text simplification",
      "Reading level adjustment",
      "Enhanced accessibility",
      "Improved comprehension",
      "Diverse audience reach"
    ],
    color: "text-green-600",
    gradient: "from-green-500 to-teal-500"
  },
  {
    id: 21,
    title: "Risk Finder",
    description: "Scan documents for potential risks, legal issues, or problematic content with highlighted areas of concern.",
    detailedDescription: "Scans documents for potential risks, legal issues, or problematic content, highlighting areas of concern. This reduces legal exposure, identifies potential issues before document release, and improves compliance.",
    icon: AlertTriangle,
    animation: RiskFinderAnimation,
    benefits: [
      "Risk and legal issue detection",
      "Problematic content identification",
      "Reduced legal exposure",
      "Pre-release issue identification",
      "Improved compliance"
    ],
    color: "text-red-600",
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: 22,
    title: "RFP & RFQ Finder",
    description: "Search for similar RFPs, RFQs, tenders, and opportunities based on document content.",
    detailedDescription: "Searches for similar Requests for Proposals (RFPs), Requests for Quotations (RFQs), tenders, and opportunities based on document content. This helps businesses identify relevant opportunities, understand competitive landscape, and save time in procurement research.",
    icon: Building2,
    animation: RFPFinderAnimation,
    benefits: [
      "Relevant opportunity identification",
      "Competitive landscape understanding",
      "Procurement research automation",
      "Time-saving opportunity discovery",
      "Business development support"
    ],
    color: "text-purple-600",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    id: 23,
    title: "Vector Database",
    description: "Store and retrieve document embeddings for semantic search and comparison across documents.",
    detailedDescription: "Stores and retrieves document embeddings for semantic search and comparison across documents. This enables advanced document comparisons, semantic searching, and content recommendations based on meaning rather than keywords.",
    icon: Database,
    animation: VectorDatabaseAnimation,
    benefits: [
      "Semantic search capabilities",
      "Advanced document comparison",
      "Meaning-based content recommendations",
      "Document embedding storage",
      "Intelligent content retrieval"
    ],
    color: "text-slate-600",
    gradient: "from-slate-500 to-gray-500"
  },
  {
    id: 24,
    title: "Document Comparison",
    description: "Compare different versions of documents or sections, highlighting changes, additions, and deletions.",
    detailedDescription: "Compares different versions of documents or sections, highlighting changes, additions, and deletions. This simplifies document version management, tracks changes effectively, and helps users understand document evolution.",
    icon: GitCompare,
    animation: DocumentComparisonAnimation,
    benefits: [
      "Version comparison and tracking",
      "Change highlighting and visualization",
      "Document evolution understanding",
      "Simplified version management",
      "Effective change tracking"
    ],
    color: "text-blue-600",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 25,
    title: "Compliance Checker",
    description: "Validate documents against regulatory requirements, style guides, or organizational policies.",
    detailedDescription: "Validates documents against regulatory requirements, style guides, or organizational policies. This ensures documents meet required standards, reduces compliance risk, and maintains organizational consistency.",
    icon: Shield,
    animation: ComplianceCheckerAnimation,
    benefits: [
      "Regulatory compliance validation",
      "Style guide adherence",
      "Policy compliance checking",
      "Risk reduction",
      "Organizational consistency"
    ],
    color: "text-emerald-600",
    gradient: "from-emerald-500 to-green-500"
  },
  {
    id: 26,
    title: "Entity Mapper",
    description: "Identify and categorize named entities like people, organizations, and locations in documents.",
    detailedDescription: "Identifies and categorizes named entities (people, organizations, locations, etc.) in documents. This improves document metadata, enables advanced entity-based search, and helps organize information.",
    icon: MapPin,
    animation: EntityMapperAnimation,
    benefits: [
      "Named entity recognition",
      "Entity categorization",
      "Enhanced document metadata",
      "Entity-based search capabilities",
      "Improved information organization"
    ],
    color: "text-orange-600",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 27,
    title: "Argument Analyzer",
    description: "Examine argumentative structure in documents, identifying claims, evidence, and logical flow.",
    detailedDescription: "Examines argumentative structure in documents, identifying claims, evidence, and logical flow. This strengthens persuasive documents, improves argument quality, and helps identify weak points in reasoning.",
    icon: Scale,
    animation: ArgumentAnalyzerAnimation,
    benefits: [
      "Argumentative structure analysis",
      "Claims and evidence identification",
      "Logical flow examination",
      "Argument quality improvement",
      "Reasoning weakness detection"
    ],
    color: "text-violet-600",
    gradient: "from-violet-500 to-purple-500"
  },
  {
    id: 28,
    title: "Structured Data Extractor",
    description: "Identify and extract structured information from unstructured text like dates, prices, and measurements.",
    detailedDescription: "Identifies and extracts structured information from unstructured text (like dates, prices, measurements, etc.). This automates data extraction, enables data analysis from documents, and simplifies information processing.",
    icon: FileBarChart,
    animation: StructuredDataExtractorAnimation,
    benefits: [
      "Automated data extraction",
      "Structured information identification",
      "Document data analysis",
      "Simplified information processing",
      "Unstructured to structured conversion"
    ],
    color: "text-teal-600",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    id: 29,
    title: "Acronym Manager",
    description: "Identify, define, and manage acronyms throughout documents for consistency and clarity.",
    detailedDescription: "Identifies, defines, and manages acronyms throughout documents, ensuring consistency and clarity. This improves document clarity, maintains consistent acronym usage, and helps readers understand specialized terminology.",
    icon: Hash,
    animation: AcronymManagerAnimation,
    benefits: [
      "Acronym identification and definition",
      "Consistent usage management",
      "Document clarity improvement",
      "Terminology understanding",
      "Specialized content accessibility"
    ],
    color: "text-pink-600",
    gradient: "from-pink-500 to-rose-500"
  }
]; 