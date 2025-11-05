# Performance Optimization Techniques

Web performance isn't just about making things fast—it's about creating better user experiences. This guide covers essential techniques for optimizing modern web applications, from initial load time to runtime performance.

## Why Performance Matters

Research shows that:
- 53% of mobile users abandon sites that take over 3 seconds to load
- Every 100ms delay in load time can hurt conversion rates by 7%
- Faster sites rank better in search results

## Measuring Performance

### Core Web Vitals

Google's Core Web Vitals are key metrics for measuring user experience:

**1. Largest Contentful Paint (LCP)** - Loading performance
- Good: < 2.5 seconds
- Needs Improvement: 2.5-4 seconds
- Poor: > 4 seconds

**2. First Input Delay (FID)** - Interactivity
- Good: < 100ms
- Needs Improvement: 100-300ms
- Poor: > 300ms

**3. Cumulative Layout Shift (CLS)** - Visual stability
- Good: < 0.1
- Needs Improvement: 0.1-0.25
- Poor: > 0.25

### Tools for Measurement

- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: Detailed performance analysis
- **Chrome DevTools Performance Tab**: Runtime performance profiling

## Bundle Size Optimization

### 1. Code Splitting

Split your code to load only what's needed:

```typescript
// Route-based splitting
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. Tree Shaking

Import only what you need:

```typescript
// ❌ Bad: Imports entire library
import _ from 'lodash';
const result = _.debounce(fn, 300);

// ✅ Good: Imports only needed function
import debounce from 'lodash/debounce';
const result = debounce(fn, 300);
```

### 3. Analyze Bundle

Use webpack-bundle-analyzer to visualize your bundle:

```bash
npm install --save-dev webpack-bundle-analyzer
```

## Image Optimization

Images often account for 50%+ of page weight.

### 1. Choose the Right Format

- **WebP**: 25-35% smaller than JPEG
- **AVIF**: Even better compression, but less browser support
- **SVG**: For icons and simple graphics

### 2. Responsive Images

Serve appropriate sizes for different devices:

```html
<img
  srcset="
    small.jpg 400w,
    medium.jpg 800w,
    large.jpg 1200w
  "
  sizes="
    (max-width: 400px) 400px,
    (max-width: 800px) 800px,
    1200px
  "
  src="medium.jpg"
  alt="Description"
/>
```

### 3. Lazy Loading

Load images only when they're about to enter the viewport:

```html
<img 
  src="image.jpg" 
  loading="lazy" 
  alt="Description"
/>
```

## Network Optimization

### 1. HTTP/2 Server Push

Push critical resources before they're requested:

```
Link: </style.css>; rel=preload; as=style
Link: </script.js>; rel=preload; as=script
```

### 2. Resource Hints

Help browsers prioritize resources:

```html
<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="https://api.example.com">

<!-- Preconnect for critical resources -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- Prefetch for next page -->
<link rel="prefetch" href="/next-page.html">
```

### 3. Compression

Enable Gzip or Brotli compression:

```nginx
# Nginx configuration
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

## Runtime Performance

### 1. Avoid Layout Thrashing

Batch DOM reads and writes:

```javascript
// ❌ Bad: Multiple layout thrashing
for (let i = 0; i < elements.length; i++) {
  const height = elements[i].offsetHeight; // Read
  elements[i].style.height = height + 10 + 'px'; // Write
}

// ✅ Good: Batch reads, then writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});
```

### 2. Debounce and Throttle

Limit expensive operations:

```typescript
// Debounce: Execute after user stops typing
const handleSearch = debounce((query: string) => {
  fetchResults(query);
}, 300);

// Throttle: Execute at most once per interval
const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

### 3. Virtual Scrolling

For long lists, render only visible items:

```typescript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index]}
        </div>
      )}
    </FixedSizeList>
  );
}
```

## React-Specific Optimizations

### 1. Memoization

Prevent unnecessary re-renders:

```typescript
// Memoize components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Render data */}</div>;
});

// Memoize values
const sortedData = useMemo(() => {
  return data.sort((a, b) => a - b);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);
```

### 2. Avoid Inline Functions

Create functions outside render when possible:

```typescript
// ❌ Bad: New function on every render
<button onClick={() => handleClick(id)}>
  Click
</button>

// ✅ Good: Stable function reference
const onClick = useCallback(() => {
  handleClick(id);
}, [id]);

<button onClick={onClick}>
  Click
</button>
```

## Monitoring in Production

### 1. Real User Monitoring (RUM)

Track actual user experiences:

```typescript
// Web Vitals library
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

### 2. Performance Budget

Set limits and alert when exceeded:

```json
{
  "budgets": [
    {
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 200
        },
        {
          "resourceType": "total",
          "budget": 500
        }
      ]
    }
  ]
}
```

## Checklist

- [ ] Enable compression (Gzip/Brotli)
- [ ] Implement code splitting
- [ ] Optimize images (format, size, lazy loading)
- [ ] Minimize JavaScript bundle size
- [ ] Use production builds
- [ ] Implement caching strategy
- [ ] Monitor Core Web Vitals
- [ ] Set performance budgets
- [ ] Test on real devices and networks

## Conclusion

Performance optimization is an ongoing process. Start with the biggest wins (usually bundle size and images), measure the impact, and iterate. Remember to test on real devices with real network conditions—your development machine is much faster than your users' devices.

## Resources

- Web.dev Performance: https://web.dev/performance
- MDN Performance: https://developer.mozilla.org/en-US/docs/Web/Performance
- Chrome DevTools: https://developer.chrome.com/docs/devtools

