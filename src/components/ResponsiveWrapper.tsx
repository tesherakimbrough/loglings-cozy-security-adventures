
import { ReactNode } from 'react';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
}

export const ResponsiveWrapper = ({ children, className = '' }: ResponsiveWrapperProps) => {
  const { getMobileClasses, shouldUseCompactLayout, shouldShowMobileWarning } = useMobileOptimization();

  return (
    <div className={`w-full min-h-screen ${getMobileClasses()} ${className}`} style={{
      minHeight: '100vh', // Fallback for older browsers
      minHeight: '100dvh', // Dynamic viewport height for modern browsers
      paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)',
      paddingTop: 'env(safe-area-inset-top)'
    }}>
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
