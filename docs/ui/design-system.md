# Design System

## Overview

The HackerHome design system provides a comprehensive set of design tokens, guidelines, and patterns to ensure consistent and accessible user interfaces across the application.

## Colors

### Primary Colors
```css
--primary-50:  #f0f9ff;
--primary-100: #e0f2fe;
--primary-200: #bae6fd;
--primary-300: #7dd3fc;
--primary-400: #38bdf8;
--primary-500: #0ea5e9;
--primary-600: #0284c7;
--primary-700: #0369a1;
--primary-800: #075985;
--primary-900: #0c4a6e;
```

### Neutral Colors
```css
--neutral-50:  #f8fafc;
--neutral-100: #f1f5f9;
--neutral-200: #e2e8f0;
--neutral-300: #cbd5e1;
--neutral-400: #94a3b8;
--neutral-500: #64748b;
--neutral-600: #475569;
--neutral-700: #334155;
--neutral-800: #1e293b;
--neutral-900: #0f172a;
```

### Semantic Colors
```css
--success-500: #22c55e;
--warning-500: #f59e0b;
--error-500:   #ef4444;
--info-500:    #3b82f6;
```

## Typography

### Font Family
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Font Sizes
```css
--text-xs:  0.75rem;   /* 12px */
--text-sm:  0.875rem;  /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg:  1.125rem;  /* 18px */
--text-xl:  1.25rem;   /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Font Weights
```css
--font-light:    300;
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
```

### Line Heights
```css
--leading-none:    1;
--leading-tight:   1.25;
--leading-snug:    1.375;
--leading-normal:  1.5;
--leading-relaxed: 1.625;
--leading-loose:   2;
```

## Spacing

### Base Units
```css
--spacing-px:  1px;
--spacing-0:   0;
--spacing-0.5: 0.125rem; /*  2px */
--spacing-1:   0.25rem;  /*  4px */
--spacing-2:   0.5rem;   /*  8px */
--spacing-3:   0.75rem;  /* 12px */
--spacing-4:   1rem;     /* 16px */
--spacing-6:   1.5rem;   /* 24px */
--spacing-8:   2rem;     /* 32px */
--spacing-12:  3rem;     /* 48px */
--spacing-16:  4rem;     /* 64px */
```

### Layout Spacing
```css
--container-padding: var(--spacing-4);
--section-spacing:   var(--spacing-8);
--stack-spacing:     var(--spacing-4);
```

## Borders

### Border Radius
```css
--radius-none:  0;
--radius-sm:    0.125rem; /*  2px */
--radius-base:  0.25rem;  /*  4px */
--radius-md:    0.375rem; /*  6px */
--radius-lg:    0.5rem;   /*  8px */
--radius-xl:    0.75rem;  /* 12px */
--radius-full:  9999px;
```

### Border Widths
```css
--border-0:    0px;
--border-1:    1px;
--border-2:    2px;
--border-4:    4px;
--border-8:    8px;
```

## Shadows

```css
--shadow-sm:    0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-base:  0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md:    0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg:    0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl:    0 20px 25px -5px rgb(0 0 0 / 0.1);
```

## Z-Index

```css
--z-0:        0;
--z-10:       10;
--z-20:       20;
--z-30:       30;
--z-40:       40;
--z-50:       50;
--z-auto:     auto;
--z-dropdown: 1000;
--z-sticky:   1100;
--z-modal:    1300;
--z-popover:  1400;
--z-tooltip:  1500;
```

## Breakpoints

```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

## Transitions

```css
--transition-base:     150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-smooth:   200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-bounce:   200ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## Usage Guidelines

### Color Usage
- Use primary colors for main actions and branding
- Use neutral colors for text, backgrounds, and borders
- Use semantic colors for feedback and status indicators
- Ensure sufficient contrast ratios for accessibility

### Typography Usage
- Use font sizes consistently across similar elements
- Maintain proper hierarchy with font weights
- Use appropriate line heights for readability
- Consider responsive typography scaling

### Spacing Usage
- Use consistent spacing units for layout
- Apply spacing scale for margins and padding
- Consider responsive spacing adjustments
- Maintain vertical rhythm

### Component Specific
- Apply consistent border radius to similar components
- Use shadows to indicate elevation
- Apply transitions for interactive elements
- Consider z-index stacking context

## Theme Support

### Light Theme
- Background colors from neutral-50 to neutral-100
- Text colors from neutral-600 to neutral-900
- Subtle shadows for depth
- High contrast for important elements

### Dark Theme
- Background colors from neutral-900 to neutral-800
- Text colors from neutral-300 to neutral-50
- Subdued shadows for depth
- Maintained contrast for readability

## Accessibility

### Color Contrast
- Maintain WCAG 2.1 AA standard (4.5:1 for normal text)
- Test color combinations
- Provide sufficient contrast in both themes
- Consider color blindness

### Typography
- Ensure minimum text sizes
- Maintain readable line lengths
- Use clear font weights
- Support text scaling

## Implementation

### CSS Variables
- Use CSS custom properties
- Implement theme switching
- Support fallback values
- Consider browser support

### Utility Classes
- Generate utility classes from tokens
- Follow consistent naming
- Support responsive variants
- Document usage patterns

## Documentation

### Token Reference
- Document all available tokens
- Provide usage examples
- Include visual references
- Maintain version history

### Guidelines
- Document best practices
- Provide implementation examples
- Include accessibility guidelines
- Update regularly 