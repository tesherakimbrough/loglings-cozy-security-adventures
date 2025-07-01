
import { useState, useEffect, useRef, useCallback } from 'react';
import { useMobileOptimization } from './useMobileOptimization';

interface GestureState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  isActive: boolean;
  startTime: number;
}

export const useEnhancedMobileGestures = () => {
  const { isMobile } = useMobileOptimization();
  const [gestureState, setGestureState] = useState<GestureState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    isActive: false,
    startTime: 0
  });

  const gestureRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();
  const [isLongPress, setIsLongPress] = useState(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isMobile) return;
    
    const touch = e.touches[0];
    const startTime = Date.now();
    
    setGestureState({
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      isActive: true,
      startTime
    });

    // Long press detection
    longPressTimer.current = setTimeout(() => {
      setIsLongPress(true);
      // Haptic feedback for long press
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }, 500);
  }, [isMobile]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!gestureState.isActive) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - gestureState.startX;
    const deltaY = touch.clientY - gestureState.startY;
    
    setGestureState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX,
      deltaY
    }));

    // Clear long press if user moves too much
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
      setIsLongPress(false);
    }
  }, [gestureState.isActive, gestureState.startX, gestureState.startY]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!gestureState.isActive) return;
    
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    const duration = Date.now() - gestureState.startTime;
    const velocity = Math.abs(gestureState.deltaX) / duration;
    
    setGestureState(prev => ({ ...prev, isActive: false }));
    setIsLongPress(false);
    
    return {
      deltaX: gestureState.deltaX,
      deltaY: gestureState.deltaY,
      velocity,
      duration,
      isSwipe: Math.abs(gestureState.deltaX) > 50 && velocity > 0.3,
      direction: gestureState.deltaX > 0 ? 'right' : 'left'
    };
  }, [gestureState]);

  useEffect(() => {
    const element = gestureRef.current;
    if (!element || !isMobile) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, isMobile]);

  const triggerHapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: 25,
        medium: 50,
        heavy: 100
      };
      navigator.vibrate(patterns[type]);
    }
  }, []);

  const addPullToRefresh = useCallback((onRefresh: () => void, threshold = 100) => {
    if (!isMobile) return;
    
    return (e: TouchEvent) => {
      if (gestureState.deltaY > threshold && gestureState.startY < 100) {
        triggerHapticFeedback('medium');
        onRefresh();
      }
    };
  }, [isMobile, gestureState.deltaY, gestureState.startY, triggerHapticFeedback]);

  return {
    gestureRef,
    gestureState,
    isLongPress,
    triggerHapticFeedback,
    addPullToRefresh,
    isSwipeGesture: Math.abs(gestureState.deltaX) > 50,
    swipeDirection: gestureState.deltaX > 0 ? 'right' : 'left'
  };
};
