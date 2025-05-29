export interface TestimonialResult {
  metric: string;
  value: string;
  improvement: string;
  description: string;
}

export interface TestimonialImplementation {
  duration: string;
  challenges: string[];
  solutions: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  location: string;
  date: string;
  quote: string;
  longQuote: string;
  image: string;
  rating: number;
  featured: boolean;
  verified: boolean;
  videoUrl?: string | null;
  results: TestimonialResult[];
  tags: string[];
  useCase: string;
  companySize: string;
  implementation: TestimonialImplementation;
}

export interface CustomerMetric {
  id: string;
  title: string;
  value: string;
  description: string;
  category: string;
}

export interface TestimonialFilters {
  industries: FilterOption[];
  companySizes: FilterOption[];
  tags: FilterOption[];
  useCases: FilterOption[];
  ratings: FilterOption[];
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface TestimonialQuery {
  industry?: string;
  featured?: boolean;
  verified?: boolean;
  companySize?: string;
  rating?: number;
  hasVideo?: boolean;
  tag?: string;
  sortBy?: 'date' | 'rating' | 'name' | 'company';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface TestimonialResponse {
  status: string;
  results: number;
  pagination?: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
  data: {
    testimonials: Testimonial[];
  };
}

export interface SingleTestimonialResponse {
  status: string;
  data: {
    testimonial: Testimonial;
  };
}

export interface CustomerMetricsResponse {
  status: string;
  results: number;
  data: {
    metrics: CustomerMetric[];
  };
}

export interface TestimonialFiltersResponse {
  status: string;
  data: {
    filters: TestimonialFilters;
  };
} 