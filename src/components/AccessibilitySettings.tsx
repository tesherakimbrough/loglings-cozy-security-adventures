
import { useState } from 'react';
import { Eye, EyeOff, Type, Palette, Mouse, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserProfile } from '../hooks/useUserProfile';

const AccessibilitySettings = () => {
  const { profile, updatePreferences } = useUserProfile();
  
  const handleAccessibilityChange = (key: string, value: any) => {
    updatePreferences({ [key]: value });
  };

  return (
    <Card className="cozy-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Eye className="w-5 h-5" />
          Accessibility Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2 text-sm">
            <Palette className="w-4 h-4 text-primary" />
            Visual Preferences
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">High Contrast Mode</span>
              <Switch
                checked={profile.preferences.highContrast || false}
                onCheckedChange={(checked) => handleAccessibilityChange('highContrast', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Reduce Motion</span>
              <Switch
                checked={profile.preferences.reduceMotion || false}
                onCheckedChange={(checked) => handleAccessibilityChange('reduceMotion', checked)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Font Size</label>
              <Select
                value={profile.preferences.fontSize || 'medium'}
                onValueChange={(value) => handleAccessibilityChange('fontSize', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="extra-large">Extra Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Color Theme</label>
              <Select
                value={profile.preferences.colorBlindMode || 'default'}
                onValueChange={(value) => handleAccessibilityChange('colorBlindMode', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Colors</SelectItem>
                  <SelectItem value="protanopia">Protanopia Friendly</SelectItem>
                  <SelectItem value="deuteranopia">Deuteranopia Friendly</SelectItem>
                  <SelectItem value="tritanopia">Tritanopia Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2 text-sm">
            <Volume2 className="w-4 h-4 text-accent" />
            Audio Preferences
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Audio Descriptions</span>
              <Switch
                checked={profile.preferences.audioDescriptions || false}
                onCheckedChange={(checked) => handleAccessibilityChange('audioDescriptions', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Screen Reader Optimizations</span>
              <Switch
                checked={profile.preferences.screenReaderMode || false}
                onCheckedChange={(checked) => handleAccessibilityChange('screenReaderMode', checked)}
              />
            </div>
          </div>
        </div>

        {/* Navigation Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2 text-sm">
            <Mouse className="w-4 h-4 text-green-600" />
            Navigation Preferences
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Enhanced Focus Indicators</span>
              <Switch
                checked={profile.preferences.enhancedFocus || false}
                onCheckedChange={(checked) => handleAccessibilityChange('enhancedFocus', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Keyboard Navigation Only</span>
              <Switch
                checked={profile.preferences.keyboardOnly || false}
                onCheckedChange={(checked) => handleAccessibilityChange('keyboardOnly', checked)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessibilitySettings;
