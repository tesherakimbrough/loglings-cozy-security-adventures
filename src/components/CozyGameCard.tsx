
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CozyGameCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'magical' | 'warm';
  showDecorative?: boolean;
}

const CozyGameCard = ({ 
  children, 
  className, 
  variant = 'magical',
  showDecorative = true 
}: CozyGameCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'magical':
        return 'cozy-card animate-fade-in relative z-10 backdrop-blur-md border-2 border-primary/20';
      case 'warm':
        return 'cozy-card animate-scale-in warm-glow relative z-10';
      default:
        return 'cozy-card animate-fade-in relative z-10';
    }
  };

  return (
    <Card className={cn(getVariantClasses(), className)}>
      {showDecorative && (
        <>
          {/* Magical shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gentle-float opacity-50 pointer-events-none rounded-lg" />
          
          {/* Corner sparkles */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-amber-300/60 rounded-full animate-sparkle" />
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-rose-300/60 rounded-full animate-sparkle animation-delay-1000" />
        </>
      )}
      {children}
    </Card>
  );
};

export { CozyGameCard, CardContent, CardHeader };
export default CozyGameCard;
