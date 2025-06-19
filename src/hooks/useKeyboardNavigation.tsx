
import { useEffect, useCallback } from 'react';

export const useKeyboardNavigation = () => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Skip link for screen readers
    if (event.key === 'Tab' && !event.shiftKey && event.target === document.body) {
      const skipLink = document.querySelector('.skip-link') as HTMLElement;
      if (skipLink) {
        skipLink.focus();
      }
    }

    // Escape key to close modals/dialogs
    if (event.key === 'Escape') {
      const modals = document.querySelectorAll('[role="dialog"], [data-modal="true"]');
      modals.forEach(modal => {
        const closeButton = modal.querySelector('[data-close="true"], .close-button');
        if (closeButton && modal.getAttribute('aria-hidden') !== 'true') {
          (closeButton as HTMLElement).click();
        }
      });
    }

    // Arrow keys for game navigation
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      const focusableElements = document.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element);
      
      if (currentIndex !== -1) {
        let nextIndex = currentIndex;
        
        switch (event.key) {
          case 'ArrowDown':
          case 'ArrowRight':
            nextIndex = (currentIndex + 1) % focusableElements.length;
            break;
          case 'ArrowUp':
          case 'ArrowLeft':
            nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
            break;
        }
        
        if (nextIndex !== currentIndex) {
          event.preventDefault();
          (focusableElements[nextIndex] as HTMLElement).focus();
        }
      }
    }

    // Space or Enter to activate buttons
    if ((event.key === ' ' || event.key === 'Enter') && 
        event.target instanceof HTMLElement && 
        event.target.getAttribute('role') === 'button' && 
        !event.target.disabled) {
      event.preventDefault();
      event.target.click();
    }
  }, []);

  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  const focusFirst = useCallback((container?: HTMLElement) => {
    const focusableElements = (container || document).querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    announceToScreenReader,
    focusFirst
  };
};
