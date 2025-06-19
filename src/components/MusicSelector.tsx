
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, AlertCircle, ExternalLink } from 'lucide-react';
import { useRealAudio } from '../hooks/useRealAudio';
import { useEnhancedProgress } from '../hooks/useEnhancedProgress';
import { MusicType } from '../types/musicTypes';
import { audioCredits } from '../config/audioTracks';

interface MusicSelectorProps {
  compact?: boolean;
}

const MusicSelector = ({ compact = false }: MusicSelectorProps) => {
  const { progress, updatePreferences } = useEnhancedProgress();
  const {
    audioTracks,
    isPlaying,
    isLoading,
    error,
    currentTrack,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume
  } = useRealAudio();

  const handleTrackSelect = async (trackId: MusicType) => {
    // Update preferences first
    updatePreferences({ musicType: trackId });
    
    // Don't auto-play, let user click play button
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
        
        <div className="flex items-center gap-2 text-sm">
          <span>{currentTrackInfo.emoji}</span>
          <span className="hidden sm:inline text-muted-foreground">
            {currentTrackInfo.name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Card className="cozy-card">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold flex items-center gap-2">
            🎵 Choose Your Cozy Vibe
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            disabled={isLoading || progress.preferences.musicType === 'silence'}
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
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Currently Playing */}
        {progress.preferences.musicType !== 'silence' && (
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2">
              <span className="text-lg">{currentTrackInfo.emoji}</span>
              <div>
                <div className="font-medium text-sm">{currentTrackInfo.name}</div>
                <div className="text-xs text-muted-foreground">
                  {progress.preferences.musicType === 'external' 
                    ? 'Using external music app' 
                    : isPlaying 
                      ? 'Playing high-quality ambient audio'
                      : 'Click play to start'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Track Selection */}
        <div className="grid grid-cols-2 gap-2">
          {audioTracks.map((track) => (
            <Button
              key={track.id}
              variant={progress.preferences.musicType === track.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleTrackSelect(track.id)}
              className="h-auto p-3 flex flex-col items-center gap-1 cozy-card hover:scale-105 transition-all"
            >
              <span className="text-lg">{track.emoji}</span>
              <span className="text-xs font-medium text-center">{track.name}</span>
              <span className="text-xs text-muted-foreground text-center">{track.description}</span>
            </Button>
          ))}
        </div>

        {/* Volume Control */}
        {progress.preferences.musicType !== 'silence' && progress.preferences.musicType !== 'external' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Volume2 className="w-4 h-4" />
              <span>Music Volume</span>
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

        {/* High-Quality Audio Notice */}
        {isPlaying && progress.preferences.musicType !== 'external' && (
          <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-sm text-green-700 dark:text-green-300">
              <p className="font-medium mb-1">🎶 High-Quality Audio</p>
              <p className="text-xs">Playing real ambient recordings - authentic and immersive!</p>
            </div>
          </div>
        )}

        {/* External Music Instructions */}
        {progress.preferences.musicType === 'external' && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1 flex items-center gap-1">
                🎧 External Music Mode 
                <ExternalLink className="w-3 h-3" />
              </p>
              <p className="text-xs mb-2">Open your favorite music app and start playing your preferred playlist.</p>
              <div className="text-xs space-y-1">
                <p>• <strong>Spotify:</strong> Lofi Hip Hop playlists</p>
                <p>• <strong>YouTube:</strong> Rain/Nature sounds</p>
                <p>• <strong>Apple Music:</strong> Ambient/Study playlists</p>
              </div>
            </div>
          </div>
        )}

        {/* Audio Credits */}
        <div className="text-xs text-muted-foreground border-t pt-3">
          <p className="font-medium mb-1">Audio Credits:</p>
          <p>{audioCredits.internetArchive}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicSelector;
