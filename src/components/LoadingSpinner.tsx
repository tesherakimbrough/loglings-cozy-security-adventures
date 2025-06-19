
import React from 'react';
import { cn } from '@/lib/utils';
import { Heart, Sparkles, TreePine } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
  cozyVariant?: 'default' | 'forest' | 'warm';
}

const LoadingSpinner = ({ 
  size = 'md', 
  className, 
  message,
  cozyVariant = 'default' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const getCozyIcon = () => {
    switch (cozyVariant) {
      case 'forest': return <TreePine className="w-6 h-6 text-leaf-glow animate-gentle-float firefly-twinkle" />;
      case 'warm': return <Heart className="w-6 h-6 text-warm-amber animate-cozy-pulse" />;
      default: return <Sparkles className="w-6 h-6 text-sage-whisper animate-sparkle" />;
    }
  };

  const getCozyMessages = () => {
    const messages = [
      "The Loglings are preparing something magical...",
      "Gathering forest wisdom and warm memories...",
      "Sprinkling cozy dust on your adventure...",
      "The ancient trees are sharing their secrets...",
      "Creating a warm, safe space for learning..."
    ];
    return message || messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-4 p-8",
      "cozy-card candlelit-warmth",
      className
    )}>
      <div className="relative">
        <div 
          className={cn(
            "border-4 rounded-full animate-spin",
            "border-moss-glow/30 border-t-leaf-glow",
            sizeClasses[size]
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {getCozyIcon()}
        </div>
      </div>
      
      {message !== undefined && (
        <div className="text-center space-y-2">
          <p className="text-leaf-glow font-cozy font-medium animate-cozy-pulse cozy-body">
            {getCozyMessages()}
          </p>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bg-sage-whisper rounded-full animate-gentle-bounce firefly-twinkle"></div>
            <div className="w-2 h-2 bg-leaf-glow rounded-full animate-gentle-bounce animation-delay-300 firefly-twinkle"></div>
            <div className="w-2 h-2 bg-warm-amber rounded-full animate-gentle-bounce animation-delay-600 firefly-twinkle"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
