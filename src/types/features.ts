export interface Feature {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  icon: React.ComponentType<any>;
  animation: React.ComponentType<any>;
  benefits: string[];
  color: string;
  gradient: string;
} 