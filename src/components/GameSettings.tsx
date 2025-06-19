
import { useState } from 'react';
import { Settings, Volume2, VolumeX, Smartphone, Bell, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEnhancedProgress } from '../hooks/useEnhancedProgress';
import MusicSelector from './MusicSelector';

const GameSettings = () => {
  const { progress, updatePreferences } = useEnhancedProgress();
  const [isOpen, setIsOpen] = useState(false);

  const handlePreferenceChange = (key: string, value: any) => {
    updatePreferences({ [key]: value });
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="cozy-card hover:scale-105 transition-all"
      >
        <Settings className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg cozy-card cozy-glow max-h-[95vh] overflow-y-auto">
            <CardHeader className="relative pb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="absolute right-2 top-2 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
              <CardTitle className="flex items-center gap-2 text-primary text-lg pr-8">
                <Settings className="w-5 h-5 shrink-0" />
                Cozy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pb-6">
              {/* Music Selection */}
              <div className="space-y-3">
                <MusicSelector />
              </div>

              {/* Audio Settings */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  {progress.preferences.audioEnabled ? (
                    <Volume2 className="w-4 h-4 text-accent shrink-0" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  Sound Effects
                </h4>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground flex-1">
                    Game feedback sounds
                  </span>
                  <Switch
                    checked={progress.preferences.audioEnabled}
                    onCheckedChange={(checked) => handlePreferenceChange('audioEnabled', checked)}
                    className="shrink-0"
                  />
                </div>
              </div>

              {/* Difficulty Settings */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Smartphone className="w-4 h-4 text-primary shrink-0" />
                  Adventure Difficulty
                </h4>
                <Select
                  value={progress.preferences.difficulty}
                  onValueChange={(value) => handlePreferenceChange('difficulty', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">🌱 Gentle Explorer</SelectItem>
                    <SelectItem value="intermediate">🌿 Curious Adventurer</SelectItem>
                    <SelectItem value="advanced">🌳 Forest Guardian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notifications */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Bell className="w-4 h-4 text-accent shrink-0" />
                  Daily Reminders
                </h4>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground flex-1">
                    Gentle learning nudges
                  </span>
                  <Switch
                    checked={progress.preferences.notifications}
                    onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                    className="shrink-0"
                  />
                </div>
              </div>

              {/* Social Sharing */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Share2 className="w-4 h-4 text-green-600 shrink-0" />
                  Share Achievements
                </h4>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground flex-1">
                    Celebrate with friends
                  </span>
                  <Switch
                    checked={progress.preferences.shareAchievements}
                    onCheckedChange={(checked) => handlePreferenceChange('shareAchievements', checked)}
                    className="shrink-0"
                  />
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-4 border-t">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full logling-button"
                >
                  Save Cozy Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default GameSettings;
