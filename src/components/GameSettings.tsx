
import { useState } from 'react';
import { Settings, Volume2, VolumeX, Smartphone, Bell, Share2, X, Shield, Heart, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useUserProfile } from '../hooks/useUserProfile';
import MusicSelector from './MusicSelector';

const GameSettings = () => {
  const { profile, updatePreferences, resetOnboarding } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);

  const handlePreferenceChange = (key: string, value: any) => {
    updatePreferences({ [key]: value });
  };

  const handleModeSwitch = () => {
    resetOnboarding();
    setIsOpen(false);
  };

  const getModeInfo = () => {
    return profile.mode === 'cozy-everyday' 
      ? { name: 'Cozy Everyday Discovery', icon: Heart, color: 'text-green-600' }
      : { name: 'Career Pro Mode', icon: Shield, color: 'text-blue-600' };
  };

  const modeInfo = getModeInfo();
  const ModeIcon = modeInfo.icon;

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
              {/* Current Mode Display */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <ModeIcon className={`w-4 h-4 ${modeInfo.color} shrink-0`} />
                  Current Adventure Mode
                </h4>
                <div className="p-4 bg-muted/30 rounded-xl border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{modeInfo.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {profile.mode === 'cozy-everyday' 
                          ? 'Gentle learning for everyone'
                          : 'Career-focused skill building'
                        }
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleModeSwitch}
                      className="cozy-card"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Switch Mode
                    </Button>
                  </div>
                </div>
              </div>

              {/* Music Selection */}
              <div className="space-y-3">
                <MusicSelector />
              </div>

              {/* Sound Effects Settings */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  {profile.preferences.soundEffectsEnabled ? (
                    <Volume2 className="w-4 h-4 text-accent shrink-0" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  Answer Feedback Sounds
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground flex-1">
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
                        <span className="text-muted-foreground">Volume</span>
                        <span className="text-primary font-medium">{Math.round(profile.preferences.soundEffectsVolume * 100)}%</span>
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
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  {profile.preferences.audioEnabled ? (
                    <Volume2 className="w-4 h-4 text-accent shrink-0" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  General Audio
                </h4>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground flex-1">
                    Enable all game sounds
                  </span>
                  <Switch
                    checked={profile.preferences.audioEnabled}
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
                  value={profile.preferences.difficulty}
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
                    checked={profile.preferences.notifications}
                    onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                    className="shrink-0"
                  />
                </div>
              </div>

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
                    checked={profile.preferences.shareAchievements}
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
