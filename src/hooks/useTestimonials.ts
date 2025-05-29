import { useState, useEffect, useCallback } from 'react';
import {
  Testimonial,
  CustomerMetric,
  TestimonialFilters,
  TestimonialQuery
} from '../types/testimonials';
import { testimonialsApi } from '../services/testimonialsApi';

interface UseTestimonialsState {
  testimonials: Testimonial[];
  customerMetrics: CustomerMetric[];
  filters: TestimonialFilters | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  } | null;
}

interface UseTestimonialsReturn extends UseTestimonialsState {
  fetchTestimonials: (params?: TestimonialQuery) => Promise<void>;
  fetchTestimonial: (id: string) => Promise<Testimonial | null>;
  fetchCustomerMetrics: () => Promise<void>;
  fetchFilters: () => Promise<void>;
  refreshData: () => Promise<void>;
  clearError: () => void;
}

export const useTestimonials = (initialParams?: TestimonialQuery): UseTestimonialsReturn => {
  const [state, setState] = useState<UseTestimonialsState>({
    testimonials: [],
    customerMetrics: [],
    filters: null,
    loading: false,
    error: null,
    pagination: null
  });

  const [currentParams, setCurrentParams] = useState<TestimonialQuery | undefined>(initialParams);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const fetchTestimonials = useCallback(async (params?: TestimonialQuery) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const queryParams = params || currentParams;
      if (params) {
        setCurrentParams(params);
      }

      const response = await testimonialsApi.getTestimonials(queryParams);
      
      setState(prev => ({
        ...prev,
        testimonials: response.data.testimonials,
        pagination: response.pagination || null,
        loading: false
      }));
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch testimonials',
        loading: false
      }));
    }
  }, [currentParams]);

  const fetchTestimonial = useCallback(async (id: string): Promise<Testimonial | null> => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await testimonialsApi.getTestimonial(id);
      
      setState(prev => ({ ...prev, loading: false }));
      return response.data.testimonial;
    } catch (error) {
      console.error('Error fetching testimonial:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch testimonial',
        loading: false
      }));
      return null;
    }
  }, []);

  const fetchCustomerMetrics = useCallback(async () => {
    try {
      const response = await testimonialsApi.getCustomerMetrics();
      
      setState(prev => ({
        ...prev,
        customerMetrics: response.data.metrics
      }));
    } catch (error) {
      console.error('Error fetching customer metrics:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch customer metrics'
      }));
    }
  }, []);

  const fetchFilters = useCallback(async () => {
    try {
      const response = await testimonialsApi.getTestimonialFilters();
      
      setState(prev => ({
        ...prev,
        filters: response.data.filters
      }));
    } catch (error) {
      console.error('Error fetching testimonial filters:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch filters'
      }));
    }
  }, []);

  const refreshData = useCallback(async () => {
    await Promise.all([
      fetchTestimonials(currentParams),
      fetchCustomerMetrics(),
      fetchFilters()
    ]);
  }, [fetchTestimonials, fetchCustomerMetrics, fetchFilters, currentParams]);

  // Initial load
  useEffect(() => {
    refreshData();
  }, []);

  return {
    ...state,
    fetchTestimonials,
    fetchTestimonial,
    fetchCustomerMetrics,
    fetchFilters,
    refreshData,
    clearError
  };
};

// Specialized hooks for common use cases
export const useFeaturedTestimonials = (limit?: number) => {
  return useTestimonials({ featured: true, limit: limit || 3, sortBy: 'date', order: 'desc' });
};

export const useVideoTestimonials = (limit?: number) => {
  return useTestimonials({ hasVideo: true, limit: limit || 6, sortBy: 'date', order: 'desc' });
};

export const useTestimonialsByIndustry = (industry: string, limit?: number) => {
  return useTestimonials({ industry, limit: limit || 10, sortBy: 'date', order: 'desc' });
}; 