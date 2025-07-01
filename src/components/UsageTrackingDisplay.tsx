
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, Music, BookOpen, Download, Play } from 'lucide-react';
import { useUsageTracking } from '../hooks/useUsageTracking';
import { useSubscriptionTier } from '../hooks/useSubscriptionTier';
import { useMonetizationTracking } from '../hooks/useMonetizationTracking';

interface UsageItemProps {
  icon: any;
  title: string;
  current: number;
  limit: number;
  percentage: number;
  isNearLimit: boolean;
  isLimitReached: boolean;
  unit?: string;
}

const UsageItem = ({ icon: Icon, title, current, limit, percentage, isNearLimit, isLimitReached, unit = '' }: UsageItemProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <Badge variant={isLimitReached ? 'destructive' : isNearLimit ? 'secondary' : 'outline'}>
        {current}/{limit === 999 ? '∞' : limit} {unit}
      </Badge>
    </div>
    <Progress 
      value={Math.min(percentage, 100)} 
      className={`h-2 ${isLimitReached ? 'bg-red-100' : isNearLimit ? 'bg-yellow-100' : ''}`}
    />
    {isNearLimit && !isLimitReached && (
      <p className="text-xs text-yellow-600">Approaching limit</p>
    )}
    {isLimitReached && (
      <p className="text-xs text-red-600">Limit reached - upgrade to continue</p>
    )}
  </div>
);

const UsageTrackingDisplay = () => {
  const { usage, limits, getUsagePercentage, isLimitReached, isNearLimit, getRemainingUsage } = useUsageTracking();
  const { subscriptionTier } = useSubscriptionTier();
  const { trackPremiumInquiry } = useMonetizationTracking();

  const handleUpgradeClick = () => {
    trackPremiumInquiry('usage_tracking', 'limit_reached');
  };

  const isFreeUser = subscriptionTier === 'free';

  if (!isFreeUser) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-600" />
            Premium Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <p className="text-green-600 font-medium">✓ Unlimited access to all features</p>
            <p className="text-sm text-muted-foreground">
              You're enjoying full forest privileges as a premium member
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasAnyLimits = isLimitReached('scenariosPerDay') || isLimitReached('totalScenarios');
  const hasAnyNearLimits = isNearLimit('scenariosPerDay') || isNearLimit('totalScenarios');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Forest Usage</span>
          {(hasAnyLimits || hasAnyNearLimits) && (
            <Badge variant="outline" className="text-amber-600 border-amber-600">
              Consider Upgrading
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <UsageItem
          icon={Play}
          title="Daily Scenarios"
          current={usage.scenariosToday}
          limit={limits.scenariosPerDay}
          percentage={getUsagePercentage('scenariosPerDay')}
          isNearLimit={isNearLimit('scenariosPerDay')}
          isLimitReached={isLimitReached('scenariosPerDay')}
        />

        <UsageItem
          icon={BookOpen}
          title="Total Scenarios"
          current={usage.totalScenariosUsed}
          limit={limits.totalScenarios}
          percentage={getUsagePercentage('totalScenarios')}
          isNearLimit={isNearLimit('totalScenarios')}
          isLimitReached={isLimitReached('totalScenarios')}
        />

        <UsageItem
          icon={Music}
          title="Audio Tracks"
          current={usage.audioTracksUsed}
          limit={limits.audioTracks}
          percentage={getUsagePercentage('audioTracks')}
          isNearLimit={isNearLimit('audioTracks')}
          isLimitReached={isLimitReached('audioTracks')}
        />

        {(hasAnyLimits || hasAnyNearLimits) && (
          <div className="pt-4 border-t space-y-3">
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4">
              <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                Ready for unlimited forest exploration?
              </h4>
              <ul className="text-sm text-amber-600 dark:text-amber-400 space-y-1 mb-3">
                <li>• Unlimited daily scenarios</li>
                <li>• Access to 300+ premium scenarios</li>
                <li>• Complete audio library (20+ tracks)</li>
                <li>• Advanced learning paths</li>
              </ul>
              <Button onClick={handleUpgradeClick} size="sm" className="w-full">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          </div>
        )}

        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            Limits reset daily. Upgrade anytime for unlimited access.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageTrackingDisplay;
