
import { useState, useEffect, useRef, useCallback } from 'react';
import { MusicType } from '../types/musicTypes';
import { audioTracks } from '../config/audioTracks';
import { generateFallbackAudio } from '../utils/fallbackAudio';

export type { MusicType } from '../types/musicTypes';

export const useAmbientMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fallbackAudioRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getCurrentTrackInfo = (trackId: MusicType) => {
    return audioTracks.find(track => track.id === trackId) || audioTracks[0];
  };

  const stopMusic = useCallback(async (): Promise<void> => {
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
      setUsingFallback(false);
      setError(null);
      resolve();
    });
  }, []);

  const createAudioContext = useCallback(async (): Promise<AudioContext | null> => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      return audioContextRef.current;
    } catch (error) {
      console.warn('Failed to create audio context:', error);
      setError('Audio not supported in this browser');
      return null;
    }
  }, []);

  const playTrack = useCallback(async (trackId: MusicType, volume: number = 0.3): Promise<void> => {
    console.log('Playing track:', trackId, 'volume:', volume);
    setError(null);
    
    if (trackId === 'silence') {
      await stopMusic();
      return;
    }

    if (trackId === 'external') {
      await stopMusic();
      const instructions = `
To use your own music:

1. **Apple Music**: Open Apple Music app/website and play your playlist
2. **Spotify**: Open Spotify app/website and play your playlist  
3. **Other Music Apps**: Start playing music in any app

Then return to this app. The ambient sounds will pause while you use external music.
      `;
      alert(instructions);
      return;
    }

    setIsLoading(true);
    setHasUserInteracted(true);
    
    try {
      await stopMusic();

      const trackInfo = audioTracks.find(track => track.id === trackId);
      if (!trackInfo) {
        throw new Error('Track not found');
      }

      // Always use fallback audio since external URLs are dummy
      console.log('Using enhanced fallback audio for:', trackId);
      
      const audioContext = await createAudioContext();
      if (!audioContext) {
        throw new Error('Audio context not available');
      }
      
      const fallbackAudio = generateFallbackAudio(trackId, audioContext);
      fallbackAudio.setVolume(volume);
      fallbackAudio.start();
      fallbackAudioRef.current = fallbackAudio;
      setUsingFallback(true);
      
      setIsLoading(false);
      setIsPlaying(true);
      
    } catch (error) {
      console.warn('Audio playback failed:', error);
      setError('Failed to play audio. Try clicking play again.');
      setIsLoading(false);
      setIsPlaying(false);
      setUsingFallback(false);
    }
  }, [stopMusic, createAudioContext]);

  const updateVolume = useCallback((newVolume: number) => {
    if (fallbackAudioRef.current) {
      fallbackAudioRef.current.setVolume(newVolume);
    }
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

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
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (error) {
          console.warn('Audio context cleanup error:', error);
        }
        audioContextRef.current = null;
      }
    };
  }, []);

  return {
    audioTracks,
    isPlaying,
    isLoading,
    hasUserInteracted,
    usingFallback,
    error,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume
  };
};
