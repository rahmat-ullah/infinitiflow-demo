export interface HeroCTA {
  text: string;
  url: string;
  style: 'primary' | 'secondary' | 'outline';
  icon?: string;
}

export interface HeroFloatingElement {
  _id?: string;
  text: string;
  type: 'badge' | 'indicator' | 'feature';
  position: string;
  color?: string;
  icon?: string;
}

export interface HeroStat {
  _id?: string;
  label: string;
  value: string;
  description?: string;
}

export interface HeroFeature {
  _id?: string;
  icon: string;
  title: string;
  description: string;
}

export interface HeroTheme {
  particles?: boolean;
  animations?: boolean;
  gradientEffects?: boolean;
}

export interface HeroSection {
  _id?: string;
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  description: string;
  primaryCTA: HeroCTA;
  secondaryCTA?: HeroCTA;
  additionalInfo?: string;
  heroImage?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  floatingElements?: HeroFloatingElement[];
  stats?: HeroStat[];
  features?: HeroFeature[];
  theme?: HeroTheme;
  isActive: boolean;
  version: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroApiResponse {
  success: boolean;
  data: HeroSection;
  error?: string;
  details?: string[];
} 