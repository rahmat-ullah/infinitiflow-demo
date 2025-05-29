import {
  Testimonial,
  CustomerMetric,
  TestimonialFilters,
  TestimonialQuery,
  TestimonialResponse,
  SingleTestimonialResponse,
  CustomerMetricsResponse,
  TestimonialFiltersResponse
} from '../types/testimonials';

const API_BASE_URL = 'http://localhost:5001/api';

class TestimonialsApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Testimonials API request failed:', error);
      throw error;
    }
  }

  // Get all testimonials with filtering and pagination
  async getTestimonials(params?: TestimonialQuery): Promise<TestimonialResponse> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const url = `/testimonials${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<TestimonialResponse>(url);
  }

  // Get single testimonial by ID
  async getTestimonial(id: string): Promise<SingleTestimonialResponse> {
    return this.request<SingleTestimonialResponse>(`/testimonials/${id}`);
  }

  // Get customer metrics
  async getCustomerMetrics(): Promise<CustomerMetricsResponse> {
    return this.request<CustomerMetricsResponse>('/testimonials/metrics');
  }

  // Get testimonial filters
  async getTestimonialFilters(): Promise<TestimonialFiltersResponse> {
    return this.request<TestimonialFiltersResponse>('/testimonials/filters');
  }

  // Get featured testimonials
  async getFeaturedTestimonials(limit?: number): Promise<TestimonialResponse> {
    const params: TestimonialQuery = { 
      featured: true,
      limit: limit || 10,
      sortBy: 'date',
      order: 'desc'
    };
    return this.getTestimonials(params);
  }

  // Get testimonials by industry
  async getTestimonialsByIndustry(industry: string, limit?: number): Promise<TestimonialResponse> {
    const params: TestimonialQuery = { 
      industry,
      limit: limit || 10,
      sortBy: 'date',
      order: 'desc'
    };
    return this.getTestimonials(params);
  }

  // Get testimonials with video
  async getVideoTestimonials(limit?: number): Promise<TestimonialResponse> {
    const params: TestimonialQuery = { 
      hasVideo: true,
      limit: limit || 10,
      sortBy: 'date',
      order: 'desc'
    };
    return this.getTestimonials(params);
  }

  // CRUD Operations (for admin use)
  async createTestimonial(testimonialData: Partial<Testimonial>): Promise<Testimonial> {
    return this.request<Testimonial>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonialData),
    });
  }

  async updateTestimonial(id: string, testimonialData: Partial<Testimonial>): Promise<Testimonial> {
    return this.request<Testimonial>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonialData),
    });
  }

  async deleteTestimonial(id: string): Promise<{ message: string; testimonial: Testimonial }> {
    return this.request<{ message: string; testimonial: Testimonial }>(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async checkHealth(): Promise<any> {
    const url = `${this.baseURL.replace('/api', '')}/health`;
    const response = await fetch(url);
    return response.json();
  }
}

// Create and export a singleton instance
export const testimonialsApiClient = new TestimonialsApiClient();

// Export specific API functions for testimonials
export const testimonialsApi = {
  getTestimonials: (params?: TestimonialQuery) => 
    testimonialsApiClient.getTestimonials(params),
  
  getTestimonial: (id: string) => 
    testimonialsApiClient.getTestimonial(id),
  
  getCustomerMetrics: () => 
    testimonialsApiClient.getCustomerMetrics(),
  
  getTestimonialFilters: () => 
    testimonialsApiClient.getTestimonialFilters(),
  
  getFeaturedTestimonials: (limit?: number) => 
    testimonialsApiClient.getFeaturedTestimonials(limit),
  
  getTestimonialsByIndustry: (industry: string, limit?: number) => 
    testimonialsApiClient.getTestimonialsByIndustry(industry, limit),
  
  getVideoTestimonials: (limit?: number) => 
    testimonialsApiClient.getVideoTestimonials(limit),
};

export default testimonialsApiClient; 