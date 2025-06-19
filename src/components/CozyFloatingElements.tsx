
import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, TreePine } from 'lucide-react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  icon: 'sparkle' | 'heart' | 'tree';
  color: string;
}

const CozyFloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      const icons: Array<'sparkle' | 'heart' | 'tree'> = ['sparkle', 'heart', 'tree'];
      const colors = ['text-cozy-sage/20', 'text-cozy-warm/20', 'text-cozy-amber/20', 'text-cozy-forest/20'];

      for (let i = 0; i < 15; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          icon: icons[Math.floor(Math.random() * icons.length)],
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  const getIcon = (type: 'sparkle' | 'heart' | 'tree', size: number) => {
    const iconSize = `${size}px`;
    const iconProps = { 
      style: { width: iconSize, height: iconSize },
      className: 'opacity-30'
    };

    switch (type) {
      case 'sparkle': return <Sparkles {...iconProps} />;
      case 'heart': return <Heart {...iconProps} />;
      case 'tree': return <TreePine {...iconProps} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute ${element.color} animate-gentle-float`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {getIcon(element.icon, element.size)}
        </div>
      ))}
      
      {/* Subtle background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cozy-mint/5 via-transparent to-cozy-peach/5 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cozy-sage/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cozy-warm/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default CozyFloatingElements;
