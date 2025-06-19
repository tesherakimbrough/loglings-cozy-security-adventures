
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
}

const LoadingSpinner = ({ size = 'md', className, message }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div 
        className={cn(
          "border-4 border-primary border-t-transparent rounded-full animate-spin",
          sizeClasses[size]
        )}
      />
      {message && (
        <p className="text-muted-foreground text-sm animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
