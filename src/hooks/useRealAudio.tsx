
import { useState, useCallback } from 'react';
import { MusicType } from '../types/musicTypes';
import { audioTracks } from '../config/audioTracks';
import { useWebAudioGenerator } from './useWebAudioGenerator';

export const useRealAudio = () => {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    isPlaying,
    currentTrack,
    playTrack: playWebAudioTrack,
    stopMusic: stopWebAudio,
    updateVolume: updateWebAudioVolume
  } = useWebAudioGenerator();

  const getCurrentTrackInfo = (trackId: MusicType) => {
    return audioTracks.find(track => track.id === trackId) || audioTracks[0];
  };

  const stopMusic = useCallback(async (): Promise<void> => {
    return new Promise((resolve) => {
      stopWebAudio();
      setError(null);
      resolve();
    });
  }, [stopWebAudio]);

  const playTrack = useCallback(async (trackId: MusicType, volume: number = 0.3): Promise<void> => {
    console.log('Playing cozy ambient track:', trackId, 'volume:', volume);
    setError(null);
    setIsLoading(true);
    setHasUserInteracted(true);
    
    try {
      if (trackId === 'external') {
        await stopMusic();
        setIsLoading(false);
        const instructions = `
To use your own music:

1. **Apple Music**: Open Apple Music app/website and play your playlist
2. **Spotify**: Open Spotify app/website and play your playlist  
3. **YouTube Music**: Open YouTube Music and play your playlist
4. **Other Music Apps**: Start playing music in any app

Then return to this app. The ambient sounds will pause while you use external music.

Recommended Playlists:
• Lofi Hip Hop: Search "lofi hip hop" on any platform
• Nature Sounds: Search "rain sounds" or "forest ambience"
• Study Music: Search "ambient study music"
        `;
        alert(instructions);
        return;
      }

      await playWebAudioTrack(trackId, volume);
      setIsLoading(false);
      
    } catch (error) {
      console.warn('Audio playback failed:', error);
      setError('Audio not available. Please check browser permissions.');
      setIsLoading(false);
    }
  }, [playWebAudioTrack, stopMusic]);

  const updateVolume = useCallback((newVolume: number) => {
    updateWebAudioVolume(newVolume);
  }, [updateWebAudioVolume]);

  return {
    audioTracks,
    isPlaying,
    isLoading,
    hasUserInteracted,
    error,
    currentTrack: currentTrack as MusicType | null,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume
  };
};
