import { InterfaceMode } from './types';

interface ThemeConfig {
  layout: {
    spacing: string;
    maxWidth: string;
    gap: string;
  };
  card: {
    padding: string;
    borderRadius: string;
    shadow: string;
  };
  animation: {
    transition: string;
    duration: string;
  };
}

const simpleTheme: ThemeConfig = {
  layout: {
    spacing: '1rem',
    maxWidth: '72rem',
    gap: '1rem'
  },
  card: {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    shadow: 'shadow-sm'
  },
  animation: {
    transition: 'all',
    duration: '200ms'
  }
};

const advancedTheme: ThemeConfig = {
  layout: {
    spacing: '1.5rem',
    maxWidth: '96rem',
    gap: '1.5rem'
  },
  card: {
    padding: '1.25rem',
    borderRadius: '1rem',
    shadow: 'shadow-lg'
  },
  animation: {
    transition: 'all',
    duration: '300ms'
  }
};

export const getModeTheme = (mode: InterfaceMode): ThemeConfig => {
  return mode === 'simple' ? simpleTheme : advancedTheme;
};

// CSS Variables to be injected into :root
export const generateThemeVariables = (mode: InterfaceMode): string => {
  const theme = getModeTheme(mode);
  return `
    --layout-spacing: ${theme.layout.spacing};
    --layout-max-width: ${theme.layout.maxWidth};
    --layout-gap: ${theme.layout.gap};
    --card-padding: ${theme.card.padding};
    --card-radius: ${theme.card.borderRadius};
    --card-shadow: var(--tw-${theme.card.shadow});
    --transition-style: ${theme.animation.transition};
    --transition-duration: ${theme.animation.duration};
  `;
};

// Utility class for mode transitions
export const modeTransitionClass = `
  .mode-transition {
    transition: 
      padding var(--transition-duration) ease-in-out,
      margin var(--transition-duration) ease-in-out,
      width var(--transition-duration) ease-in-out,
      height var(--transition-duration) ease-in-out,
      border-radius var(--transition-duration) ease-in-out,
      box-shadow var(--transition-duration) ease-in-out;
  }
`;

// Tailwind utility classes for mode-specific styles
export const modeUtilityClasses = {
  card: {
    base: 'rounded-lg transition-all duration-200 text-sm', // Consistent text-sm for both modes
    simple: 'p-3 shadow-sm border border-gray-100 dark:border-gray-800',
    advanced: 'p-5 shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-700'
  },
  grid: {
    base: 'grid gap-4 w-full',
    simple: 'grid-cols-1 md:grid-cols-2',
    advanced: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  },
  // Remove text size differences
  text: {
    simple: '',
    advanced: ''
  }
};

// Mode-specific badge colors for visual differentiation
export const modeBadgeColors = {
  simple: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400'
  },
  advanced: {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    text: 'text-blue-600 dark:text-blue-400'
  }
};

// Interactive element styles
export const interactionStyles = {
  simple: {
    button: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    hover: 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
  },
  advanced: {
    button: 'hover:bg-blue-50 dark:hover:bg-blue-900/30',
    hover: 'hover:-translate-y-1 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
  }
};