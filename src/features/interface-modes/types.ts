export type InterfaceMode = 'simple' | 'advanced';

export interface SimpleMode {
  layout: 'list' | 'compact-grid';
  features: {
    essential: true;
    advanced: false;
    experimental: false;
  };
  performance: {
    priority: 'speed';
    caching: 'aggressive';
  };
}

export interface AdvancedMode {
  layout: 'grid' | 'masonry' | 'custom';
  features: {
    essential: true;
    advanced: true;
    experimental: boolean;
  };
  performance: {
    priority: 'features';
    caching: 'balanced';
  };
}

export type ModeConfig = SimpleMode | AdvancedMode;

export interface InterfaceContext {
  mode: InterfaceMode;
  config: ModeConfig;
  setMode: (mode: InterfaceMode) => void;
}