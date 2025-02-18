# Component Library

## Overview

This document catalogs all reusable UI components in the HackerHome application, their variants, usage guidelines, and implementation details.

## Core Components

### Navigation

#### Header
```tsx
<Header>
  <Logo />
  <Navigation />
  <SearchBar />
  <ThemeToggle />
</Header>
```
- **Usage**: Main application header
- **Props**:
  - `sticky?: boolean`
  - `transparent?: boolean`
- **Variants**: Default, Compact

#### Navigation Menu
```tsx
<Navigation>
  <NavItem>Latest</NavItem>
  <NavItem>Trending</NavItem>
  <NavItem>Categories</NavItem>
</Navigation>
```
- **Usage**: Main navigation menu
- **Props**:
  - `items: NavItem[]`
  - `orientation?: 'horizontal' | 'vertical'`

### Content

#### NewsCard
```tsx
<NewsCard
  title="Article Title"
  source="Source Name"
  timestamp="2h ago"
  points={100}
  comments={50}
/>
```
- **Usage**: Display individual news items
- **Props**:
  - `title: string`
  - `source: string`
  - `timestamp: string`
  - `points?: number`
  - `comments?: number`

#### RepositoryCard
```tsx
<RepositoryCard
  name="repo-name"
  description="Repository description"
  stars={1000}
  language="TypeScript"
/>
```
- **Usage**: Display GitHub repositories
- **Props**:
  - `name: string`
  - `description: string`
  - `stars?: number`
  - `language?: string`

### Input & Interaction

#### SearchBar
```tsx
<SearchBar
  placeholder="Search news..."
  onSearch={(query) => {}}
  debounceMs={300}
/>
```
- **Usage**: Global search functionality
- **Props**:
  - `placeholder?: string`
  - `onSearch: (query: string) => void`
  - `debounceMs?: number`

#### ThemeToggle
```tsx
<ThemeToggle
  mode="dark"
  onChange={(mode) => {}}
/>
```
- **Usage**: Toggle between light/dark themes
- **Props**:
  - `mode: 'light' | 'dark'`
  - `onChange: (mode: string) => void`

### Feedback

#### LoadingSkeleton
```tsx
<LoadingSkeleton
  type="card"
  count={3}
/>
```
- **Usage**: Loading state placeholder
- **Props**:
  - `type: 'card' | 'text' | 'avatar'`
  - `count?: number`

#### ErrorBoundary
```tsx
<ErrorBoundary fallback={<ErrorMessage />}>
  {children}
</ErrorBoundary>
```
- **Usage**: Handle component errors
- **Props**:
  - `fallback: ReactNode`
  - `children: ReactNode`

## Layout Components

### Grid
```tsx
<Grid
  columns={3}
  gap={16}
>
  {items}
</Grid>
```
- **Usage**: Responsive grid layout
- **Props**:
  - `columns: number`
  - `gap?: number`
  - `children: ReactNode`

### Container
```tsx
<Container
  maxWidth="lg"
  padding={24}
>
  {content}
</Container>
```
- **Usage**: Content container
- **Props**:
  - `maxWidth?: 'sm' | 'md' | 'lg' | 'xl'`
  - `padding?: number`

## Form Components

### Button
```tsx
<Button
  variant="primary"
  size="md"
  onClick={() => {}}
>
  Click Me
</Button>
```
- **Usage**: Action buttons
- **Props**:
  - `variant: 'primary' | 'secondary' | 'ghost'`
  - `size: 'sm' | 'md' | 'lg'`
  - `onClick: () => void`

### Input
```tsx
<Input
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={(e) => {}}
/>
```
- **Usage**: Text input fields
- **Props**:
  - `type: string`
  - `placeholder?: string`
  - `value: string`
  - `onChange: (e: ChangeEvent) => void`

## Implementation Guidelines

### Component Structure
1. Use TypeScript for type safety
2. Follow functional component pattern
3. Implement proper prop types
4. Include default props

### Styling
1. Use Tailwind CSS classes
2. Follow design system tokens
3. Implement responsive variants
4. Support theme variants

### Accessibility
1. Include ARIA attributes
2. Support keyboard navigation
3. Maintain proper focus management
4. Provide screen reader support

### Performance
1. Memoize when necessary
2. Lazy load components
3. Optimize re-renders
4. Handle loading states

## Testing Guidelines

### Unit Tests
1. Test component rendering
2. Test prop variations
3. Test user interactions
4. Test accessibility

### Integration Tests
1. Test component combinations
2. Test data flow
3. Test error states
4. Test loading states

## Documentation Standards

### Component Documentation
1. Clear description
2. Prop documentation
3. Usage examples
4. Variant demonstrations

### Storybook Integration
1. Component stories
2. Interactive examples
3. Prop controls
4. Documentation 