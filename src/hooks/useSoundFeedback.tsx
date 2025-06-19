
import { useRef, useCallback } from 'react';
import { Howl } from 'howler';
import { useUserProfile } from './useUserProfile';

export const useSoundFeedback = () => {
  const { profile } = useUserProfile();
  const correctSoundRef = useRef<Howl | null>(null);
  const incorrectSoundRef = useRef<Howl | null>(null);

  // Initialize sounds
  const initSounds = useCallback(() => {
    if (!correctSoundRef.current) {
      correctSoundRef.current = new Howl({
        src: ['/sounds/correct-chime.mp3', '/sounds/correct-chime.wav'],
        volume: profile.preferences.audioEnabled ? 0.4 : 0,
        preload: true,
        html5: true,
        onloaderror: () => {
          console.log('Could not load correct sound - using fallback');
        }
      });
    }

    if (!incorrectSoundRef.current) {
      incorrectSoundRef.current = new Howl({
        src: ['/sounds/gentle-oops.mp3', '/sounds/gentle-oops.wav'],
        volume: profile.preferences.audioEnabled ? 0.3 : 0,
        preload: true,
        html5: true,
        onloaderror: () => {
          console.log('Could not load incorrect sound - using fallback');
        }
      });
    }
  }, [profile.preferences.audioEnabled]);

  const playCorrectSound = useCallback(() => {
    if (profile.preferences.audioEnabled) {
      initSounds();
      try {
        correctSoundRef.current?.play();
      } catch (error) {
        console.log('Could not play correct sound:', error);
      }
    }
  }, [profile.preferences.audioEnabled, initSounds]);

  const playIncorrectSound = useCallback(() => {
    if (profile.preferences.audioEnabled) {
      initSounds();
      try {
        incorrectSoundRef.current?.play();
      } catch (error) {
        console.log('Could not play incorrect sound:', error);
      }
    }
  }, [profile.preferences.audioEnabled, initSounds]);

  // Update volume when preferences change
  const updateVolume = useCallback(() => {
    const volume = profile.preferences.audioEnabled ? 0.4 : 0;
    correctSoundRef.current?.volume(volume);
    incorrectSoundRef.current?.volume(profile.preferences.audioEnabled ? 0.3 : 0);
  }, [profile.preferences.audioEnabled]);

  // Cleanup
  const cleanup = useCallback(() => {
    correctSoundRef.current?.unload();
    incorrectSoundRef.current?.unload();
    correctSoundRef.current = null;
    incorrectSoundRef.current = null;
  }, []);

  return {
    playCorrectSound,
    playIncorrectSound,
    updateVolume,
    cleanup
  };
};
