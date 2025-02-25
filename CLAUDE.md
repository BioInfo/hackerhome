# HackerHome Development Guide

## Build Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier (WIP)

## Code Style Guidelines
- **TypeScript**: Use strict mode, explicit types, interfaces for objects, type unions for variants
- **React**: Functional components, hooks at top, organize by feature folders
- **Imports**: Group imports (React, external libs, internal modules, types)
- **Naming**: PascalCase for components/interfaces, camelCase for variables/functions
- **Components**: Memoize with useCallback/useMemo for performance-critical code
- **Error handling**: Use try/catch with typed errors (ApiError) for async operations
- **State**: Local state with useState, global with React Context
- **Documentation**: JSDoc for components, hooks, and complex functions

Use Tailwind CSS for styling with consistent class naming patterns.

## Virtualization Components

### Implementation Details
The virtualization system is implemented using react-window and react-window-infinite-loader to efficiently render large lists of news items. Key components:

- `VirtualizedNewsList`: List view with vertical scrolling for simple mode
- `VirtualizedNewsGrid`: Grid layout for advanced mode
- `VirtualizedMasonryGrid`: Masonry layout for advanced mode with variable height items
- `VirtualizedNewsContainer`: Wrapper that handles switching between layouts based on interface mode
- `useVirtualizedKeyboardNav`: Hook that provides keyboard navigation for accessibility
- `LayoutSwitcher`: UI component for switching between different layouts in advanced mode

### Advanced Layout Options
The system provides three distinct layout options in advanced mode:

1. **List View**: Traditional vertical scrolling list with full-width items
   - Efficient for scanning through many items
   - Minimizes horizontal eye movement
   - Lower memory usage for long lists

2. **Grid View**: Fixed-size grid layout with consistent item heights
   - Efficiently displays more content in the same viewport
   - Uses virtualization for optimal performance
   - Provides consistent visual rhythm

3. **Masonry View**: Pinterest-style masonry layout with variable heights
   - Optimized for visual content with different aspect ratios
   - Avoids empty spaces by creating a tighter layout
   - Uses intersection observers for efficient infinite loading

### Performance Optimizations
- Debounced window resizing in useWindowDimensions to prevent excessive re-renders
- Memoization of components, callbacks, and computed values
- Virtualized rendering to minimize DOM elements
- Adaptive overscan based on interface mode (simple vs advanced)
- Stable item keys to maintain React reconciliation
- Responsive column count based on viewport width
- Layout-specific performance optimizations

### Accessibility Features
- Keyboard navigation (arrow keys, Home, End, Page Up/Down)
- Focus management with visual indicators
- ARIA attributes for screen readers
- Proper semantic HTML structure
- Screen reader announcements for layout changes

### Testing Utilities
- mockData.ts provides utility functions for generating test data:
  - `generateMockNewsItems(count, startIndex)`: Creates mock news items
  - `fetchMockNewsItems(page, itemsPerPage, delay)`: Simulates paginated API calls