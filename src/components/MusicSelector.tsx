
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, AlertCircle, ExternalLink, Info, Sparkles } from 'lucide-react';
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
    error,
    currentTrack,
    getCurrentTrackInfo,
    playTrack,
    stopMusic,
    updateVolume
  } = useRealAudio();

  const [showAttribution, setShowAttribution] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

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
          className="cozy-card hover:cozy-glow transition-all duration-300"
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
          <span className="text-lg animate-gentle-float">{currentTrackInfo.emoji}</span>
          <span className="hidden sm:inline text-muted-foreground font-medium">
            {currentTrackInfo.name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <Card className="cozy-card cozy-glow border-2 border-primary/20 bg-gradient-to-br from-green-50/50 to-amber-50/50 dark:from-green-950/20 dark:to-amber-950/20">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-lg flex items-center gap-2 text-green-800 dark:text-green-200">
            <Sparkles className="w-5 h-5 text-amber-600 animate-sparkle" />
            Cozy Ambient Sounds
          </h4>
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            disabled={isLoading || progress.preferences.musicType === 'silence'}
            className="cozy-card hover:cozy-glow hover:scale-105 transition-all duration-300 forest-gradient text-white border-none"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800 cozy-glow">
            <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Currently Playing */}
        {progress.preferences.musicType !== 'silence' && (
          <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/30 cozy-glow">
            <div className="flex items-center gap-3">
              <span className="text-2xl animate-gentle-float">{currentTrackInfo.emoji}</span>
              <div>
                <div className="font-semibold text-primary">{currentTrackInfo.name}</div>
                <div className="text-sm text-muted-foreground">
                  {progress.preferences.musicType === 'external' 
                    ? 'Using external music app' 
                    : isPlaying 
                      ? 'Playing synthesized ambient audio'
                      : 'Ready to transport you to tranquility'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Track Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-green-700 dark:text-green-300">Choose Your Atmosphere</h5>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPresets(!showPresets)}
              className="text-xs hover:cozy-glow transition-all"
            >
              {showPresets ? 'Hide' : 'Show'} Presets
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {audioTracks.map((track) => (
              <Button
                key={track.id}
                variant={progress.preferences.musicType === track.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleTrackSelect(track.id)}
                className={`h-auto p-4 flex flex-col items-center gap-2 cozy-card hover:cozy-glow hover:scale-105 transition-all duration-300 ${
                  progress.preferences.musicType === track.id 
                    ? 'forest-gradient text-white border-none shadow-lg' 
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-xl animate-gentle-float">{track.emoji}</span>
                <span className="text-xs font-semibold text-center">{track.name}</span>
                <span className="text-xs text-center opacity-80">{track.description}</span>
              </Button>
            ))}
          </div>

          {/* Preset Combinations */}
          {showPresets && (
            <div className="space-y-3 pt-2 border-t border-primary/20">
              <h6 className="text-sm font-medium text-green-600 dark:text-green-400">Preset Combinations</h6>
              <div className="grid gap-2">
                {audioPresets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="outline"
                    size="sm"
                    className="h-auto p-3 flex items-center gap-3 cozy-card hover:cozy-glow hover:scale-105 transition-all duration-300 bg-amber-50/50 dark:bg-amber-950/20"
                  >
                    <span className="text-lg">{preset.emoji}</span>
                    <div className="text-left">
                      <div className="text-sm font-medium">{preset.name}</div>
                      <div className="text-xs text-muted-foreground">{preset.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Volume Control */}
        {progress.preferences.musicType !== 'silence' && progress.preferences.musicType !== 'external' && (
          <div className="space-y-3 p-4 bg-gradient-to-r from-amber-50/50 to-green-50/50 dark:from-amber-950/20 dark:to-green-950/20 rounded-xl border border-amber-200/50 dark:border-amber-800/50">
            <div className="flex items-center gap-3 text-sm">
              <Volume2 className="w-5 h-5 text-amber-600" />
              <span className="font-medium text-green-700 dark:text-green-300">Ambient Volume</span>
              <span className="text-xs text-muted-foreground ml-auto bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
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
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-xl border border-green-200 dark:border-green-800 cozy-glow">
            <div className="text-sm text-green-700 dark:text-green-300">
              <p className="font-semibold mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Web Audio Technology
              </p>
              <p className="text-xs">Real-time generated ambient soundscapes using advanced browser audio synthesis</p>
            </div>
          </div>
        )}

        {/* External Music Instructions */}
        {progress.preferences.musicType === 'external' && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-blue-200 dark:border-blue-800 cozy-glow">
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                External Music Mode 
              </p>
              <p className="text-xs mb-3">Open your favorite music app and start playing your preferred playlist.</p>
              <div className="text-xs space-y-1 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                <p>• <strong>Spotify:</strong> Lofi Hip Hop or Nature Sounds playlists</p>
                <p>• <strong>YouTube:</strong> Rain sounds or Forest ambience videos</p>
                <p>• <strong>Apple Music:</strong> Ambient or Study playlists</p>
              </div>
            </div>
          </div>
        )}

        {/* Audio Credits */}
        <div className="border-t border-primary/20 pt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-green-600 dark:text-green-400">Audio Technology</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAttribution(!showAttribution)}
              className="h-auto p-1 hover:cozy-glow transition-all"
            >
              <Info className="w-3 h-3" />
            </Button>
          </div>
          
          {showAttribution && (
            <div className="text-xs text-muted-foreground space-y-2 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-950/20 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="font-medium text-green-700 dark:text-green-300">{audioCredits.main}</p>
              <p className="text-xs">{audioCredits.note}</p>
              <p className="text-xs pt-2 border-t border-border/50 text-green-600 dark:text-green-400">{audioCredits.technology}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicSelector;
