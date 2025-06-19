
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
    audioUrl: ''
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Chill hip-hop beats perfect for concentration',
    audioUrl: ''
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle chatter',
    audioUrl: ''
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall sounds for deep focus',
    audioUrl: ''
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire sounds for comfort',
    audioUrl: ''
  },
  {
    id: 'silence',
    name: 'Peaceful Silence',
    emoji: '🔇',
    description: 'No background music for pure focus',
    audioUrl: ''
  }
];

interface AmbientAudio {
  play: () => Promise<void>;
  pause: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const useAmbientMusic = () => {
  const [currentTrack, setCurrentTrack] = useState<MusicType>('forest');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<AmbientAudio | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Create ambient audio with multiple layers for realistic soundscapes
  const createAmbientAudio = (trackId: MusicType): AmbientAudio => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    const masterGain = audioContext.createGain();
    masterGain.connect(audioContext.destination);
    
    let isAudioPlaying = false;
    const sources: AudioNode[] = [];

    // White noise generator for base ambient sound
    const createWhiteNoise = (gain: number = 0.1) => {
      const bufferSize = audioContext.sampleRate * 2;
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      
      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(gain, audioContext.currentTime);
      
      noiseSource.connect(noiseGain);
      noiseGain.connect(masterGain);
      
      sources.push(noiseSource);
      return noiseSource;
    };

    // Low frequency oscillator for depth
    const createLowFreqOsc = (frequency: number, gain: number = 0.05) => {
      const osc = audioContext.createOscillator();
      const oscGain = audioContext.createGain();
      
      osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
      osc.type = 'sine';
      oscGain.gain.setValueAtTime(gain, audioContext.currentTime);
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      
      sources.push(osc);
      return osc;
    };

    // Configure based on track type with multiple layers
    const configureSoundscape = () => {
      switch (trackId) {
        case 'forest':
          // White noise filtered for wind
          const windNoise = createWhiteNoise(0.08);
          
          // Low frequency for depth
          createLowFreqOsc(40, 0.03);
          createLowFreqOsc(80, 0.02);
          
          // Mid frequencies for rustling
          createLowFreqOsc(200, 0.01);
          createLowFreqOsc(150, 0.015);
          break;
          
        case 'rain':
          // High frequency white noise for rain
          createWhiteNoise(0.15);
          
          // Low rumble for thunder
          createLowFreqOsc(30, 0.02);
          createLowFreqOsc(60, 0.015);
          break;
          
        case 'fireplace':
          // Crackling noise
          createWhiteNoise(0.06);
          
          // Low frequency for fire rumble
          createLowFreqOsc(45, 0.04);
          createLowFreqOsc(90, 0.03);
          createLowFreqOsc(120, 0.02);
          break;
          
        case 'lofi':
          // Soft vinyl crackle
          createWhiteNoise(0.03);
          
          // Warm bass tones
          createLowFreqOsc(65, 0.04);
          createLowFreqOsc(130, 0.03);
          createLowFreqOsc(195, 0.02);
          break;
          
        case 'cozy-cafe':
          // Soft ambient noise
          createWhiteNoise(0.05);
          
          // Gentle hum
          createLowFreqOsc(100, 0.025);
          createLowFreqOsc(200, 0.02);
          createLowFreqOsc(300, 0.015);
          break;
          
        default:
          createWhiteNoise(0.05);
          createLowFreqOsc(100, 0.02);
      }
    };

    configureSoundscape();

    const ambientAudio: AmbientAudio = {
      play: async () => {
        if (!isAudioPlaying) {
          // Resume audio context if suspended
          if (audioContext.state === 'suspended') {
            await audioContext.resume();
          }
          
          sources.forEach(source => {
            if ('start' in source) {
              (source as AudioScheduledSourceNode).start();
            }
          });
          isAudioPlaying = true;
        }
      },
      
      pause: () => {
        if (isAudioPlaying) {
          sources.forEach(source => {
            try {
              if ('stop' in source) {
                (source as AudioScheduledSourceNode).stop();
              }
            } catch (e) {
              // Source may already be stopped
            }
          });
          isAudioPlaying = false;
        }
      },
      
      get volume() {
        return masterGain.gain.value;
      },
      
      setVolume: (newVolume: number) => {
        masterGain.gain.setValueAtTime(newVolume, audioContext.currentTime);
      }
    };

    return ambientAudio;
  };

  const getCurrentTrackInfo = () => {
    return audioTracks.find(track => track.id === currentTrack) || audioTracks[0];
  };

  const stopMusic = async (): Promise<void> => {
    return new Promise((resolve) => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
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
      audio.setVolume(newVolume);
      
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
      audioRef.current.setVolume(newVolume);
    }
  };

  const playSuccessSound = () => {
    if (!hasUserInteracted) return;
    
    try {
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
