
import { useState, useEffect, useRef } from 'react';

interface AudioOptions {
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
}

export const useAudio = (src: string, options: AudioOptions = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!src) return;
    
    audioRef.current = new Audio(src);
    const audio = audioRef.current;
    
    audio.volume = options.volume || 0.5;
    audio.loop = options.loop || false;
    
    const handleLoad = () => setIsLoaded(true);
    const handleEnd = () => setIsPlaying(false);
    
    audio.addEventListener('canplaythrough', handleLoad);
    audio.addEventListener('ended', handleEnd);
    
    if (options.autoplay && isLoaded) {
      play();
    }
    
    return () => {
      audio.removeEventListener('canplaythrough', handleLoad);
      audio.removeEventListener('ended', handleEnd);
      audio.pause();
    };
  }, [src, options.volume, options.loop, options.autoplay, isLoaded]);

  const play = () => {
    if (audioRef.current && isLoaded) {
      audioRef.current.play().catch(console.warn);
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return { play, pause, stop, isPlaying, isLoaded };
};

// Legacy compatibility - now uses the new ambient music system
export const useAmbientAudio = () => {
  const forestAmbient = useAudio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D2u2kdBi2E1PLbeSIFK4fH8dyJOAcEYLHy6JlKEQ', { volume: 0.3, loop: true });
  
  const playSuccess = () => {
    const successTone = useAudio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D2u2kdBi2E1PLbeSIFK4fH8dyJOAcEYLHy6JlKEQ', { volume: 0.6 });
    successTone.play();
  };

  return { forestAmbient, playSuccess };
};
