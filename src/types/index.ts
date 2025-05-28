export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  popular?: boolean;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface IntegrationLogo {
  id: number;
  name: string;
  logoUrl: string;
}

export interface StatItem {
  id: number;
  value: number;
  label: string;
  suffix?: string;
}