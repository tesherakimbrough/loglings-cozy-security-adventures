
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
  const audioRef = useRef<Howl | null>(null);

  const getCurrentTrackInfo = (trackId: MusicType) => {
    return audioTracks.find(track => track.id === trackId) || audioTracks[0];
  };

  const stopMusic = useCallback(async (): Promise<void> => {
    return new Promise((resolve) => {
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current.unload();
        audioRef.current = null;
      }
      
      setIsPlaying(false);
      setIsLoading(false);
      setCurrentTrack(null);
      setError(null);
      resolve();
    });
  }, []);

  // Generate a simple tone as a working audio fallback
  const generateTone = useCallback((frequency: number = 200, duration: number = 1000, volume: number = 0.1) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      
      // Fade out to avoid clicking
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration / 1000);
      
      return true;
    } catch (error) {
      console.warn('Could not generate tone:', error);
      return false;
    }
  }, []);

  const playTrack = useCallback(async (trackId: MusicType, volume: number = 0.3): Promise<void> => {
    console.log('Attempting to play audio track:', trackId, 'volume:', volume);
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
      const instructions = `
To use your own music:

1. **Apple Music**: Open Apple Music app/website and play your playlist
2. **Spotify**: Open Spotify app/website and play your playlist  
3. **YouTube Music**: Open YouTube Music and play your playlist
4. **Other Music Apps**: Start playing music in any app

Then return to this app. The ambient sounds will pause while you use external music.

External Playlist Suggestions:
• Lofi Hip Hop Radio: https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM
• Rain Sounds: https://www.youtube.com/watch?v=mPZkdNFkNps
• Forest Sounds: https://www.youtube.com/watch?v=btGQAE2_p5g
• Coffee Shop: https://www.youtube.com/watch?v=DeumyOzKqgI
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

      // For now, since we're having issues with external audio files,
      // let's use a simple tone generator as a working demonstration
      console.log('Using tone generator for demonstration');
      
      // Generate different tones for different tracks
      const toneMap: Record<string, number> = {
        'forest': 220,
        'rain': 180,
        'cozy-cafe': 250,
        'fireplace': 150,
        'lofi': 200
      };
      
      const frequency = toneMap[trackId] || 200;
      const success = generateTone(frequency, 2000, volume * 0.1);
      
      if (success) {
        setIsLoading(false);
        setIsPlaying(true);
        setCurrentTrack(trackId);
        setError('Demo mode: Using generated tones. Real ambient audio coming soon!');
        
        // Stop after 2 seconds for demo
        setTimeout(() => {
          setIsPlaying(false);
          setCurrentTrack(null);
        }, 2000);
      } else {
        throw new Error('Audio generation failed');
      }
      
    } catch (error) {
      console.warn('Audio playback failed:', error);
      setError('Audio playback not available. Please check your browser settings or try external music mode.');
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [stopMusic, generateTone]);

  const updateVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume(newVolume);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.stop();
          audioRef.current.unload();
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
        audioRef.current = null;
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
