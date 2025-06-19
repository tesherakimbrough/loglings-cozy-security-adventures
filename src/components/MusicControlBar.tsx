
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2 } from 'lucide-react';
import { useRealAudio } from '../hooks/useRealAudio';
import { useEnhancedProgress } from '../hooks/useEnhancedProgress';

const MusicControlBar = () => {
  const { progress } = useEnhancedProgress();
  const {
    isPlaying,
    isLoading,
    hasUserInteracted,
    getCurrentTrackInfo,
    playTrack,
    stopMusic
  } = useRealAudio();

  const togglePlayPause = async () => {
    if (isPlaying) {
      await stopMusic();
    } else if (progress.preferences.musicType !== 'silence' && progress.preferences.musicType !== 'external') {
      await playTrack(progress.preferences.musicType, progress.preferences.musicVolume);
    }
  };

  // Don't show control bar for silence or external music
  if (!progress.preferences.audioEnabled || 
      progress.preferences.musicType === 'silence' || 
      progress.preferences.musicType === 'external') {
    return null;
  }

  const currentTrackInfo = getCurrentTrackInfo(progress.preferences.musicType);

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40">
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-3 cozy-card cozy-glow shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayPause}
              disabled={isLoading}
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
                <div className="text-xs text-muted-foreground">
                  {!hasUserInteracted ? 'Click play to start' : 
                   isLoading ? 'Loading...' :
                   isPlaying ? 'Playing ambient audio' : 'Ready to play'}
                </div>
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
