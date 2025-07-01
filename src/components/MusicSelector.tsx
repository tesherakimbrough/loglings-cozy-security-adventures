import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, ExternalLink, Info, Waves, Focus } from 'lucide-react';
import { useRealAudio } from '../hooks/useRealAudio';
import { useEnhancedProgress } from '../hooks/useEnhancedProgress';
import { MusicType } from '../types/musicTypes';
import { audioCredits, audioPresets } from '../config/audioTracks';

interface MusicSelectorProps {
  compact?: boolean;
}

const MusicSelector = ({ compact = false }: MusicSelectorProps) => {
  const { progress, updatePreferences } = useEnhancedProgress();
  const {
    audioTracks,
    isPlaying,
    isLoading,
    currentTrack,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume
  } = useRealAudio();

  const [showAttribution, setShowAttribution] = useState(false);

  const handleTrackSelect = async (trackId: MusicType) => {
    updatePreferences({ musicType: trackId });
    
    if (isPlaying && currentTrack === trackId) {
      await stopMusic();
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    updateVolume(volumeValue);
    updatePreferences({ musicVolume: volumeValue });
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await stopMusic();
    } else {
      if (progress.preferences.musicType !== 'silence') {
        await playTrack(progress.preferences.musicType, progress.preferences.musicVolume);
      }
    }
  };

  const currentTrackInfo = getCurrentTrackInfo(progress.preferences.musicType);

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={togglePlayPause}
          disabled={isLoading || progress.preferences.musicType === 'silence'}
          className="cozy-card cozy-hover"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="text-lg">{currentTrackInfo.emoji}</span>
          <span className="hidden sm:inline text-muted-foreground font-medium">
            {currentTrackInfo.name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Card className="cozy-card forest-glow">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold flex items-center gap-2 text-lg text-forest-primary">
            <Waves className="w-5 h-5" />
            Audio Preferences
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            disabled={isLoading || progress.preferences.musicType === 'silence'}
            className="cozy-card cozy-hover"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Currently Selected */}
        <div className="p-4 bg-gradient-to-r from-forest-primary/10 to-forest-secondary/10 rounded-xl border border-forest-primary/20 cozy-hover">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentTrackInfo.emoji}</span>
            <div className="flex-1">
              <div className="font-semibold text-forest-primary">{currentTrackInfo.name}</div>
              <div className="text-sm text-muted-foreground">
                {progress.preferences.musicType === 'silence' 
                  ? 'Pure focus mode - optimized for deep learning'
                  : progress.preferences.musicType === 'external' 
                    ? 'Using external music app' 
                    : isLoading
                      ? 'Loading audio file...'
                      : isPlaying 
                        ? 'Playing ambient soundscape'
                        : 'Click play to start ambient audio'}
              </div>
            </div>
            {progress.preferences.musicType === 'silence' && (
              <div className="flex items-center gap-1 text-green-600">
                <Focus className="w-4 h-4" />
                <span className="text-xs font-medium">Focus Mode</span>
              </div>
            )}
            {isPlaying && progress.preferences.musicType !== 'external' && progress.preferences.musicType !== 'silence' && (
              <div className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Playing</span>
              </div>
            )}
          </div>
        </div>

        {/* Pure Focus Mode Highlight */}
        {progress.preferences.musicType === 'silence' && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
            <div className="text-sm text-green-700 dark:text-green-300">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <Focus className="w-4 h-4" />
                Pure Focus Mode Active
              </p>
              <div className="text-xs space-y-1">
                <p>• Zero distractions for maximum concentration</p>
                <p>• Optimized for deep learning and skill building</p>
                <p>• Perfect for professional training environments</p>
              </div>
            </div>
          </div>
        )}

        {/* Coming in v2 Banner */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
          <div className="text-sm text-amber-700 dark:text-amber-300">
            <p className="font-semibold mb-2 flex items-center gap-2">
              <Waves className="w-4 h-4" />
              Ambient Audio Library - Coming in v2!
            </p>
            <div className="text-xs space-y-1">
              <p>• 60+ professional ambient soundscapes</p>
              <p>• Forest sounds, rain, cafe atmospheres</p>
              <p>• Full customization and mixing options</p>
              <p className="font-medium pt-1">Focus on learning first - audio enhancement later! 🎯</p>
            </div>
          </div>
        </div>

        {/* Track Selection */}
        <div className="space-y-3">
          <h5 className="font-medium text-sm text-forest-primary">Current Options</h5>
          <div className="grid grid-cols-2 gap-3">
            {audioTracks.map((track) => (
              <Button
                key={track.id}
                variant={progress.preferences.musicType === track.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleTrackSelect(track.id)}
                className="h-auto p-4 flex flex-col items-center gap-2 cozy-card cozy-hover transition-all duration-200"
              >
                <span className="text-xl">{track.emoji}</span>
                <span className="text-xs font-semibold text-center leading-tight">{track.name}</span>
                <span className="text-xs text-muted-foreground text-center leading-tight">{track.description}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Volume Control */}
        {progress.preferences.musicType !== 'silence' && progress.preferences.musicType !== 'external' && (
          <div className="space-y-3 p-4 bg-muted/30 rounded-xl">
            <div className="flex items-center gap-2 text-sm">
              <Volume2 className="w-4 h-4 text-forest-primary" />
              <span className="font-medium">Ambient Volume</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {Math.round(progress.preferences.musicVolume * 100)}%
              </span>
            </div>
            <Slider
              value={[progress.preferences.musicVolume]}
              onValueChange={handleVolumeChange}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        )}

        {/* External Music Instructions */}
        {progress.preferences.musicType === 'external' && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                External Music Mode
              </p>
              <div className="text-xs space-y-2">
                <p>Open your favorite music app and start playing:</p>
                <div className="grid grid-cols-1 gap-1 pl-2">
                  <p>• <strong>Spotify:</strong> Lofi Hip Hop playlists</p>
                  <p>• <strong>YouTube:</strong> Rain/Nature sounds</p>
                  <p>• <strong>Apple Music:</strong> Ambient/Study playlists</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audio Credits */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground">v2 Audio Credits</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAttribution(!showAttribution)}
              className="h-auto p-1 cozy-hover"
            >
              <Info className="w-3 h-3" />
            </Button>
          </div>
          
          {showAttribution && (
            <div className="text-xs text-muted-foreground space-y-2 bg-muted/50 p-3 rounded-lg">
              <p className="font-medium text-forest-primary">{audioCredits.main}</p>
              <p>{audioCredits.technical}</p>
              <p className="text-xs pt-1 border-t border-border/50">{audioCredits.licensing}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicSelector;
