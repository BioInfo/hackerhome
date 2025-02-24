import { useMemo } from 'react';
import { useInterfaceMode } from './context';
import { InterfaceMode } from './types';

interface OptimizationConfig {
  caching: 'aggressive' | 'balanced';
  preload: string[];
  defer: string[];
}

export const useOptimization = () => {
  const { mode, config } = useInterfaceMode();

  const optimization = useMemo((): OptimizationConfig => {
    return {
      caching: config.performance.caching,
      preload: mode === 'simple' ? ['essential'] : ['essential', 'advanced'],
      defer: mode === 'simple' ? ['advanced', 'experimental'] : ['experimental']
    };
  }, [mode, config.performance.caching]);

  const shouldLoadFeature = (featureType: 'essential' | 'advanced' | 'experimental'): boolean => {
    if (featureType === 'essential') return true;
    return mode === 'advanced' && (
      featureType === 'advanced' || 
      (featureType === 'experimental' && config.features.experimental)
    );
  };

  const getCacheStrategy = (resourceType: 'data' | 'assets'): number => {
    // Return cache duration in milliseconds
    if (config.performance.caching === 'aggressive') {
      return resourceType === 'data' ? 5 * 60 * 1000 : 24 * 60 * 60 * 1000; // 5 mins for data, 24 hours for assets
    }
    return resourceType === 'data' ? 60 * 1000 : 12 * 60 * 60 * 1000; // 1 min for data, 12 hours for assets
  };

  const getLayoutType = () => {
    return config.layout;
  };

  return {
    optimization,
    shouldLoadFeature,
    getCacheStrategy,
    getLayoutType,
  };
};