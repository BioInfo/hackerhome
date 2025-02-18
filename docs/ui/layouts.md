# Layout Specifications

## Overview

This document outlines the layout specifications and responsive design patterns for the HackerHome application.

## Grid System

### Base Grid
- 12-column grid system
- Responsive gutters
- Fluid container widths
- Breakpoint-based layouts

### Container Sizes
```css
/* Container max-widths */
--container-sm:  640px;
--container-md:  768px;
--container-lg:  1024px;
--container-xl:  1280px;
--container-2xl: 1536px;
```

### Grid Gaps
```css
/* Grid gap sizes */
--gap-x: 1.5rem; /* 24px horizontal gap */
--gap-y: 2rem;   /* 32px vertical gap */
```

## Layout Components

### Page Layout
```tsx
<Layout>
  <Header />
  <Sidebar />
  <Main>
    <Container>{content}</Container>
  </Main>
  <Footer />
</Layout>
```

### Content Areas
```tsx
<Main>
  <ContentHeader />
  <ContentArea>
    <NewsGrid />
    <Sidebar />
  </ContentArea>
  <ContentFooter />
</Main>
```

## Responsive Patterns

### Mobile First
1. Base styles for mobile
2. Progressive enhancement for larger screens
3. Fluid typography and spacing
4. Responsive images and media

### Breakpoint System
```css
/* Breakpoints */
@media (min-width: 640px)  { /* Small devices */ }
@media (min-width: 768px)  { /* Medium devices */ }
@media (min-width: 1024px) { /* Large devices */ }
@media (min-width: 1280px) { /* Extra large devices */ }
@media (min-width: 1536px) { /* 2XL devices */ }
```

## Layout Patterns

### News Feed Layout
```
[Header]
[Filters]
[News Grid]
  - 1 column on mobile
  - 2 columns on tablet
  - 3 columns on desktop
[Load More]
[Footer]
```

### Article Layout
```
[Header]
[Article Header]
  - Title
  - Metadata
[Article Content]
  - Full width on mobile
  - Constrained width on desktop
[Related Articles]
[Footer]
```

### Search Results
```
[Header]
[Search Bar]
[Filters]
[Results Grid]
  - List view on mobile
  - Grid view on desktop
[Pagination]
[Footer]
```

## Spacing System

### Vertical Spacing
```css
/* Vertical rhythm */
--space-stack-xs: 0.5rem;  /*  8px */
--space-stack-sm: 1rem;    /* 16px */
--space-stack-md: 1.5rem;  /* 24px */
--space-stack-lg: 2rem;    /* 32px */
--space-stack-xl: 3rem;    /* 48px */
```

### Horizontal Spacing
```css
/* Horizontal spacing */
--space-inline-xs: 0.5rem;  /*  8px */
--space-inline-sm: 1rem;    /* 16px */
--space-inline-md: 1.5rem;  /* 24px */
--space-inline-lg: 2rem;    /* 32px */
--space-inline-xl: 3rem;    /* 48px */
```

## Component Layout

### Card Layouts
```css
/* Card grid layouts */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--gap-y) var(--gap-x);
}
```

### List Layouts
```css
/* List layouts */
.list-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-stack-md);
}
```

## Responsive Behavior

### Navigation
- Mobile: Hamburger menu
- Tablet: Condensed navigation
- Desktop: Full navigation

### Sidebar
- Mobile: Hidden/Drawer
- Tablet: Collapsible
- Desktop: Always visible

### Content
- Mobile: Single column
- Tablet: Two columns
- Desktop: Three columns

## Layout Guidelines

### Best Practices
1. Use semantic HTML structure
2. Maintain consistent spacing
3. Consider content hierarchy
4. Optimize for readability

### Accessibility
1. Proper landmark regions
2. Skip navigation links
3. Logical tab order
4. Responsive zoom support

### Performance
1. Minimize layout shifts
2. Optimize image loading
3. Use CSS containment
4. Efficient reflows

## Implementation

### CSS Grid Usage
```css
.grid-layout {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gap-y) var(--gap-x);
}
```

### Flexbox Usage
```css
.flex-layout {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-x);
}
```

### Container Usage
```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-inline-md);
  padding-right: var(--space-inline-md);
}
```

## Testing Guidelines

### Responsive Testing
1. Test all breakpoints
2. Verify content flow
3. Check image scaling
4. Validate touch targets

### Cross-browser Testing
1. Test major browsers
2. Verify CSS support
3. Check fallbacks
4. Validate layouts

## Documentation

### Layout Examples
1. Document common patterns
2. Provide code snippets
3. Include visual examples
4. Note responsive behavior

### Maintenance
1. Update for new patterns
2. Document changes
3. Version control
4. Keep examples current 