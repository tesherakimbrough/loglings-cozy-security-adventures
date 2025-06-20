
import { Volume2, VolumeX } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useUserProfile } from '../../hooks/useUserProfile';
import MusicSelector from '../MusicSelector';

const AudioSettingsTab = () => {
  const { profile, updatePreferences } = useUserProfile();

  const handlePreferenceChange = (key: string, value: any) => {
    updatePreferences({ [key]: value });
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Music Selection */}
      <div className="space-y-3">
        <MusicSelector />
      </div>

      {/* Sound Effects Settings */}
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
          {profile.preferences.soundEffectsEnabled ? (
            <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-400 shrink-0" />
          )}
          Answer Feedback Sounds
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">
              Gentle chimes and feedback sounds
            </span>
            <Switch
              checked={profile.preferences.soundEffectsEnabled}
              onCheckedChange={(checked) => handlePreferenceChange('soundEffectsEnabled', checked)}
              className="shrink-0"
            />
          </div>
          {profile.preferences.soundEffectsEnabled && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Volume</span>
                <span className="text-blue-600 font-medium">{Math.round(profile.preferences.soundEffectsVolume * 100)}%</span>
              </div>
              <Slider
                value={[profile.preferences.soundEffectsVolume]}
                onValueChange={([value]) => handlePreferenceChange('soundEffectsVolume', value)}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* General Audio Settings */}
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
          {profile.preferences.audioEnabled ? (
            <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-400 shrink-0" />
          )}
          General Audio
        </h4>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">
            Enable all game sounds
          </span>
          <Switch
            checked={profile.preferences.audioEnabled}
            onCheckedChange={(checked) => handlePreferenceChange('audioEnabled', checked)}
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioSettingsTab;
