
import { useState, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

interface MobileState {
  isMobile: boolean;
  isLandscape: boolean;
  touchSupported: boolean;
  isSmallScreen: boolean;
  screenHeight: number;
  screenWidth: number;
}

export const useMobileOptimization = () => {
  const isMobile = useIsMobile();
  const [mobileState, setMobileState] = useState<MobileState>({
    isMobile: false,
    isLandscape: false,
    touchSupported: false,
    isSmallScreen: false,
    screenHeight: 0,
    screenWidth: 0
  });

  useEffect(() => {
    const updateMobileState = () => {
      const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isLandscape = window.innerWidth > window.innerHeight;
      const isSmallScreen = window.innerHeight < 600 || window.innerWidth < 380;
      
      setMobileState({
        isMobile: !!isMobile,
        isLandscape,
        touchSupported,
        isSmallScreen,
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth
      });
    };

    updateMobileState();
    
    window.addEventListener('resize', updateMobileState);
    window.addEventListener('orientationchange', () => {
      // Delay to account for orientation change completion
      setTimeout(updateMobileState, 150);
    });
    
    return () => {
      window.removeEventListener('resize', updateMobileState);
      window.removeEventListener('orientationchange', updateMobileState);
    };
  }, [isMobile]);

  // Optimize touch interactions and prevent iOS zoom
  useEffect(() => {
    if (mobileState.touchSupported) {
      // Add touch-action optimization
      document.body.style.touchAction = 'manipulation';
      
      // Prevent zoom on double tap for iOS
      let lastTouchEnd = 0;
      const handleTouchEnd = (event: TouchEvent) => {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      };
      
      // Prevent pinch zoom
      const handleTouchMove = (event: TouchEvent) => {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      };
      
      document.addEventListener('touchend', handleTouchEnd, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      return () => {
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [mobileState.touchSupported]);

  // Handle viewport height changes (especially on iOS Safari)
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 150);
    });

    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  // Provide mobile-specific CSS classes
  const getMobileClasses = () => {
    const classes = [];
    
    if (mobileState.isMobile) {
      classes.push('mobile-optimized');
      classes.push('touch-device');
      // Add specific classes for different mobile breakpoints
      if (mobileState.screenWidth <= 320) classes.push('mobile-xs');
      else if (mobileState.screenWidth <= 375) classes.push('mobile-sm');
      else if (mobileState.screenWidth <= 414) classes.push('mobile-md');
      else classes.push('mobile-lg');
    }
    
    if (mobileState.isLandscape) classes.push('landscape-mode');
    if (mobileState.isSmallScreen) classes.push('small-screen');
    
    return classes.join(' ');
  };

  return {
    ...mobileState,
    getMobileClasses,
    shouldUseCompactLayout: mobileState.isMobile || mobileState.isSmallScreen,
    shouldShowMobileWarning: mobileState.isMobile && mobileState.isLandscape && mobileState.screenHeight < 400,
    isVerySmallScreen: mobileState.screenWidth <= 320 || mobileState.screenHeight <= 568
  };
};
