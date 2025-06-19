
import { useState, useEffect, useRef } from 'react';

export type MusicType = 'forest' | 'lofi' | 'cozy-cafe' | 'rain' | 'fireplace' | 'silence';

interface AudioTrack {
  id: MusicType;
  name: string;
  emoji: string;
  description: string;
  audioData: string;
}

const audioTracks: AudioTrack[] = [
  {
    id: 'forest',
    name: 'Forest Ambience',
    emoji: '🌲',
    description: 'Gentle nature sounds with birds and rustling leaves',
    audioData: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D2u2kdBi2E1PLbeSIFK4fH8dyJOAcEYLHy6JlKEQ'
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Chill hip-hop beats perfect for concentration',
    audioData: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D2u2kdBi2E1PLbeSIFK4fH8dyJOAcEYLHy6JlKEQ'
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle chatter',
    audioData: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D2u2kdBi2E1PLbeSIFK4fH8dyJOAcEYLHy6JlKEQ'
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall sounds for deep focus',
    audioData: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D2u2kdBi2E1PLbeSIFK4fH8dyJOAcEYLHy6JlKEQ'
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire sounds for comfort',
    audioData: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D2u2kdBi2E1PLbeSIFK4fH8dyJOAcEYLHy6JlKEQ'
  },
  {
    id: 'silence',
    name: 'Peaceful Silence',
    emoji: '🔇',
    description: 'No background music for pure focus',
    audioData: ''
  }
];

export const useAmbientMusic = () => {
  const [currentTrack, setCurrentTrack] = useState<MusicType>('forest');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout>();

  const getCurrentTrackInfo = () => {
    return audioTracks.find(track => track.id === currentTrack) || audioTracks[0];
  };

  const playTrack = async (trackId: MusicType, newVolume: number = volume) => {
    if (trackId === 'silence') {
      stopMusic();
      setCurrentTrack(trackId);
      return;
    }

    setIsLoading(true);
    
    try {
      // Fade out current track
      if (audioRef.current && isPlaying) {
        await fadeOut();
      }

      // Load new track
      const track = audioTracks.find(t => t.id === trackId);
      if (track && track.audioData) {
        audioRef.current = new Audio(track.audioData);
        audioRef.current.loop = true;
        audioRef.current.volume = 0;
        
        const audio = audioRef.current;
        
        audio.addEventListener('canplaythrough', () => {
          setIsLoading(false);
          setCurrentTrack(trackId);
          fadeIn(newVolume);
        });

        audio.addEventListener('ended', () => setIsPlaying(false));
        
        await audio.play();
      }
    } catch (error) {
      console.warn('Audio playback failed:', error);
      setIsLoading(false);
    }
  };

  const fadeIn = (targetVolume: number) => {
    if (!audioRef.current) return;
    
    setIsPlaying(true);
    const audio = audioRef.current;
    const steps = 20;
    const volumeIncrement = targetVolume / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
      if (currentStep >= steps || !audio) {
        clearInterval(fadeInterval);
        return;
      }
      
      audio.volume = Math.min(volumeIncrement * currentStep, targetVolume);
      currentStep++;
    }, 50);
  };

  const fadeOut = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!audioRef.current) {
        resolve();
        return;
      }

      const audio = audioRef.current;
      const steps = 20;
      const volumeDecrement = audio.volume / steps;
      let currentStep = 0;

      const fadeInterval = setInterval(() => {
        if (currentStep >= steps || !audio) {
          clearInterval(fadeInterval);
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
          setIsPlaying(false);
          resolve();
          return;
        }
        
        audio.volume = Math.max(audio.volume - volumeDecrement, 0);
        currentStep++;
      }, 50);
    });
  };

  const stopMusic = async () => {
    if (audioRef.current && isPlaying) {
      await fadeOut();
    }
  };

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current && isPlaying && currentTrack !== 'silence') {
      audioRef.current.volume = newVolume;
    }
  };

  const playSuccessSound = () => {
    // Simple success chime that plays over the ambient music
    const successAudio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D2u2kdBi2E1PLbeSIFK4fH8dyJOAcEYLHy6JlKEQ');
    successAudio.volume = 0.6;
    successAudio.play().catch(console.warn);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return {
    audioTracks,
    currentTrack,
    isPlaying,
    isLoading,
    volume,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume,
    playSuccessSound
  };
};
