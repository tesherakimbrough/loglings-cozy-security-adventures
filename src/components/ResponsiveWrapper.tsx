
import { ReactNode } from 'react';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
}

export const ResponsiveWrapper = ({ children, className = '' }: ResponsiveWrapperProps) => {
  const { getMobileClasses, shouldUseCompactLayout, shouldShowMobileWarning } = useMobileOptimization();

  return (
    <div className={`${getMobileClasses()} ${className}`}>
      {shouldShowMobileWarning && (
        <div className="fixed top-0 left-0 right-0 bg-amber-500 text-white p-2 text-xs text-center z-50">
          For best experience, please rotate to portrait mode
        </div>
      )}
      <div className={shouldUseCompactLayout ? 'space-y-3' : 'space-y-6'}>
        {children}
      </div>
    </div>
  );
};
