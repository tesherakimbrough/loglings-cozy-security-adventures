
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

// Fallback audio generation for when external URLs fail
const generateFallbackAudio = (trackId: MusicType, audioContext: AudioContext) => {
  const masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);
  masterGain.gain.setValueAtTime(0.3, audioContext.currentTime);

  const sources: AudioScheduledSourceNode[] = [];

  // Create more realistic layered soundscapes
  const createLayeredOscillator = (frequencies: number[], type: OscillatorType = 'sine', baseGain: number = 0.1) => {
    frequencies.forEach((freq, index) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      osc.type = type;
      
      // Add some variation to make it more natural
      const variation = 1 + (Math.random() - 0.5) * 0.1;
      osc.frequency.setValueAtTime(freq * variation, audioContext.currentTime);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 2, audioContext.currentTime);
      
      gain.gain.setValueAtTime(baseGain / (index + 1), audioContext.currentTime);
      
      // Add subtle amplitude modulation for more natural sound
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();
      lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.2, audioContext.currentTime);
      lfo.type = 'sine';
      lfoGain.gain.setValueAtTime(0.02, audioContext.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      
      sources.push(osc, lfo);
    });
  };

  // Generate realistic soundscapes based on track type
  switch (trackId) {
    case 'forest':
      createLayeredOscillator([80, 120, 200, 300], 'triangle', 0.08);
      createLayeredOscillator([400, 800, 1200], 'sawtooth', 0.03);
      break;
    case 'rain':
      createLayeredOscillator([200, 400, 800, 1600], 'sawtooth', 0.15);
      createLayeredOscillator([60, 90], 'sine', 0.05);
      break;
    case 'fireplace':
      createLayeredOscillator([50, 100, 150], 'triangle', 0.1);
      createLayeredOscillator([300, 600], 'square', 0.05);
      break;
    case 'lofi':
      createLayeredOscillator([65, 130, 260], 'triangle', 0.12);
      createLayeredOscillator([520, 1040], 'sine', 0.06);
      break;
    case 'cozy-cafe':
      createLayeredOscillator([100, 200, 400], 'sine', 0.08);
      createLayeredOscillator([300, 600], 'triangle', 0.04);
      break;
  }

  return {
    start: () => sources.forEach(source => source.start()),
    stop: () => sources.forEach(source => {
      try { source.stop(); } catch (e) { /* already stopped */ }
    }),
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
