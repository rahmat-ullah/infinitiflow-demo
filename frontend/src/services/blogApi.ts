import { 
  Blog, 
  BlogApiResponse, 
  BlogListResponse, 
  BlogStatsResponse,
  BlogCategory,
  BlogTag,
  ImageUploadResponse 
} from '../types/blog';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class BlogApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      console.error('API Error:', {
        url,
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      
      // Show detailed validation errors if available
      if (errorData.details && Array.isArray(errorData.details)) {
        const validationErrors = errorData.details.map((detail: any) => detail.msg || detail).join(', ');
        throw new Error(`Validation failed: ${validationErrors}`);
      }
      
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Get published blogs with filtering and pagination
  async getBlogs(params?: {
    page?: number;
    limit?: number;
    category?: string;
    tag?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<BlogListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const query = searchParams.toString();
    return this.request<BlogListResponse>(`/blogs${query ? `?${query}` : ''}`);
  }

  // Get blog by slug (for public viewing)
  async getBlogBySlug(slug: string): Promise<BlogApiResponse> {
    return this.request<BlogApiResponse>(`/blogs/slug/${slug}`);
  }

  // Get blog by ID
  async getBlogById(id: string): Promise<BlogApiResponse> {
    return this.request<BlogApiResponse>(`/blogs/${id}`);
  }

  // Admin: Get all blogs with filtering
  async getAdminBlogs(params?: {
    page?: number;
    limit?: number;
    status?: 'draft' | 'published' | 'archived';
    author?: string;
    search?: string;
  }): Promise<BlogListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const query = searchParams.toString();
    return this.request<BlogListResponse>(`/blogs/admin/all${query ? `?${query}` : ''}`);
  }

  // Create new blog
  async createBlog(blog: Omit<Blog, '_id' | 'createdAt' | 'updatedAt' | 'viewCount'>): Promise<BlogApiResponse> {
    return this.request<BlogApiResponse>('/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
    });
  }

  // Update blog
  async updateBlog(id: string, blog: Partial<Blog>): Promise<BlogApiResponse> {
    return this.request<BlogApiResponse>(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blog),
    });
  }

  // Publish blog
  async publishBlog(id: string): Promise<BlogApiResponse> {
    return this.request<BlogApiResponse>(`/blogs/${id}/publish`, {
      method: 'PATCH',
    });
  }

  // Unpublish blog
  async unpublishBlog(id: string): Promise<BlogApiResponse> {
    return this.request<BlogApiResponse>(`/blogs/${id}/unpublish`, {
      method: 'PATCH',
    });
  }

  // Delete blog
  async deleteBlog(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  // Upload single image
  async uploadImage(file: File): Promise<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/blogs/upload/image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(errorData.error || `Upload failed! status: ${response.status}`);
    }

    return response.json();
  }

  // Upload multiple images
  async uploadImages(files: File[]): Promise<ImageUploadResponse> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    const response = await fetch(`${API_BASE_URL}/blogs/upload/images`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(errorData.error || `Upload failed! status: ${response.status}`);
    }

    return response.json();
  }

  // Get blog statistics
  async getBlogStats(): Promise<BlogStatsResponse> {
    return this.request<BlogStatsResponse>('/blogs/stats/summary');
  }

  // Get popular blogs
  async getPopularBlogs(limit = 5): Promise<BlogListResponse> {
    return this.request<BlogListResponse>(`/blogs/stats/popular?limit=${limit}`);
  }

  // Get recent blogs
  async getRecentBlogs(limit = 5): Promise<BlogListResponse> {
    return this.request<BlogListResponse>(`/blogs/stats/recent?limit=${limit}`);
  }

  // Get categories
  async getCategories(): Promise<{ success: boolean; data: BlogCategory[] }> {
    return this.request<{ success: boolean; data: BlogCategory[] }>('/blogs/categories');
  }

  // Get tags
  async getTags(): Promise<{ success: boolean; data: BlogTag[] }> {
    return this.request<{ success: boolean; data: BlogTag[] }>('/blogs/tags');
  }
}

export const blogApi = new BlogApiService(); 