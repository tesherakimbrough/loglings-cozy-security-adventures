
import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { MusicType } from '../types/musicTypes';
import { audioTracks } from '../config/audioTracks';

export const useRealAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<MusicType | null>(null);
  const currentHowlRef = useRef<Howl | null>(null);

  const getCurrentTrackInfo = (trackId: MusicType) => {
    const foundTrack = audioTracks.find(track => track.id === trackId);
    return foundTrack || audioTracks.find(track => track.id === 'silence') || audioTracks[0];
  };

  const stopMusic = useCallback(async (): Promise<void> => {
    return new Promise((resolve) => {
      if (currentHowlRef.current) {
        currentHowlRef.current.fade(currentHowlRef.current.volume(), 0, 500);
        setTimeout(() => {
          currentHowlRef.current?.stop();
          currentHowlRef.current?.unload();
          currentHowlRef.current = null;
          resolve();
        }, 500);
      } else {
        resolve();
      }
      
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentTrack(null);
      setError(null);
    });
  }, []);

  const playTrack = useCallback(async (trackId: MusicType, volume: number = 0.3): Promise<void> => {
    console.log('Playing audio track:', trackId, 'volume:', volume);
    setError(null);
    
    if (trackId === 'silence') {
      await stopMusic();
      setCurrentTrack('silence');
      setIsPlaying(true);
      return;
    }

    if (trackId === 'external') {
      await stopMusic();
      setCurrentTrack('external');
      setIsPlaying(true);
      return;
    }

    // Handle new music types that might not have audio files yet
    if (trackId === 'lofi-beats' || trackId === 'forest-ambience') {
      console.log('New music type detected, falling back to silence mode:', trackId);
      await stopMusic();
      setCurrentTrack('silence');
      setIsPlaying(true);
      return;
    }

    setIsLoading(true);
    setHasUserInteracted(true);
    
    try {
      await stopMusic();

      const trackInfo = getCurrentTrackInfo(trackId);
      
      if (!trackInfo.audioUrl) {
        console.log('No audio file specified, playing silence mode');
        setCurrentTrack('silence');
        setIsPlaying(true);
        setIsLoading(false);
        return;
      }

      const howl = new Howl({
        src: [trackInfo.audioUrl],
        loop: true,
        volume: 0,
        html5: true,
        onload: () => {
          console.log('Audio loaded successfully:', trackId);
          howl.fade(0, volume, 1000);
          setIsLoading(false);
          setIsPlaying(true);
          setCurrentTrack(trackId);
        },
        onloaderror: (id, error) => {
          console.log('Audio file not found, falling back to silence mode:', error);
          setCurrentTrack('silence');
          setIsPlaying(true);
          setIsLoading(false);
          setError(null); // Don't show error for missing files
        },
        onplayerror: (id, error) => {
          console.log('Audio playback failed, falling back to silence mode:', error);
          setCurrentTrack('silence');
          setIsPlaying(true);
          setIsLoading(false);
          setError(null); // Don't show error for playback issues
        }
      });
      
      currentHowlRef.current = howl;
      howl.play();
      
    } catch (error) {
      console.log('Audio system not available, using silence mode:', error);
      setCurrentTrack('silence');
      setIsPlaying(true);
      setIsLoading(false);
      setError(null); // Graceful fallback instead of error
    }
  }, [stopMusic, getCurrentTrackInfo]);

  const updateVolume = useCallback((newVolume: number) => {
    if (currentHowlRef.current && isPlaying && currentTrack !== 'silence' && currentTrack !== 'external') {
      currentHowlRef.current.volume(newVolume);
    }
  }, [isPlaying, currentTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (currentHowlRef.current) {
        currentHowlRef.current.stop();
        currentHowlRef.current.unload();
      }
    };
  }, []);

  return {
    audioTracks,
    isPlaying,
    isLoading,
    hasUserInteracted,
    error,
    currentTrack,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume
  };
};
