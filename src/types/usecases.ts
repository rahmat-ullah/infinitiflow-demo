import { LucideIcon } from 'lucide-react';

export interface UseCase {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
  category: 'content' | 'marketing' | 'sales' | 'strategy';
  benefits: string[];
  examples: string[];
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
}

export interface RoleSolution {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  useCases: string[];
}

export interface IndustrySolution {
  id: string;
  title: string;
  description: string;
  icon: string;
  specialFeatures: string[];
  commonUseCases: string[];
} 