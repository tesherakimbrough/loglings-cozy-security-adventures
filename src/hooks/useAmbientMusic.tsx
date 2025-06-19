
import { useState, useEffect, useRef } from 'react';

export type MusicType = 'forest' | 'lofi' | 'cozy-cafe' | 'rain' | 'fireplace' | 'silence';

interface AudioTrack {
  id: MusicType;
  name: string;
  emoji: string;
  description: string;
  audioUrl: string;
}

const audioTracks: AudioTrack[] = [
  {
    id: 'forest',
    name: 'Forest Ambience',
    emoji: '🌲',
    description: 'Gentle nature sounds with birds and rustling leaves',
    audioUrl: 'https://www.soundjay.com/misc/sounds-807.mp3'
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Chill hip-hop beats perfect for concentration',
    audioUrl: 'https://www.soundjay.com/misc/sounds-808.mp3'
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle chatter',
    audioUrl: 'https://www.soundjay.com/misc/sounds-809.mp3'
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall sounds for deep focus',
    audioUrl: 'https://www.soundjay.com/misc/sounds-810.mp3'
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire sounds for comfort',
    audioUrl: 'https://www.soundjay.com/misc/sounds-811.mp3'
  },
  {
    id: 'silence',
    name: 'Peaceful Silence',
    emoji: '🔇',
    description: 'No background music for pure focus',
    audioUrl: ''
  }
];

export const useAmbientMusic = () => {
  const [currentTrack, setCurrentTrack] = useState<MusicType>('forest');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout>();

  // Create a simple oscillator-based ambient sound generator
  const createAmbientAudio = (trackId: MusicType): HTMLAudioElement => {
    // Create audio context for generating ambient sounds
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configure based on track type
    switch (trackId) {
      case 'forest':
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.type = 'sawtooth';
        break;
      case 'rain':
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.type = 'triangle';
        break;
      case 'fireplace':
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
        oscillator.type = 'square';
        break;
      case 'lofi':
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
        oscillator.type = 'sine';
        break;
      case 'cozy-cafe':
        oscillator.frequency.setValueAtTime(250, audioContext.currentTime);
        oscillator.type = 'triangle';
        break;
      default:
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.type = 'sine';
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Create a mock audio element that represents our generated sound
    const mockAudio = {
      play: () => {
        oscillator.start();
        return Promise.resolve();
      },
      pause: () => {
        try {
          oscillator.stop();
        } catch (e) {
          // Oscillator may already be stopped
        }
      },
      currentTime: 0,
      volume: volume,
      loop: true,
      addEventListener: () => {},
      removeEventListener: () => {}
    } as any;

    return mockAudio;
  };

  const getCurrentTrackInfo = () => {
    return audioTracks.find(track => track.id === currentTrack) || audioTracks[0];
  };

  const stopMusic = async (): Promise<void> => {
    return new Promise((resolve) => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } catch (error) {
          console.warn('Error stopping audio:', error);
        }
        audioRef.current = null;
      }
      setIsPlaying(false);
      setIsLoading(false);
      resolve();
    });
  };

  const playTrack = async (trackId: MusicType, newVolume: number = volume): Promise<void> => {
    console.log('Playing track:', trackId, 'volume:', newVolume);
    
    if (trackId === 'silence') {
      await stopMusic();
      setCurrentTrack(trackId);
      return;
    }

    setIsLoading(true);
    
    try {
      // Stop current track
      await stopMusic();

      // Mark that user has interacted
      setHasUserInteracted(true);

      // Create ambient audio for the selected track
      const audio = createAmbientAudio(trackId);
      audio.volume = newVolume;
      
      audioRef.current = audio;
      
      // Start playing
      await audio.play();
      
      setIsLoading(false);
      setCurrentTrack(trackId);
      setIsPlaying(true);
      setVolume(newVolume);
      
    } catch (error) {
      console.warn('Audio playback failed:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current && isPlaying && currentTrack !== 'silence') {
      audioRef.current.volume = newVolume;
    }
  };

  const playSuccessSound = () => {
    if (!hasUserInteracted) return;
    
    try {
      // Create a simple success beep
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Success sound failed:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
      if (audioRef.current) {
        try {
          audioRef.current.pause();
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
        audioRef.current = null;
      }
    };
  }, []);

  return {
    audioTracks,
    currentTrack,
    isPlaying,
    isLoading,
    volume,
    hasUserInteracted,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume,
    playSuccessSound
  };
};
