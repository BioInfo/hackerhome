import { useMemo } from 'react';
import { useInterfaceMode } from './context';
import { getModeTheme, modeUtilityClasses } from './theme';

type ComponentWithBase = 'card' | 'grid';
type ComponentType = ComponentWithBase | 'text';

export const useThemeMode = () => {
  const { mode } = useInterfaceMode();

  const theme = useMemo(() => getModeTheme(mode), [mode]);
  
  const getClassName = (component: ComponentType, baseClass: string = ''): string => {
    const classes = [baseClass];

    if (component === 'text') {
      classes.push(modeUtilityClasses.text[mode]);
    } else {
      const componentClasses = modeUtilityClasses[component];
      classes.push(
        componentClasses.base,
        componentClasses[mode]
      );
    }

    return classes.filter(Boolean).join(' ');
  };

  return {
    theme,
    mode,
    getClassName,
    // Export specific component classes for direct use
    cardClass: getClassName('card'),
    gridClass: getClassName('grid'),
    textClass: modeUtilityClasses.text[mode]
  };
};