
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
    return audioTracks.find(track => track.id === trackId) || audioTracks[0];
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

    setIsLoading(true);
    setHasUserInteracted(true);
    
    try {
      await stopMusic();

      const trackInfo = getCurrentTrackInfo(trackId);
      
      if (!trackInfo.audioUrl) {
        throw new Error('No audio file specified for this track');
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
          console.error('Audio loading failed:', error);
          setError(`Audio file not found: ${trackInfo.name}`);
          setIsLoading(false);
          setIsPlaying(false);
        },
        onplayerror: (id, error) => {
          console.error('Audio playback failed:', error);
          setError(`Playback failed: ${trackInfo.name}`);
          setIsLoading(false);
          setIsPlaying(false);
        }
      });
      
      currentHowlRef.current = howl;
      howl.play();
      
    } catch (error) {
      console.warn('Audio playback failed:', error);
      setError('Audio file not found. Please check if audio files are properly uploaded.');
      setIsLoading(false);
      setIsPlaying(false);
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
