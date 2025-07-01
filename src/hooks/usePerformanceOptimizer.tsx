import React, { useEffect, useCallback, useRef } from 'react';
import { usePerformance } from './usePerformance';

export const usePerformanceOptimizer = () => {
  const { metrics } = usePerformance();
  const preloadedImages = useRef<Set<string>>(new Set());
  const preloadedComponents = useRef<Set<string>>(new Set());

  // Preload critical images
  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (preloadedImages.current.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        preloadedImages.current.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  // Preload multiple images
  const preloadImages = useCallback(async (sources: string[]) => {
    const promises = sources.map(src => preloadImage(src));
    try {
      await Promise.all(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }, [preloadImage]);

  // Lazy load component
  const lazyLoadComponent = useCallback((importFn: () => Promise<any>) => {
    return React.lazy(() => {
      return importFn().catch(() => {
        // Fallback component on error
        return {
          default: () => React.createElement('div', { 
            className: 'p-4 text-center text-muted-foreground' 
          }, 'Component temporarily unavailable')
        };
      });
    });
  }, []);

  // Optimize bundle loading with prefetch
  const prefetchRoute = useCallback((routePath: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = routePath;
    document.head.appendChild(link);
  }, []);

  // Virtual scrolling for large lists
  const createVirtualScroller = useCallback((items: any[], itemHeight: number, containerHeight: number) => {
    const visibleItems = Math.ceil(containerHeight / itemHeight);
    const buffer = 5; // Extra items for smooth scrolling
    
    return {
      getVisibleRange: (scrollTop: number) => {
        const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
        const endIndex = Math.min(items.length - 1, startIndex + visibleItems + buffer * 2);
        return { startIndex, endIndex };
      },
      getTotalHeight: () => items.length * itemHeight,
      getItemStyle: (index: number) => ({
        position: 'absolute' as const,
        top: index * itemHeight,
        height: itemHeight,
        width: '100%'
      })
    };
  }, []);

  // Resource hints for better loading
  const addResourceHints = useCallback(() => {
    // DNS prefetch for external resources
    const dnsPrefetchDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });

    // Preconnect to critical origins
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  // Memory management
  const optimizeMemory = useCallback(() => {
    // Clear unused caches periodically
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          if (cacheName.includes('old-') || cacheName.includes('temp-')) {
            caches.delete(cacheName);
          }
        });
      });
    }

    // Clear old localStorage entries
    const oldKeys = Object.keys(localStorage).filter(key => 
      key.startsWith('loglings-old-') || 
      (key.startsWith('loglings-temp-') && Date.now() - parseInt(key.split('-').pop() || '0') > 86400000)
    );
    oldKeys.forEach(key => localStorage.removeItem(key));
  }, []);

  // Initialize performance optimizations
  useEffect(() => {
    addResourceHints();
    
    // Run memory optimization every 5 minutes
    const memoryInterval = setInterval(optimizeMemory, 300000);
    
    return () => {
      clearInterval(memoryInterval);
    };
  }, [addResourceHints, optimizeMemory]);

  // Monitor and report performance
  useEffect(() => {
    // Report performance metrics periodically
    const reportMetrics = () => {
      if (metrics.loadTime > 3000) {
        console.warn('Slow page load detected:', metrics.loadTime + 'ms');
      }
      if (metrics.memoryUsage && metrics.memoryUsage > 100) {
        console.warn('High memory usage detected:', metrics.memoryUsage + 'MB');
      }
    };

    const metricsInterval = setInterval(reportMetrics, 30000);
    return () => clearInterval(metricsInterval);
  }, [metrics]);

  return {
    preloadImage,
    preloadImages,
    lazyLoadComponent,
    prefetchRoute,
    createVirtualScroller,
    optimizeMemory,
    metrics,
    isPerformanceGood: metrics.loadTime < 2000 && (metrics.memoryUsage || 0) < 50
  };
};
