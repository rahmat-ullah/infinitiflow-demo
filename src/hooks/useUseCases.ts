import { useState, useEffect, useCallback } from 'react';
import { useCasesApi } from '../services/api';
import { UseCase, RoleSolution, IndustrySolution } from '../types/usecases';
import { getIconComponent } from '../utils/iconMapper';

interface Category {
  id: string;
  label: string;
}

interface UseUseCasesState {
  useCases: UseCase[];
  roleSolutions: RoleSolution[];
  industrySolutions: IndustrySolution[];
  categories: Category[];
  featuredUseCase: UseCase | null;
  loading: boolean;
  error: string | null;
}

interface UseUseCasesReturn extends UseUseCasesState {
  fetchUseCases: (params?: { category?: string; featured?: boolean }) => Promise<void>;
  fetchUseCase: (id: string) => Promise<UseCase | null>;
  refreshData: () => Promise<void>;
}

// Type definitions for API responses
interface UseCasesResponse {
  useCases: any[];
}

interface UseCaseResponse {
  useCase: any;
}

interface RoleSolutionsResponse {
  roleSolutions: any[];
}

interface IndustrySolutionsResponse {
  industrySolutions: any[];
}

interface CategoriesResponse {
  categories: Category[];
}

export const useUseCases = (): UseUseCasesReturn => {
  const [state, setState] = useState<UseUseCasesState>({
    useCases: [],
    roleSolutions: [],
    industrySolutions: [],
    categories: [],
    featuredUseCase: null,
    loading: true,
    error: null,
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error, loading: false }));
  };

  const fetchUseCases = useCallback(async (params?: { category?: string; featured?: boolean }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await useCasesApi.getUseCases(params);
      
      if (response.status === 'success' && response.data) {
        const data = response.data as UseCasesResponse;
        // Transform backend icon strings to match frontend icons
        const transformedUseCases = data.useCases.map((useCase: any) => ({
          ...useCase,
          icon: getIconComponent(useCase.icon),
        }));

        setState(prev => ({
          ...prev,
          useCases: transformedUseCases,
          featuredUseCase: transformedUseCases.find((uc: UseCase) => uc.featured) || null,
          loading: false,
        }));
      } else {
        setError('Failed to fetch use cases');
      }
    } catch (error) {
      console.error('Error fetching use cases:', error);
      setError('Failed to fetch use cases');
    }
  }, []);

  const fetchUseCase = useCallback(async (id: string): Promise<UseCase | null> => {
    try {
      const response = await useCasesApi.getUseCase(id);
      
      if (response.status === 'success' && response.data) {
        const data = response.data as UseCaseResponse;
        const transformedUseCase = {
          ...data.useCase,
          icon: getIconComponent(data.useCase.icon),
        };
        return transformedUseCase;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching use case:', error);
      return null;
    }
  }, []);

  const fetchRoleSolutions = useCallback(async () => {
    try {
      const response = await useCasesApi.getRoleSolutions();
      
      if (response.status === 'success' && response.data) {
        const data = response.data as RoleSolutionsResponse;
        const transformedSolutions = data.roleSolutions.map((solution: any) => ({
          ...solution,
          icon: getIconComponent(solution.icon),
        }));

        setState(prev => ({
          ...prev,
          roleSolutions: transformedSolutions,
        }));
      }
    } catch (error) {
      console.error('Error fetching role solutions:', error);
    }
  }, []);

  const fetchIndustrySolutions = useCallback(async () => {
    try {
      const response = await useCasesApi.getIndustrySolutions();
      
      if (response.status === 'success' && response.data) {
        const data = response.data as IndustrySolutionsResponse;
        const transformedSolutions = data.industrySolutions.map((solution: any) => ({
          ...solution,
          icon: getIconComponent(solution.icon),
        }));

        setState(prev => ({
          ...prev,
          industrySolutions: transformedSolutions,
        }));
      }
    } catch (error) {
      console.error('Error fetching industry solutions:', error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await useCasesApi.getCategories();
      
      if (response.status === 'success' && response.data) {
        const data = response.data as CategoriesResponse;
        setState(prev => ({
          ...prev,
          categories: data.categories,
        }));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await Promise.all([
      fetchUseCases(),
      fetchRoleSolutions(),
      fetchIndustrySolutions(),
      fetchCategories(),
    ]);
  }, [fetchUseCases, fetchRoleSolutions, fetchIndustrySolutions, fetchCategories]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return {
    ...state,
    fetchUseCases,
    fetchUseCase,
    refreshData,
  };
}; 