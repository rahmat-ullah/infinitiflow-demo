export interface Feature {
  title: string;
  description: string;
  icon: string;
  isVisible: boolean;
  order: number;
}

export interface FeatureBadge {
  text: string;
  icon?: string;
}

export interface FeatureTheme {
  showIcons: boolean;
  cardStyle: 'default' | 'minimal' | 'featured';
  columns: number;
}

export interface FeatureSection {
  _id?: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  sectionDescription?: string;
  badge?: FeatureBadge;
  features: Feature[];
  isActive: boolean;
  version: string;
  maxFeatures?: number;
  displayMode: 'grid' | 'list' | 'carousel';
  theme?: FeatureTheme;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeatureApiResponse {
  success: boolean;
  data: FeatureSection;
  error?: string;
  details?: string[];
}

export interface FeatureListResponse {
  success: boolean;
  data: {
    featureSections: FeatureSection[];
    pagination: {
      current: number;
      total: number;
      totalItems: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  error?: string;
} 