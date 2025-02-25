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
  layout: 'list',
  setLayout: () => {},
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

  // Track layout independently
  const [layout, setLayout] = useState<string>(
    mode === 'simple' ? 'list' : 'grid'
  );
  
  const handleLayoutChange = useCallback((newLayout: string) => {
    setLayout(newLayout);
    // Update config with new layout
    setConfig(prev => ({
      ...prev,
      layout: newLayout as any
    }));
    // Store layout preference
    localStorage.setItem('interface-layout', newLayout);
  }, []);
  
  // Initialize layout from localStorage or defaults
  useEffect(() => {
    const storedLayout = localStorage.getItem('interface-layout');
    if (storedLayout) {
      // For simple mode, only allow 'list'
      if (mode === 'simple' && storedLayout !== 'list') {
        setLayout('list');
      } else if (mode === 'advanced') {
        // For advanced mode, allow 'list', 'grid' or 'masonry'
        if (['list', 'grid', 'masonry'].includes(storedLayout)) {
          setLayout(storedLayout);
        }
      }
    }
  }, [mode]);
  
  return (
    <InterfaceModeContext.Provider 
      value={{ 
        mode, 
        config, 
        setMode: handleModeChange,
        layout,
        setLayout: handleLayoutChange
      }}
    >
      {children}
    </InterfaceModeContext.Provider>
  );
};

export default InterfaceModeContext;