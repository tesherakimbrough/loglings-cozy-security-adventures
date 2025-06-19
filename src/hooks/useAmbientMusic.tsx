import { useState, useEffect, useRef } from 'react';
import { MusicType } from '../types/musicTypes';
import { audioTracks } from '../config/audioTracks';
import { generateFallbackAudio } from '../utils/fallbackAudio';
import { playSuccessSound } from '../utils/successSound';

export type { MusicType } from '../types/musicTypes';

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

  const handlePlaySuccessSound = () => {
    playSuccessSound(hasUserInteracted);
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
    playSuccessSound: handlePlaySuccessSound,
    openExternalMusicInstructions
  };
};
