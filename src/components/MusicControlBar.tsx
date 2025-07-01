
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, Loader2 } from 'lucide-react';
import { useRealAudio } from '../hooks/useRealAudio';
import { useEnhancedProgress } from '../hooks/useEnhancedProgress';

const MusicControlBar = () => {
  const { progress } = useEnhancedProgress();
  const {
    isPlaying,
    isLoading,
    hasUserInteracted,
    currentTrack,
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
  const isInSilenceMode = currentTrack === 'silence';

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40">
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-3 cozy-card cozy-glow shadow-lg">
        {/* Pure Focus Mode Notice */}
        {isInSilenceMode && (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-lg p-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-700 dark:text-green-300 font-medium">
                🎯 Pure focus mode - distraction-free learning
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayPause}
              disabled={isLoading || isInSilenceMode}
              className="cozy-card"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : isPlaying && !isInSilenceMode ? (
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
                  {isInSilenceMode ? 'Optimized for focus and concentration' :
                   !hasUserInteracted ? 'Click play to start' : 
                   isLoading ? 'Loading...' :
                   isPlaying ? 'Playing ambient audio' : 'Ready to play'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <div className="text-xs text-muted-foreground">
              {isInSilenceMode ? '🔇' : `${Math.round(progress.preferences.musicVolume * 100)}%`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicControlBar;
