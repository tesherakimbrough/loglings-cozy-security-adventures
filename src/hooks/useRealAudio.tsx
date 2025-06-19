
import { useState, useEffect, useRef, useCallback } from 'react';
import { MusicType } from '../types/musicTypes';
import { audioTracks } from '../config/audioTracks';
import { useWebAudioGenerator } from './useWebAudioGenerator';

export const useRealAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<MusicType | null>(null);
  const currentAudioRef = useRef<any>(null);

  const {
    generateForestAmbience,
    generateRainSound,
    generateFireplaceSound,
    generateCafeAmbience,
    generateLofiBeats,
    stopAudio,
    stopAllAudio
  } = useWebAudioGenerator();

  const getCurrentTrackInfo = (trackId: MusicType) => {
    return audioTracks.find(track => track.id === trackId) || audioTracks[0];
  };

  const stopMusic = useCallback(async (): Promise<void> => {
    return new Promise((resolve) => {
      if (currentTrack) {
        stopAudio(currentTrack);
      }
      stopAllAudio();
      currentAudioRef.current = null;
      
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentTrack(null);
      setError(null);
      resolve();
    });
  }, [currentTrack, stopAudio, stopAllAudio]);

  const playTrack = useCallback(async (trackId: MusicType, volume: number = 0.3): Promise<void> => {
    console.log('Playing procedural audio track:', trackId, 'volume:', volume);
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

      let audioInstance;
      
      switch (trackId) {
        case 'forest':
          audioInstance = await generateForestAmbience();
          break;
        case 'rain':
          audioInstance = await generateRainSound();
          break;
        case 'fireplace':
          audioInstance = await generateFireplaceSound();
          break;
        case 'cozy-cafe':
          audioInstance = await generateCafeAmbience();
          break;
        case 'lofi':
          audioInstance = await generateLofiBeats();
          break;
        default:
          throw new Error('Unknown track type');
      }
      
      currentAudioRef.current = audioInstance;
      setIsLoading(false);
      setIsPlaying(true);
      setCurrentTrack(trackId);
      
    } catch (error) {
      console.warn('Audio playback failed:', error);
      setError('Audio generation failed. Please try again.');
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [stopMusic, generateForestAmbience, generateRainSound, generateFireplaceSound, generateCafeAmbience, generateLofiBeats]);

  const updateVolume = useCallback((newVolume: number) => {
    // Volume control will be handled by the individual generators
    console.log('Updating volume to:', newVolume);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, [stopAllAudio]);

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
