
import { Smartphone, Bell, Share2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserProfile } from '../../hooks/useUserProfile';
import CurrentModeDisplay from './CurrentModeDisplay';

interface GeneralSettingsTabProps {
  onModeSwitch: () => void;
}

const GeneralSettingsTab = ({ onModeSwitch }: GeneralSettingsTabProps) => {
  const { profile, updatePreferences } = useUserProfile();

  const handlePreferenceChange = (key: string, value: any) => {
    updatePreferences({ [key]: value });
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Current Mode Display */}
      <CurrentModeDisplay onModeSwitch={onModeSwitch} />

      {/* Difficulty Settings */}
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
          <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
          Adventure Difficulty
        </h4>
        <Select
          value={profile.preferences.difficulty}
          onValueChange={(value) => handlePreferenceChange('difficulty', value)}
        >
          <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg">
            <SelectItem value="beginner">🌱 Gentle Explorer</SelectItem>
            <SelectItem value="intermediate">🌿 Curious Adventurer</SelectItem>
            <SelectItem value="advanced">🌳 Forest Guardian</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications */}
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
          <Bell className="w-4 h-4 text-yellow-600 shrink-0" />
          Daily Reminders
        </h4>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">
            Gentle learning nudges
          </span>
          <Switch
            checked={profile.preferences.notifications}
            onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
            className="shrink-0"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
          <Share2 className="w-4 h-4 text-green-600 shrink-0" />
          Share Achievements
        </h4>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">
            Celebrate with friends
          </span>
          <Switch
            checked={profile.preferences.shareAchievements}
            onCheckedChange={(checked) => handlePreferenceChange('shareAchievements', checked)}
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsTab;
