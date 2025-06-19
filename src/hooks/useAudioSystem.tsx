
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
  const successSoundRef = useRef<Howl | null>(null);
  const errorSoundRef = useRef<Howl | null>(null);

  // Initialize UI feedback sounds
  useEffect(() => {
    if (profile.preferences.audioEnabled) {
      // Simple success sound using Web Audio API as fallback
      const createSimpleSound = (frequency: number, type: OscillatorType = 'sine') => {
        return () => {
          try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
          } catch (error) {
            console.log('Web Audio not available:', error);
          }
        };
      };

      // Create simple success and error sounds
      const playSuccessSound = createSimpleSound(523.25); // C5
      const playErrorSound = createSimpleSound(220, 'square'); // A3

      return () => {
        successSoundRef.current = null;
        errorSoundRef.current = null;
      };
    }
  }, [profile.preferences.audioEnabled]);

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
    console.log('Playing audio track:', trackId, 'volume:', volume);
    
    setState(prev => ({ ...prev, error: null }));
    
    if (trackId === 'silence') {
      await stopMusic();
      setState(prev => ({ ...prev, currentTrack: 'silence', isPlaying: true }));
      return;
    }

    if (trackId === 'external') {
      await stopMusic();
      setState(prev => ({ ...prev, currentTrack: 'external', isPlaying: true }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await stopMusic();
      const trackInfo = getCurrentTrackInfo(trackId);
      
      // For now, simulate ambient forest sounds with a simple tone
      // This will be replaced with actual audio files
      if (trackId === 'forest') {
        // Create a simple forest-like ambient sound
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const brownNoise = audioContext.createScriptProcessor(4096, 1, 1);
          const gainNode = audioContext.createGain();
          
          brownNoise.onaudioprocess = (e) => {
            const output = e.outputBuffer.getChannelData(0);
            let lastOut = 0;
            for (let i = 0; i < output.length; i++) {
              const white = Math.random() * 2 - 1;
              output[i] = (lastOut + (0.02 * white)) / 1.02;
              lastOut = output[i];
              output[i] *= 3.5; // Scale
            }
          };
          
          brownNoise.connect(gainNode);
          gainNode.connect(audioContext.destination);
          gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);
          
          setState(prev => ({
            ...prev,
            isLoading: false,
            isPlaying: true,
            currentTrack: trackId,
            volume
          }));
          
          console.log('Ambient forest sound started (simulated)');
          return;
        } catch (error) {
          console.log('Web Audio not available, using silence mode');
        }
      }
      
      // Fallback to silence mode for all other tracks
      setState(prev => ({
        ...prev,
        currentTrack: 'silence',
        isPlaying: true,
        isLoading: false
      }));
      
    } catch (error) {
      console.log('Audio system not available, using silence mode:', error);
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
    }
  }, [state.isPlaying, state.currentTrack]);

  const playSuccessSound = useCallback(() => {
    if (profile.preferences.audioEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Play a pleasant C major chord
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
      } catch (error) {
        console.log('Success sound not available:', error);
      }
    }
  }, [profile.preferences.audioEnabled]);

  const playErrorSound = useCallback(() => {
    if (profile.preferences.audioEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      } catch (error) {
        console.log('Error sound not available:', error);
      }
    }
  }, [profile.preferences.audioEnabled]);

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
