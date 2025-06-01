import { useState, useEffect } from 'react';
import { FeatureSection, FeatureApiResponse } from '../types/features';

const API_BASE_URL = 'http://localhost:3001/api';

export const useFeatureSection = () => {
  const [featureData, setFeatureData] = useState<FeatureSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatureSection = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/features`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: FeatureApiResponse = await response.json();

        if (result.success) {
          setFeatureData(result.data);
        } else {
          throw new Error(result.error || 'Failed to fetch feature section');
        }
      } catch (err) {
        console.error('Error fetching feature section:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        // Fallback to null data - component should handle this gracefully
        setFeatureData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatureSection();
  }, []);

  return {
    featureData,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      setError(null);
      // Re-run the effect by creating a new fetch
      const fetchFeatureSection = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/features`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result: FeatureApiResponse = await response.json();

          if (result.success) {
            setFeatureData(result.data);
          } else {
            throw new Error(result.error || 'Failed to fetch feature section');
          }
        } catch (err) {
          console.error('Error fetching feature section:', err);
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
          setFeatureData(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchFeatureSection();
    }
  };
}; 