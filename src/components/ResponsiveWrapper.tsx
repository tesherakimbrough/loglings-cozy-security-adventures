
import React, { ReactNode } from 'react';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useEnhancedMobileGestures } from '../hooks/useEnhancedMobileGestures';
import { useOfflineMode } from '../hooks/useOfflineMode';
import { usePerformanceOptimizer } from '../hooks/usePerformanceOptimizer';

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onPullRefresh?: () => void;
}

export const ResponsiveWrapper = ({ 
  children, 
  className = '',
  onSwipeLeft,
  onSwipeRight,
  onPullRefresh
}: ResponsiveWrapperProps) => {
  const { getMobileClasses, shouldUseCompactLayout, shouldShowMobileWarning } = useMobileOptimization();
  const { gestureRef, swipeDirection, isSwipeGesture, addPullToRefresh } = useEnhancedMobileGestures();
  const { isOnline, isOfflineMode, canPlayOffline } = useOfflineMode();
  const { preloadImages } = usePerformanceOptimizer();

  // Handle gesture events
  React.useEffect(() => {
    if (isSwipeGesture) {
      if (swipeDirection === 'left' && onSwipeLeft) {
        onSwipeLeft();
      } else if (swipeDirection === 'right' && onSwipeRight) {
        onSwipeRight();
      }
    }
  }, [isSwipeGesture, swipeDirection, onSwipeLeft, onSwipeRight]);

  // Add pull-to-refresh if handler provided
  React.useEffect(() => {
    if (onPullRefresh) {
      const element = gestureRef.current;
      if (element) {
        const pullRefreshHandler = addPullToRefresh(onPullRefresh);
        element.addEventListener('touchend', pullRefreshHandler);
        return () => element.removeEventListener('touchend', pullRefreshHandler);
      }
    }
  }, [onPullRefresh, addPullToRefresh]);

  // Preload critical images on mount
  React.useEffect(() => {
    preloadImages(['/favicon.ico']); // Add more critical images as needed
  }, [preloadImages]);

  return (
    <div 
      ref={gestureRef}
      className={`w-full ${getMobileClasses()} ${className}`} 
      style={{
        minHeight: '100dvh', // Dynamic viewport height for modern browsers
        paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
        paddingTop: 'env(safe-area-inset-top)'
      }}
    >
      {/* Offline/Online Status Indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white p-2 text-xs text-center z-50">
          {canPlayOffline 
            ? '🌿 Playing offline - Your progress will sync when connected'
            : '📡 Offline mode - Limited functionality available'
          }
        </div>
      )}
      
      {shouldShowMobileWarning && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white p-2 text-xs text-center z-50">
          For best experience, please rotate to portrait mode
        </div>
      )}
      
      <div 
        className={`w-full min-h-full ${shouldUseCompactLayout ? 'space-y-3' : 'space-y-6'}`}
        style={{
          overflowX: 'hidden',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch' // iOS smooth scrolling
        }}
      >
        {children}
      </div>
    </div>
  );
};
