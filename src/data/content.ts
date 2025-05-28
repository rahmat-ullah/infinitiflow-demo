import { FeatureItem, TestimonialItem, PricingPlan, FAQItem, IntegrationLogo, StatItem } from '../types';

export const features: FeatureItem[] = [
  {
    id: 1,
    title: "AI-Powered Content Creation",
    description: "Generate high-quality, engaging content in seconds with our advanced AI algorithms trained on diverse writing styles.",
    icon: "Sparkles"
  },
  {
    id: 2,
    title: "Smart Templates",
    description: "Choose from hundreds of pre-built templates for blogs, ads, social media, and more, or create your own custom templates.",
    icon: "LayoutTemplate"
  },
  {
    id: 3,
    title: "Multi-Language Support",
    description: "Create and translate content in over 50 languages, ensuring your message reaches a global audience effortlessly.",
    icon: "Globe"
  },
  {
    id: 4,
    title: "SEO Optimization",
    description: "Built-in SEO tools analyze and enhance your content for better search engine rankings and organic visibility.",
    icon: "Search"
  },
  {
    id: 5,
    title: "Content Repurposing",
    description: "Transform existing content into different formats and styles to maximize your content strategy efficiency.",
    icon: "Repeat"
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechGrowth Inc.",
    quote: "This AI content tool has revolutionized our content creation process. We've increased our output by 300% while maintaining high quality and relevance.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Content Strategist",
    company: "MediaPulse",
    quote: "The ROI has been incredible. We've cut our content production costs by 60% while doubling our engagement metrics across all channels.",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "CEO",
    company: "Startup Accelerate",
    quote: "As a startup founder, I needed a solution that could scale with us. This platform delivers enterprise-quality content without the enterprise price tag.",
    image: "https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: {
      monthly: 29,
      yearly: 290
    },
    description: "Perfect for individuals and small teams just getting started",
    features: [
      "10,000 words per month",
      "5 user seats",
      "Basic templates",
      "Standard support",
      "API access (100 calls/day)"
    ]
  },
  {
    id: "professional",
    name: "Professional",
    price: {
      monthly: 79,
      yearly: 790
    },
    description: "Ideal for growing businesses and content teams",
    features: [
      "50,000 words per month",
      "15 user seats",
      "Advanced templates",
      "Priority support",
      "API access (500 calls/day)",
      "SEO optimization tools",
      "Content analytics"
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: {
      monthly: 199,
      yearly: 1990
    },
    description: "Custom solutions for large organizations",
    features: [
      "Unlimited words",
      "Unlimited user seats",
      "Custom templates",
      "Dedicated account manager",
      "Unlimited API access",
      "Advanced analytics",
      "Custom integrations",
      "Enterprise SSO",
      "SLA guarantees"
    ]
  }
];

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How does the AI content generation work?",
    answer: "Our AI uses advanced machine learning models trained on diverse datasets to generate human-like content. Simply input your topic or requirements, and the AI will create relevant, high-quality content tailored to your needs."
  },
  {
    id: 2,
    question: "Is the generated content unique and plagiarism-free?",
    answer: "Yes, all content created by our AI is original and plagiarism-free. Our system generates unique content for each request, and we include built-in plagiarism detection to ensure originality."
  },
  {
    id: 3,
    question: "Can I edit the generated content?",
    answer: "Absolutely! All generated content is fully editable. Our platform includes a robust editor that allows you to refine, modify, and personalize the AI-generated content to match your exact requirements."
  },
  {
    id: 4,
    question: "Which languages are supported?",
    answer: "Our platform currently supports over 50 languages, including English, Spanish, French, German, Chinese, Japanese, and many more. We're continually adding support for additional languages."
  },
  {
    id: 5,
    question: "How do I get started?",
    answer: "Getting started is easy! Simply sign up for a free trial, select a plan that suits your needs, and you can begin generating content immediately. No credit card is required for the trial."
  }
];

export const integrationLogos: IntegrationLogo[] = [
  {
    id: 1,
    name: "WordPress",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/wordpress-blue.svg"
  },
  {
    id: 2,
    name: "Shopify",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/shopify.svg"
  },
  {
    id: 3,
    name: "HubSpot",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/hubspot.svg"
  },
  {
    id: 4,
    name: "Mailchimp",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon.svg"
  },
  {
    id: 5,
    name: "Slack",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg"
  },
  {
    id: 6,
    name: "Zapier",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg"
  }
];

export const stats: StatItem[] = [
  {
    id: 1,
    value: 10,
    label: "Content Creation Time",
    suffix: "x faster"
  },
  {
    id: 2,
    value: 60,
    label: "Cost Reduction",
    suffix: "%"
  },
  {
    id: 3,
    value: 300,
    label: "Content Output",
    suffix: "% increase"
  },
  {
    id: 4,
    value: 1000,
    label: "Happy Customers",
    suffix: "+"
  }
];