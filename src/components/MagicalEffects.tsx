
import React from 'react';
import { Sparkles, TreePine, Heart, Star } from 'lucide-react';

interface MagicalEffectsProps {
  intensity?: 'subtle' | 'moderate' | 'magical';
  theme?: 'forest' | 'warm' | 'celebration';
}

const MagicalEffects = ({ intensity = 'moderate', theme = 'forest' }: MagicalEffectsProps) => {
  const getThemeElements = () => {
    switch (theme) {
      case 'warm':
        return [
          { icon: Heart, color: 'text-warm-amber', delay: '0s' },
          { icon: Sparkles, color: 'text-sunset-peach', delay: '1s' },
          { icon: Star, color: 'text-berry-blush', delay: '2s' }
        ];
      case 'celebration':
        return [
          { icon: Sparkles, color: 'text-amber-400', delay: '0s' },
          { icon: Star, color: 'text-rose-400', delay: '0.5s' },
          { icon: Heart, color: 'text-green-400', delay: '1s' },
          { icon: TreePine, color: 'text-emerald-400', delay: '1.5s' }
        ];
      default: // forest
        return [
          { icon: TreePine, color: 'text-leaf-glow', delay: '0s' },
          { icon: Sparkles, color: 'text-sage-whisper', delay: '1s' },
          { icon: Heart, color: 'text-spring-moss', delay: '2s' }
        ];
    }
  };

  const getIntensityCount = () => {
    switch (intensity) {
      case 'subtle': return 3;
      case 'magical': return 8;
      default: return 5;
    }
  };

  const elements = getThemeElements();
  const positions = [
    'top-10 left-10',
    'top-20 right-16',
    'top-40 left-1/4',
    'top-60 right-1/3',
    'bottom-32 left-16',
    'bottom-20 right-10',
    'top-1/3 left-1/2',
    'bottom-1/2 right-1/4'
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: getIntensityCount() }).map((_, index) => {
        const element = elements[index % elements.length];
        const position = positions[index % positions.length];
        const IconComponent = element.icon;
        
        return (
          <div
            key={index}
            className={`absolute ${position} animate-gentle-float firefly-twinkle`}
            style={{ 
              animationDelay: element.delay,
              animationDuration: `${3 + (index % 2)}s`
            }}
          >
            <IconComponent className={`w-6 h-6 ${element.color}/60`} />
          </div>
        );
      })}
      
      {/* Floating sparkle dots */}
      {Array.from({ length: Math.ceil(getIntensityCount() / 2) }).map((_, index) => (
        <div
          key={`dot-${index}`}
          className={`absolute w-1.5 h-1.5 rounded-full animate-sparkle ${
            index % 3 === 0 ? 'bg-amber-300/40' : 
            index % 3 === 1 ? 'bg-rose-300/40' : 'bg-green-300/40'
          }`}
          style={{
            top: `${20 + (index * 15) % 60}%`,
            left: `${15 + (index * 25) % 70}%`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${2 + (index % 2)}s`
          }}
        />
      ))}
    </div>
  );
};

export default MagicalEffects;
