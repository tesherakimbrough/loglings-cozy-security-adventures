
import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { MusicType } from '../types/musicTypes';
import { audioTracks } from '../config/audioTracks';
import { useUserProfile } from './useUserProfile';

interface AudioSystemState {
  isPlaying: boolean;
  isLoading: boolean;
  currentTrack: MusicType | null;
  volume: number;
  error: string | null;
}

export const useAudioSystem = () => {
  const { profile } = useUserProfile();
  const [state, setState] = useState<AudioSystemState>({
    isPlaying: false,
    isLoading: false,
    currentTrack: null,
    volume: 0.3,
    error: null
  });
  
  const currentHowlRef = useRef<Howl | null>(null);

  const getCurrentTrackInfo = useCallback((trackId: MusicType) => {
    return audioTracks.find(track => track.id === trackId) || audioTracks[0];
  }, []);

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
      
      setState(prev => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        currentTrack: null,
        error: null
      }));
    });
  }, []);

  const playTrack = useCallback(async (trackId: MusicType, volume: number = 0.3): Promise<void> => {
    console.log('🎵 Playing audio track:', trackId, 'volume:', volume);
    
    setState(prev => ({ ...prev, error: null }));
    
    if (trackId === 'silence') {
      await stopMusic();
      setState(prev => ({ ...prev, currentTrack: 'silence', isPlaying: true }));
      console.log('🔇 Silence mode activated');
      return;
    }

    if (trackId === 'external') {
      await stopMusic();
      setState(prev => ({ ...prev, currentTrack: 'external', isPlaying: true }));
      console.log('🎧 External music mode activated');
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await stopMusic();
      const trackInfo = getCurrentTrackInfo(trackId);
      
      if (!trackInfo.audioUrl) {
        console.log('🔇 No audio file specified, using silence mode');
        setState(prev => ({ ...prev, currentTrack: 'silence', isPlaying: true, isLoading: false }));
        return;
      }

      console.log('🎵 Loading audio file:', trackInfo.audioUrl);
      
      const howl = new Howl({
        src: [trackInfo.audioUrl],
        loop: true,
        volume: 0,
        html5: true,
        onload: () => {
          console.log('✅ Audio loaded successfully:', trackId);
          howl.fade(0, volume, 1000);
          setState(prev => ({
            ...prev,
            isLoading: false,
            isPlaying: true,
            currentTrack: trackId,
            volume
          }));
        },
        onloaderror: (id, error) => {
          console.log('⚠️ Audio file not found, falling back to silence mode:', error);
          setState(prev => ({
            ...prev,
            currentTrack: 'silence',
            isPlaying: true,
            isLoading: false,
            error: null
          }));
        },
        onplayerror: (id, error) => {
          console.log('⚠️ Audio playback failed, falling back to silence mode:', error);
          setState(prev => ({
            ...prev,
            currentTrack: 'silence',
            isPlaying: true,
            isLoading: false,
            error: null
          }));
        }
      });
      
      currentHowlRef.current = howl;
      howl.play();
      
    } catch (error) {
      console.log('⚠️ Audio system not available, using silence mode:', error);
      setState(prev => ({
        ...prev,
        currentTrack: 'silence',
        isPlaying: true,
        isLoading: false,
        error: null
      }));
    }
  }, [stopMusic, getCurrentTrackInfo]);

  const updateVolume = useCallback((newVolume: number) => {
    setState(prev => ({ ...prev, volume: newVolume }));
    if (currentHowlRef.current && state.isPlaying && state.currentTrack !== 'silence' && state.currentTrack !== 'external') {
      currentHowlRef.current.volume(newVolume);
      console.log('🔊 Volume updated to:', Math.round(newVolume * 100) + '%');
    }
  }, [state.isPlaying, state.currentTrack]);

  const playSuccessSound = useCallback(() => {
    if (profile.preferences.audioEnabled && profile.preferences.soundEffectsEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(profile.preferences.soundEffectsVolume * 0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
        console.log('✅ Success sound played');
      } catch (error) {
        console.log('⚠️ Success sound not available:', error);
      }
    }
  }, [profile.preferences.audioEnabled, profile.preferences.soundEffectsEnabled, profile.preferences.soundEffectsVolume]);

  const playErrorSound = useCallback(() => {
    if (profile.preferences.audioEnabled && profile.preferences.soundEffectsEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(profile.preferences.soundEffectsVolume * 0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        console.log('❌ Error sound played');
      } catch (error) {
        console.log('⚠️ Error sound not available:', error);
      }
    }
  }, [profile.preferences.audioEnabled, profile.preferences.soundEffectsEnabled, profile.preferences.soundEffectsVolume]);

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
    ...state,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume,
    playSuccessSound,
    playErrorSound
  };
};
