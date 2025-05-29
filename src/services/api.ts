import { UseCase, RoleSolution, IndustrySolution } from '../types/usecases';
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

interface ApiResponse<T> {
  status: 'success' | 'error';
  results?: number;
  data?: T;
  message?: string;
}

// API Response Types
interface UseCasesResponse {
  useCases: UseCase[];
  success: boolean;
}

interface UseCaseResponse {
  useCase: UseCase;
  success: boolean;
}

interface RoleSolutionsResponse {
  roleSolutions: RoleSolution[];
  success: boolean;
}

interface RoleSolutionResponse {
  roleSolution: RoleSolution;
  success: boolean;
}

interface IndustrySolutionsResponse {
  industrySolutions: IndustrySolution[];
  success: boolean;
}

interface IndustrySolutionResponse {
  industrySolution: IndustrySolution;
  success: boolean;
}

interface CategoriesResponse {
  categories: string[];
  success: boolean;
}

// Testimonials Response Types
interface TestimonialsApiResponse {
  testimonials: Testimonial[];
  success: boolean;
}

interface TestimonialApiResponse {
  testimonial: Testimonial;
  success: boolean;
}

interface CustomerMetricsApiResponse {
  metrics: CustomerMetric[];
  success: boolean;
}

interface TestimonialFiltersApiResponse {
  filters: TestimonialFilters;
  success: boolean;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
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
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Use Cases API methods
  async getUseCases(params?: { category?: string; featured?: boolean }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    
    const url = `/usecases${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<UseCasesResponse>(url);
  }

  async getUseCase(id: string) {
    return this.request<UseCaseResponse>(`/usecases/${id}`);
  }

  async createUseCase(data: any) {
    return this.request<UseCaseResponse>('/usecases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async updateUseCase(id: string, data: any) {
    return this.request<UseCaseResponse>(`/usecases/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async deleteUseCase(id: string) {
    return this.request<{ message: string; useCase: any }>(`/usecases/${id}`, {
      method: 'DELETE',
    });
  }

  async getCategories() {
    return this.request<CategoriesResponse>('/usecases/categories');
  }

  // Role Solutions API methods
  async getRoleSolutions() {
    return this.request<RoleSolutionsResponse>('/usecases/role-solutions');
  }

  async createRoleSolution(data: any) {
    return this.request<RoleSolutionResponse>('/usecases/role-solutions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async updateRoleSolution(id: string, data: any) {
    return this.request<RoleSolutionResponse>(`/usecases/role-solutions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async deleteRoleSolution(id: string) {
    return this.request<{ message: string; roleSolution: any }>(`/usecases/role-solutions/${id}`, {
      method: 'DELETE',
    });
  }

  // Industry Solutions API methods
  async getIndustrySolutions() {
    return this.request<IndustrySolutionsResponse>('/usecases/industry-solutions');
  }

  async createIndustrySolution(data: any) {
    return this.request<IndustrySolutionResponse>('/usecases/industry-solutions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async updateIndustrySolution(id: string, data: any) {
    return this.request<IndustrySolutionResponse>(`/usecases/industry-solutions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async deleteIndustrySolution(id: string) {
    return this.request<{ message: string; industrySolution: any }>(`/usecases/industry-solutions/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async checkHealth() {
    const url = `${this.baseURL.replace('/api', '')}/health`;
    const response = await fetch(url);
    return response.json();
  }

  // Testimonials API methods
  async getTestimonials(params?: TestimonialQuery) {
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

  async getTestimonial(id: string) {
    return this.request<SingleTestimonialResponse>(`/testimonials/${id}`);
  }

  async getCustomerMetrics() {
    return this.request<CustomerMetricsResponse>('/testimonials/metrics');
  }

  async getTestimonialFilters() {
    return this.request<TestimonialFiltersResponse>('/testimonials/filters');
  }

  async createTestimonial(data: Partial<Testimonial>) {
    return this.request<TestimonialApiResponse>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id: string, data: Partial<Testimonial>) {
    return this.request<TestimonialApiResponse>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id: string) {
    return this.request<{ message: string; testimonial: Testimonial }>(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();

// Export specific API functions for use cases
export const useCasesApi = {
  getUseCases: (params?: { category?: string; featured?: boolean }) => 
    apiClient.getUseCases(params),
  getUseCase: (id: string) => 
    apiClient.getUseCase(id),
  getCategories: () => 
    apiClient.getCategories(),
  getRoleSolutions: () => 
    apiClient.getRoleSolutions(),
  getIndustrySolutions: () => 
    apiClient.getIndustrySolutions(),
};

// Export specific API functions for testimonials
export const testimonialsApiService = {
  getTestimonials: (params?: TestimonialQuery) => 
    apiClient.getTestimonials(params),
  getTestimonial: (id: string) => 
    apiClient.getTestimonial(id),
  getCustomerMetrics: () => 
    apiClient.getCustomerMetrics(),
  getTestimonialFilters: () => 
    apiClient.getTestimonialFilters(),
  createTestimonial: (data: Partial<Testimonial>) => 
    apiClient.createTestimonial(data),
  updateTestimonial: (id: string, data: Partial<Testimonial>) => 
    apiClient.updateTestimonial(id, data),
  deleteTestimonial: (id: string) => 
    apiClient.deleteTestimonial(id),
};

export default apiClient; 