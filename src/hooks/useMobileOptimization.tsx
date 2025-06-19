
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
      const isSmallScreen = window.innerHeight < 600;
      
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
    window.addEventListener('orientationchange', updateMobileState);
    
    return () => {
      window.removeEventListener('resize', updateMobileState);
      window.removeEventListener('orientationchange', updateMobileState);
    };
  }, [isMobile]);

  // Optimize touch interactions
  const optimizeTouch = () => {
    if (mobileState.touchSupported) {
      // Add touch-action optimization
      document.body.style.touchAction = 'manipulation';
      
      // Prevent zoom on double tap
      let lastTouchEnd = 0;
      document.addEventListener('touchend', (event) => {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, { passive: false });
    }
  };

  useEffect(() => {
    optimizeTouch();
  }, [mobileState.touchSupported]);

  // Provide mobile-specific CSS classes
  const getMobileClasses = () => {
    const classes = [];
    
    if (mobileState.isMobile) classes.push('mobile-optimized');
    if (mobileState.isLandscape) classes.push('landscape-mode');
    if (mobileState.isSmallScreen) classes.push('small-screen');
    if (mobileState.touchSupported) classes.push('touch-device');
    
    return classes.join(' ');
  };

  return {
    ...mobileState,
    getMobileClasses,
    shouldUseCompactLayout: mobileState.isMobile || mobileState.isSmallScreen,
    shouldShowMobileWarning: mobileState.isMobile && mobileState.isLandscape && mobileState.screenHeight < 400
  };
};
