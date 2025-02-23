# HackerHome Development Root Context

## Project Vision 2025

HackerHome is evolving into a dual-mode tech news aggregator that caters to both casual readers and power users. The project is undergoing a comprehensive revamp for 2025, as detailed in our [2025 Revamp Document](revamp-2025.md).

### Core Pillars

1. **Dual-Mode Interface**
   - Simple Mode: Clean, fast, essential features
   - Advanced Mode: Rich features, customization, community tools
   - Seamless mode switching with persistent preferences

2. **Performance Optimization**
   - Virtual list implementation
   - Enhanced memoization
   - Smart caching strategy
   - Asset optimization
   - Code splitting

3. **Content Enhancement**
   - Multi-source aggregation
   - Rich metadata integration
   - Personalized content delivery
   - Community features

## Development Standards

### Code Quality
- Strict TypeScript mode
- Component-based architecture
- Comprehensive testing
- Performance monitoring
- Accessibility compliance

### Performance Targets
- Page load < 2s
- Time to interactive < 3s
- First contentful paint < 1s
- Smooth mode transitions < 300ms

### Documentation
- Keep documentation in sync with code
- Update [2025 Revamp Document](revamp-2025.md) for major changes
- Maintain clear development guidelines
- Document all architectural decisions

## Implementation Guidelines

### Architecture
```typescript
// Feature-based organization
src/
├── features/
│   ├── interface-modes/
│   ├── content/
│   └── performance/
├── shared/
│   ├── components/
│   └── utils/
└── config/
    └── modes/
```

### Component Structure
```typescript
// Mode-aware components
const Component: React.FC<Props> = ({ mode, ...props }) => {
  const config = useInterfaceConfig(mode);
  return mode === 'simple' 
    ? <SimpleVariant {...props} />
    : <AdvancedVariant {...props} config={config} />;
};
```

### Performance Patterns
```typescript
// Mode-specific optimization
const useOptimization = (mode: InterfaceMode) => {
  return {
    caching: mode === 'simple' ? 'aggressive' : 'balanced',
    preload: mode === 'simple' ? ['essential'] : ['essential', 'advanced'],
    defer: mode === 'simple' ? ['advanced', 'experimental'] : ['experimental']
  };
};
```

## Essential References

1. [2025 Revamp Document](revamp-2025.md)
2. [Product Requirements](prd.md)
3. [Project Roadmap](projectRoadMap.md)
4. [UI/UX Guide](ui/guide.md)
5. [Performance Guide](development/performance-optimization.md)

## Getting Started

1. Review the [2025 Revamp Document](revamp-2025.md)
2. Study the [Product Requirements](prd.md)
3. Follow the [Project Roadmap](projectRoadMap.md)
4. Implement according to [UI/UX Guide](ui/guide.md)
5. Optimize using [Performance Guide](development/performance-optimization.md)
