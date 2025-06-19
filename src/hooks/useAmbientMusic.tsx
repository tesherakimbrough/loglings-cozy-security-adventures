
import { useState, useEffect, useRef } from 'react';

export type MusicType = 'forest' | 'lofi' | 'cozy-cafe' | 'rain' | 'fireplace' | 'silence' | 'external';

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
    audioUrl: 'https://www.soundjay.com/misc/sounds/forest_ambience.mp3'
  },
  {
    id: 'lofi',
    name: 'Lofi Study Beats',
    emoji: '🎵',
    description: 'Chill hip-hop beats perfect for concentration',
    audioUrl: 'https://www.chosic.com/wp-content/uploads/2021/05/lofi_study_112bpm.mp3'
  },
  {
    id: 'cozy-cafe',
    name: 'Cozy Coffee Shop',
    emoji: '☕',
    description: 'Warm café atmosphere with gentle chatter',
    audioUrl: 'https://www.soundjay.com/misc/sounds/coffee_shop_ambience.mp3'
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    emoji: '🌧️',
    description: 'Soft rainfall sounds for deep focus',
    audioUrl: 'https://www.soundjay.com/misc/sounds/rain_gentle.mp3'
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    emoji: '🔥',
    description: 'Warm, cozy fire sounds for comfort',
    audioUrl: 'https://www.soundjay.com/misc/sounds/fireplace_crackling.mp3'
  },
  {
    id: 'silence',
    name: 'Peaceful Silence',
    emoji: '🔇',
    description: 'No background music for pure focus',
    audioUrl: ''
  },
  {
    id: 'external',
    name: 'Your Music',
    emoji: '🎧',
    description: 'Use Apple Music, Spotify, or your own playlist',
    audioUrl: ''
  }
];

// Generate white noise buffer
const createWhiteNoise = (audioContext: AudioContext, duration: number = 10) => {
  const bufferSize = audioContext.sampleRate * duration;
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const output = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  
  return buffer;
};

// Generate pink noise (more natural sounding)
const createPinkNoise = (audioContext: AudioContext, duration: number = 10) => {
  const bufferSize = audioContext.sampleRate * duration;
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const output = buffer.getChannelData(0);
  
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    output[i] *= 0.11;
    b6 = white * 0.115926;
  }
  
  return buffer;
};

// Fallback audio generation for realistic ambient sounds
const generateFallbackAudio = (trackId: MusicType, audioContext: AudioContext) => {
  const masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  masterGain.gain.setValueAtTime(0.3, audioContext.currentTime);

  const sources: AudioScheduledSourceNode[] = [];
  let noiseSource: AudioBufferSourceNode | null = null;

  let cleanup = () => {
    sources.forEach(source => {
      try { 
        source.stop(); 
        source.disconnect();
      } catch (e) { /* already stopped */ }
    });
    if (noiseSource) {
      try {
        noiseSource.stop();
        noiseSource.disconnect();
      } catch (e) { /* already stopped */ }
    }
  };

  // Create realistic soundscapes based on track type
  switch (trackId) {
    case 'forest':
      // Create wind-like sound using filtered white noise
      const windNoise = createWhiteNoise(audioContext);
      noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = windNoise;
      noiseSource.loop = true;
      
      const windFilter = audioContext.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.setValueAtTime(400, audioContext.currentTime);
      windFilter.Q.setValueAtTime(0.5, audioContext.currentTime);
      
      const windGain = audioContext.createGain();
      windGain.gain.setValueAtTime(0.15, audioContext.currentTime);
      
      noiseSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterGain);
      
      sources.push(noiseSource);
      break;

    case 'rain':
      // Rain sound using high-frequency filtered white noise
      const rainNoise = createWhiteNoise(audioContext);
      noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = rainNoise;
      noiseSource.loop = true;
      
      const rainFilter = audioContext.createBiquadFilter();
      rainFilter.type = 'highpass';
      rainFilter.frequency.setValueAtTime(1000, audioContext.currentTime);
      rainFilter.Q.setValueAtTime(0.3, audioContext.currentTime);
      
      const rainGain = audioContext.createGain();
      rainGain.gain.setValueAtTime(0.2, audioContext.currentTime);
      
      // Add modulation for rain effect
      const rainLfo = audioContext.createOscillator();
      const rainLfoGain = audioContext.createGain();
      rainLfo.frequency.setValueAtTime(0.5, audioContext.currentTime);
      rainLfoGain.gain.setValueAtTime(0.05, audioContext.currentTime);
      
      rainLfo.connect(rainLfoGain);
      rainLfoGain.connect(rainGain.gain);
      
      noiseSource.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(masterGain);
      
      sources.push(noiseSource, rainLfo);
      break;

    case 'fireplace':
      // Crackling fire using pink noise with low-pass filtering
      const fireNoise = createPinkNoise(audioContext);
      noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = fireNoise;
      noiseSource.loop = true;
      
      const fireFilter = audioContext.createBiquadFilter();
      fireFilter.type = 'lowpass';
      fireFilter.frequency.setValueAtTime(800, audioContext.currentTime);
      fireFilter.Q.setValueAtTime(2, audioContext.currentTime);
      
      const fireGain = audioContext.createGain();
      fireGain.gain.setValueAtTime(0.25, audioContext.currentTime);
      
      noiseSource.connect(fireFilter);
      fireFilter.connect(fireGain);
      fireGain.connect(masterGain);
      
      sources.push(noiseSource);
      break;

    case 'lofi':
      // Simple bass drum pattern
      const createDrum = (time: number) => {
        const drumOsc = audioContext.createOscillator();
        const drumGain = audioContext.createGain();
        
        drumOsc.frequency.setValueAtTime(60, audioContext.currentTime + time);
        drumOsc.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + time + 0.1);
        
        drumGain.gain.setValueAtTime(0, audioContext.currentTime + time);
        drumGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + time + 0.01);
        drumGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.3);
        
        drumOsc.connect(drumGain);
        drumGain.connect(masterGain);
        
        drumOsc.start(audioContext.currentTime + time);
        drumOsc.stop(audioContext.currentTime + time + 0.3);
      };
      
      // Create a simple beat pattern
      const beatInterval = setInterval(() => {
        createDrum(0);
        createDrum(0.5);
      }, 1000);
      
      // Clean up interval
      const originalCleanup = cleanup;
      cleanup = () => {
        clearInterval(beatInterval);
        originalCleanup();
      };
      break;

    case 'cozy-cafe':
      // Coffee shop ambience using filtered pink noise
      const cafeNoise = createPinkNoise(audioContext);
      noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = cafeNoise;
      noiseSource.loop = true;
      
      const cafeFilter = audioContext.createBiquadFilter();
      cafeFilter.type = 'bandpass';
      cafeFilter.frequency.setValueAtTime(600, audioContext.currentTime);
      cafeFilter.Q.setValueAtTime(1, audioContext.currentTime);
      
      const cafeGain = audioContext.createGain();
      cafeGain.gain.setValueAtTime(0.1, audioContext.currentTime);
      
      noiseSource.connect(cafeFilter);
      cafeFilter.connect(cafeGain);
      cafeGain.connect(masterGain);
      
      sources.push(noiseSource);
      break;
  }

  return {
    start: () => {
      sources.forEach(source => {
        try {
          source.start();
        } catch (e) {
          console.warn('Source already started:', e);
        }
      });
    },
    stop: cleanup,
    setVolume: (volume: number) => {
      masterGain.gain.setValueAtTime(volume, audioContext.currentTime);
    }
  };
};

export const useAmbientMusic = () => {
  const [currentTrack, setCurrentTrack] = useState<MusicType>('forest');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [useExternalMusic, setUseExternalMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fallbackAudioRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getCurrentTrackInfo = () => {
    return audioTracks.find(track => track.id === currentTrack) || audioTracks[0];
  };

  const stopMusic = async (): Promise<void> => {
    return new Promise((resolve) => {
      // Stop HTML audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      
      // Stop fallback audio
      if (fallbackAudioRef.current) {
        fallbackAudioRef.current.stop();
        fallbackAudioRef.current = null;
      }
      
      setIsPlaying(false);
      setIsLoading(false);
      resolve();
    });
  };

  const openExternalMusicInstructions = () => {
    const instructions = `
To use your own music:

1. **Apple Music**: 
   - Open Apple Music app or website
   - Play your preferred playlist or album
   - Return to this app and select "Your Music"

2. **Spotify**: 
   - Open Spotify app or website
   - Play your preferred playlist or album
   - Return to this app and select "Your Music"

3. **Other Music Apps**: 
   - Start playing music in any app
   - Return to this app and select "Your Music"

The ambient sounds will pause while you use external music.
    `;
    
    alert(instructions);
  };

  const playTrack = async (trackId: MusicType, newVolume: number = volume): Promise<void> => {
    console.log('Playing track:', trackId, 'volume:', newVolume);
    
    if (trackId === 'silence') {
      await stopMusic();
      setCurrentTrack(trackId);
      return;
    }

    if (trackId === 'external') {
      await stopMusic();
      setCurrentTrack(trackId);
      setUseExternalMusic(true);
      openExternalMusicInstructions();
      return;
    }

    setIsLoading(true);
    setUseExternalMusic(false);
    
    try {
      await stopMusic();
      setHasUserInteracted(true);

      const trackInfo = audioTracks.find(track => track.id === trackId);
      if (!trackInfo || !trackInfo.audioUrl) {
        throw new Error('No audio URL available');
      }

      // Try to use real audio first
      try {
        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.loop = true;
        audio.volume = newVolume;
        
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => reject(new Error('Audio load timeout')), 10000);
          
          audio.onloadeddata = () => {
            clearTimeout(timeout);
            resolve(audio);
          };
          
          audio.onerror = () => {
            clearTimeout(timeout);
            reject(new Error('Audio load failed'));
          };
          
          audio.src = trackInfo.audioUrl;
          audio.load();
        });

        audioRef.current = audio;
        await audio.play();
        
      } catch (audioError) {
        console.warn('Real audio failed, using fallback:', audioError);
        
        // Use fallback generated audio
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        const fallbackAudio = generateFallbackAudio(trackId, audioContextRef.current);
        fallbackAudio.setVolume(newVolume);
        fallbackAudio.start();
        fallbackAudioRef.current = fallbackAudio;
      }
      
      setIsLoading(false);
      setCurrentTrack(trackId);
      setIsPlaying(true);
      setVolume(newVolume);
      
    } catch (error) {
      console.warn('Audio playback failed completely:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (currentTrack !== 'silence' && currentTrack !== 'external') {
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
      if (fallbackAudioRef.current) {
        fallbackAudioRef.current.setVolume(newVolume);
      }
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
      if (fallbackAudioRef.current) {
        try {
          fallbackAudioRef.current.stop();
        } catch (error) {
          console.warn('Fallback cleanup error:', error);
        }
        fallbackAudioRef.current = null;
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
    useExternalMusic,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume,
    playSuccessSound,
    openExternalMusicInstructions
  };
};
