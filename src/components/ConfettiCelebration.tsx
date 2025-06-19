
import { useEffect, useState } from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

interface ConfettiCelebrationProps {
  isActive: boolean;
  onComplete?: () => void;
}

const ConfettiCelebration = ({ isActive, onComplete }: ConfettiCelebrationProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; color: string; icon: 'sparkle' | 'heart' | 'star' }>>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2000,
        color: ['text-amber-400', 'text-rose-400', 'text-green-400', 'text-blue-400', 'text-purple-400'][Math.floor(Math.random() * 5)],
        icon: (['sparkle', 'heart', 'star'] as const)[Math.floor(Math.random() * 3)]
      }));
      
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const getIcon = (iconType: 'sparkle' | 'heart' | 'star') => {
    switch (iconType) {
      case 'sparkle':
        return Sparkles;
      case 'heart':
        return Heart;
      case 'star':
        return Star;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => {
        const Icon = getIcon(particle.icon);
        return (
          <div
            key={particle.id}
            className={`absolute animate-confetti-fall ${particle.color}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}ms`,
              animationDuration: '3s'
            }}
          >
            <Icon className="w-6 h-6 animate-spin" />
          </div>
        );
      })}
      
      {/* Central burst effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="animate-ping">
          <Sparkles className="w-12 h-12 text-amber-400" />
        </div>
      </div>
    </div>
  );
};

export default ConfettiCelebration;
