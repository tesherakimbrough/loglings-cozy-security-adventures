
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';
import { useAmbientMusic } from '../hooks/useAmbientMusic';
import { useEnhancedProgress } from '../hooks/useEnhancedProgress';
import MusicSelector from './MusicSelector';

const MusicControlBar = () => {
  const { progress } = useEnhancedProgress();
  const {
    currentTrack,
    isPlaying,
    isLoading,
    getCurrentTrackInfo,
    playTrack,
    stopMusic
  } = useAmbientMusic();

  // Auto-start user's preferred music when component mounts
  useEffect(() => {
    if (progress.preferences.audioEnabled && progress.preferences.musicType !== 'silence') {
      playTrack(progress.preferences.musicType, progress.preferences.musicVolume);
    }
  }, [progress.preferences.audioEnabled, progress.preferences.musicType]);

  const togglePlayPause = () => {
    if (isPlaying) {
      stopMusic();
    } else if (progress.preferences.musicType !== 'silence') {
      playTrack(progress.preferences.musicType, progress.preferences.musicVolume);
    }
  };

  if (!progress.preferences.audioEnabled) {
    return null;
  }

  const currentTrackInfo = getCurrentTrackInfo();

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40">
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-3 cozy-card cozy-glow shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayPause}
              disabled={isLoading || currentTrack === 'silence'}
              className="cozy-card"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-lg">{currentTrackInfo.emoji}</span>
              <div className="hidden sm:block">
                <div className="text-sm font-medium">{currentTrackInfo.name}</div>
                {isPlaying && (
                  <div className="text-xs text-muted-foreground">Now playing</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <div className="text-xs text-muted-foreground">
              {Math.round(progress.preferences.musicVolume * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicControlBar;
