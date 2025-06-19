
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0
  });

  useEffect(() => {
    // Measure page load time
    const measureLoadTime = () => {
      if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        setMetrics(prev => ({ ...prev, loadTime }));
      }
    };

    // Measure memory usage if available
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMetrics(prev => ({ 
          ...prev, 
          memoryUsage: memory.usedJSHeapSize / 1024 / 1024 // MB
        }));
      }
    };

    // Measure initial render time
    const startTime = performance.now();
    requestAnimationFrame(() => {
      const renderTime = performance.now() - startTime;
      setMetrics(prev => ({ ...prev, renderTime }));
    });

    measureLoadTime();
    measureMemory();

    // Monitor performance periodically
    const interval = setInterval(measureMemory, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const logPerformanceWarning = (metric: string, value: number, threshold: number) => {
    if (value > threshold) {
      console.warn(`Performance warning: ${metric} (${value}) exceeds threshold (${threshold})`);
    }
  };

  // Check for performance issues
  useEffect(() => {
    logPerformanceWarning('Load Time', metrics.loadTime, 3000); // 3 seconds
    logPerformanceWarning('Render Time', metrics.renderTime, 16); // 16ms for 60fps
    if (metrics.memoryUsage) {
      logPerformanceWarning('Memory Usage', metrics.memoryUsage, 100); // 100MB
    }
  }, [metrics]);

  return {
    metrics,
    isLoadingSlow: metrics.loadTime > 3000,
    isRenderingSlow: metrics.renderTime > 16,
    isMemoryHigh: (metrics.memoryUsage || 0) > 100
  };
};
