# Performance Optimization Guide

This document outlines the performance optimizations implemented in the Notroom codebase.

## Build Optimizations

### Code Splitting
- **Vendor Chunks**: Separated React, UI libraries, and form libraries into distinct chunks for better caching
- **Manual Chunks**: Configured in `vite.config.ts` to split large dependencies
- **Lazy Loading**: Ready for route-based code splitting (implement with React.lazy() as needed)

### Bundle Size
- Chunk size warning limit set to 1000KB
- Source maps configured for production debugging (hidden from browser)
- Dependencies optimized through Vite's `optimizeDeps`

## SEO Enhancements

### Sitemap
- Comprehensive sitemap at `/public/sitemap.xml`
- Includes all service pages, area pages, and utility pages
- Proper priority and changefreq settings
- Referenced in `robots.txt`

### Robots.txt
- Enhanced with specific crawler permissions
- Includes sitemap reference
- Disallows admin and utility pages
- Crawl-delay settings for major search engines

### Structured Data
- LocalBusiness schema in `index.html`
- Service catalog with offer details
- AggregateRating for SEO boost
- Page-specific schemas in individual pages

## Performance Utilities

### Analytics (`src/utils/analytics.ts`)
- Event tracking system ready for integration
- Page view tracking
- Booking and conversion tracking
- CTA click tracking

### Validation (`src/utils/validation.ts`)
- Input sanitization to prevent XSS
- Phone number formatting
- Email validation
- Debounce function for input optimization

### Performance Monitoring (`src/utils/performance.ts`)
- Render time measurement
- Performance metrics logging
- Lazy image loading
- Route prefetching
- Reduced motion detection

## Custom Hooks

### useIntersectionObserver
- Lazy loading components
- Scroll animations
- Infinite scroll support
- Freeze-once-visible option

### useDebounce
- Search input optimization
- Form validation delay
- API call throttling

### useLocalStorage
- State persistence
- Cross-tab synchronization
- Error handling

## Components

### LoadingSpinner
- Accessible loading indicator
- Three size variants (sm, md, lg)
- Optional loading text
- ARIA labels for screen readers

### Enhanced ErrorBoundary
- Improved error display
- Refresh and home navigation
- Contact information for support
- Development-only error details

## Accessibility

### Skip Navigation
- Skip to main content link
- Keyboard accessible
- Screen reader optimized

### Touch Targets
- Minimum 44x44px for all interactive elements
- Enhanced button variants

### ARIA Labels
- Comprehensive ARIA labels throughout
- Proper roles and landmarks
- Live regions for dynamic content

## Browser Caching

### .htaccess Configuration
- Compression enabled (mod_deflate)
- Long-term caching for static assets
- Security headers configured
- HTTPS redirect ready

## Recommendations for Further Optimization

1. **Implement Service Worker**: Add PWA capabilities with offline support
2. **Image Optimization**: Use WebP format with fallbacks, implement responsive images
3. **Critical CSS**: Extract and inline critical CSS for above-the-fold content
4. **Font Optimization**: Self-host Google Fonts, use font-display: swap
5. **Lazy Load Routes**: Implement React.lazy() for route-based code splitting
6. **Analytics Integration**: Connect analytics.ts to Google Analytics or alternative
7. **Error Tracking**: Integrate Sentry or similar service in ErrorBoundary
8. **Resource Hints**: Add preconnect/prefetch for external resources
9. **CDN**: Serve static assets through CDN
10. **Performance Monitoring**: Set up Real User Monitoring (RUM)

## Monitoring

Use Chrome DevTools Lighthouse to measure:
- Performance score
- Accessibility score
- Best practices score
- SEO score

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Testing

Test performance on:
- Desktop (Chrome, Firefox, Safari, Edge)
- Mobile (Chrome mobile, Safari iOS)
- Slow 3G network throttling
- Various viewport sizes

## Maintenance

- Update sitemap.xml when adding new pages
- Review bundle sizes monthly
- Monitor Core Web Vitals
- Update dependencies quarterly
- Review analytics data monthly