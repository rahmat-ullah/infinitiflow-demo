const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating?: number;
  location?: string;
  industry?: string;
  companySize?: string;
  videoUrl?: string;
  featured: boolean;
  active: boolean;
  displayOrder: number;
  tags: string[];
  dateSubmitted?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestimonialFilters {
  page?: number;
  limit?: number;
  featured?: boolean;
  industry?: string;
  minRating?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: 'active' | 'inactive' | 'featured';
}

export interface TestimonialResponse {
  success: boolean;
  data: {
    testimonials: Testimonial[];
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

export interface TestimonialStats {
  total: number;
  active: number;
  featured: number;
  avgRating: number;
  byIndustry: Array<{ _id: string; count: number; avgRating: number }>;
}

class TestimonialsApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Public endpoints
  async getTestimonials(filters: TestimonialFilters = {}): Promise<TestimonialResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    return this.request<TestimonialResponse>(
      `/testimonials${queryString ? `?${queryString}` : ''}`
    );
  }

  async getFeaturedTestimonials(limit = 3): Promise<{ success: boolean; data: Testimonial[] }> {
    const url = `/testimonials/featured?limit=${limit}`;
    console.log('🌐 Making API request to:', `${API_BASE_URL}${url}`);
    return this.request<{ success: boolean; data: Testimonial[] }>(url);
  }

  async getRandomTestimonials(limit = 3): Promise<{ success: boolean; data: Testimonial[] }> {
    return this.request<{ success: boolean; data: Testimonial[] }>(
      `/testimonials/random?limit=${limit}`
    );
  }

  async getTestimonialById(id: string): Promise<{ success: boolean; data: Testimonial }> {
    return this.request<{ success: boolean; data: Testimonial }>(`/testimonials/${id}`);
  }

  // Admin endpoints
  async getAllTestimonials(filters: TestimonialFilters = {}): Promise<TestimonialResponse> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    return this.request<TestimonialResponse>(
      `/testimonials/admin/all${queryString ? `?${queryString}` : ''}`
    );
  }

  async createTestimonial(testimonial: Omit<Testimonial, '_id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data: Testimonial }> {
    return this.request<{ success: boolean; data: Testimonial }>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonial),
    });
  }

  async updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<{ success: boolean; data: Testimonial }> {
    return this.request<{ success: boolean; data: Testimonial }>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonial),
    });
  }

  async toggleActiveStatus(id: string): Promise<{ success: boolean; data: Testimonial; message: string }> {
    return this.request<{ success: boolean; data: Testimonial; message: string }>(
      `/testimonials/${id}/toggle-active`,
      { method: 'PATCH' }
    );
  }

  async toggleFeaturedStatus(id: string): Promise<{ success: boolean; data: Testimonial; message: string }> {
    return this.request<{ success: boolean; data: Testimonial; message: string }>(
      `/testimonials/${id}/toggle-featured`,
      { method: 'PATCH' }
    );
  }

  async deleteTestimonial(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  async uploadImage(file: File): Promise<{ success: boolean; data: { url: string; filename: string } }> {
    console.log('📤 Uploading testimonial image:', {
      name: file.name,
      size: file.size,
      type: file.type
    });
    
    const formData = new FormData();
    formData.append('image', file);

    console.log('🌐 Making upload request to:', `${API_BASE_URL}/testimonials/upload/image`);

    const response = await fetch(`${API_BASE_URL}/testimonials/upload/image`, {
      method: 'POST',
      body: formData,
    });

    console.log('📨 Upload response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Upload failed:', errorData);
      throw new Error(errorData.error || 'Failed to upload image');
    }

    const result = await response.json();
    console.log('✅ Upload successful:', result);
    return result;
  }

  // Statistics and metadata
  async getStats(): Promise<{ success: boolean; data: TestimonialStats }> {
    return this.request<{ success: boolean; data: TestimonialStats }>('/testimonials/stats/summary');
  }

  async getIndustries(): Promise<{ success: boolean; data: Array<{ name: string; count: number }> }> {
    return this.request<{ success: boolean; data: Array<{ name: string; count: number }> }>(
      '/testimonials/meta/industries'
    );
  }

  async getCompanies(): Promise<{ success: boolean; data: Array<{ name: string; count: number }> }> {
    return this.request<{ success: boolean; data: Array<{ name: string; count: number }> }>(
      '/testimonials/meta/companies'
    );
  }
}

export const testimonialsApi = new TestimonialsApiService(); 