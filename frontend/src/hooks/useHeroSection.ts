import { useState, useEffect } from 'react';
import { HeroSection, HeroApiResponse } from '../types/hero';

const API_BASE_URL = 'http://localhost:3001/api';

export const useHeroSection = () => {
  const [heroData, setHeroData] = useState<HeroSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/hero`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: HeroApiResponse = await response.json();

        if (result.success) {
          setHeroData(result.data);
        } else {
          throw new Error(result.error || 'Failed to fetch hero section');
        }
      } catch (err) {
        console.error('Error fetching hero section:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        // Fallback to null data - component should handle this gracefully
        setHeroData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroSection();
  }, []);

  return {
    heroData,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      setError(null);
      // Re-run the effect by creating a new fetch
      const fetchHeroSection = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/hero`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result: HeroApiResponse = await response.json();

          if (result.success) {
            setHeroData(result.data);
          } else {
            throw new Error(result.error || 'Failed to fetch hero section');
          }
        } catch (err) {
          console.error('Error fetching hero section:', err);
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
          setHeroData(null);
        } finally {
          setIsLoading(false);
        }
      };

      fetchHeroSection();
    }
  };
}; 