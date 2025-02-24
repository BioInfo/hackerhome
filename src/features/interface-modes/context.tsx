import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { InterfaceContext, InterfaceMode, ModeConfig, SimpleMode, AdvancedMode } from './types';

const defaultSimpleConfig: SimpleMode = {
  layout: 'list',
  features: {
    essential: true,
    advanced: false,
    experimental: false,
  },
  performance: {
    priority: 'speed',
    caching: 'aggressive',
  },
};

const defaultAdvancedConfig: AdvancedMode = {
  layout: 'grid',
  features: {
    essential: true,
    advanced: true,
    experimental: false,
  },
  performance: {
    priority: 'features',
    caching: 'balanced',
  },
};

const InterfaceModeContext = createContext<InterfaceContext>({
  mode: 'simple',
  config: defaultSimpleConfig,
  setMode: () => {},
});

export const useInterfaceMode = () => {
  const context = useContext(InterfaceModeContext);
  if (!context) {
    throw new Error('useInterfaceMode must be used within an InterfaceModeProvider');
  }
  return context;
};

interface InterfaceModeProviderProps {
  children: React.ReactNode;
}

export const InterfaceModeProvider: React.FC<InterfaceModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<InterfaceMode>(() => {
    const stored = localStorage.getItem('interface-mode');
    return (stored === 'simple' || stored === 'advanced') ? stored : 'simple';
  });

  const [config, setConfig] = useState<ModeConfig>(
    mode === 'simple' ? defaultSimpleConfig : defaultAdvancedConfig
  );

  const handleModeChange = useCallback((newMode: InterfaceMode) => {
    setMode(newMode);
    setConfig(newMode === 'simple' ? defaultSimpleConfig : defaultAdvancedConfig);
    localStorage.setItem('interface-mode', newMode);
    // Add a class to the root element for mode-specific styles
    document.documentElement.classList.remove('simple-mode', 'advanced-mode');
    document.documentElement.classList.add(`${newMode}-mode`);
  }, []);

  // Initialize mode class on mount
  useEffect(() => {
    document.documentElement.classList.add(`${mode}-mode`);
    return () => {
      document.documentElement.classList.remove('simple-mode', 'advanced-mode');
    };
  }, []);

  return (
    <InterfaceModeContext.Provider value={{ mode, config, setMode: handleModeChange }}>
      {children}
    </InterfaceModeContext.Provider>
  );
};

export default InterfaceModeContext;