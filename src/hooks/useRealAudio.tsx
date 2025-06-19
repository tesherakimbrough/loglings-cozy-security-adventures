
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

  const playTrack = useCallback(async (trackId: MusicType, volume: number = 0.3): Promise<void> => {
    console.log('Playing real audio track:', trackId, 'volume:', volume);
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
      if (!trackInfo || !trackInfo.audioUrl) {
        throw new Error('Track not found or no audio URL');
      }

      console.log('Loading real audio from:', trackInfo.audioUrl);
      
      const sound = new Howl({
        src: [trackInfo.audioUrl],
        loop: true,
        volume: volume,
        html5: true, // Use HTML5 audio for better compatibility
        onload: () => {
          console.log('Real audio loaded successfully');
          setIsLoading(false);
          setIsPlaying(true);
          setCurrentTrack(trackId);
        },
        onplay: () => {
          setIsPlaying(true);
          setIsLoading(false);
        },
        onpause: () => {
          setIsPlaying(false);
        },
        onstop: () => {
          setIsPlaying(false);
        },
        onloaderror: (id, error) => {
          console.warn('Audio load error:', error);
          setError('Failed to load audio. Using fallback mode.');
          setIsLoading(false);
          setIsPlaying(false);
          
          // Fallback to a simple tone if real audio fails
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.start();
          
          setTimeout(() => oscillator.stop(), 100);
        },
        onplayerror: (id, error) => {
          console.warn('Audio play error:', error);
          setError('Failed to play audio. Try clicking play again.');
          setIsLoading(false);
          setIsPlaying(false);
        }
      });

      audioRef.current = sound;
      sound.play();
      
    } catch (error) {
      console.warn('Real audio playback failed:', error);
      setError('Failed to play audio. Check your internet connection.');
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [stopMusic]);

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
