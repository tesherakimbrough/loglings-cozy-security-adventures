
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2 } from 'lucide-react';
import { useAmbientMusic, MusicType } from '../hooks/useAmbientMusic';
import { useEnhancedProgress } from '../hooks/useEnhancedProgress';

interface MusicSelectorProps {
  compact?: boolean;
}

const MusicSelector = ({ compact = false }: MusicSelectorProps) => {
  const { progress, updatePreferences } = useEnhancedProgress();
  const {
    audioTracks,
    currentTrack,
    isPlaying,
    isLoading,
    volume,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume
  } = useAmbientMusic();

  const [previewTrack, setPreviewTrack] = useState<MusicType | null>(null);

  const handleTrackSelect = async (trackId: MusicType) => {
    await playTrack(trackId, progress.preferences.musicVolume);
    updatePreferences({ musicType: trackId });
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    updateVolume(volumeValue);
    updatePreferences({ musicVolume: volumeValue });
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      playTrack(progress.preferences.musicType, progress.preferences.musicVolume);
    }
  };

  const currentTrackInfo = getCurrentTrackInfo();

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
            🎵 Choose Your Vibe
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

        {/* Currently Playing */}
        {currentTrack !== 'silence' && (
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2">
              <span className="text-lg">{currentTrackInfo.emoji}</span>
              <div>
                <div className="font-medium text-sm">{currentTrackInfo.name}</div>
                <div className="text-xs text-muted-foreground">{currentTrackInfo.description}</div>
              </div>
            </div>
          </div>
        )}

        {/* Track Selection */}
        <div className="grid grid-cols-2 gap-2">
          {audioTracks.map((track) => (
            <Button
              key={track.id}
              variant={currentTrack === track.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleTrackSelect(track.id)}
              className="h-auto p-3 flex flex-col items-center gap-1 cozy-card hover:scale-105 transition-all"
            >
              <span className="text-lg">{track.emoji}</span>
              <span className="text-xs font-medium">{track.name}</span>
            </Button>
          ))}
        </div>

        {/* Volume Control */}
        {progress.preferences.musicType !== 'silence' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Volume2 className="w-4 h-4" />
              <span>Music Volume</span>
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
      </CardContent>
    </Card>
  );
};

export default MusicSelector;
