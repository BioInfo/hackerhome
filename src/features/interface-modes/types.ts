export type InterfaceMode = 'simple' | 'advanced';

export type SimpleLayout = 'list';
export type AdvancedLayout = 'list' | 'grid' | 'masonry';

export interface SimpleMode {
  layout: SimpleLayout;
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
  layout: AdvancedLayout;
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
  layout: SimpleLayout | AdvancedLayout;
  setLayout: (layout: string) => void;
}