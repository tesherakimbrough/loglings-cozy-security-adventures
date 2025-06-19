
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Clock, Target, Users, Zap } from 'lucide-react';
import { useLaunchReadiness } from '../hooks/useLaunchReadiness';
import { useMonetizationTracking } from '../hooks/useMonetizationTracking';

interface ReadinessItem {
  id: string;
  title: string;
  status: 'complete' | 'partial' | 'pending';
  progress: number;
  description: string;
  action?: string;
}

const SoftLaunchReadinessChecker = () => {
  const { readinessScore, launchMetrics } = useLaunchReadiness();
  const { trackMonetization } = useMonetizationTracking();
  const [readinessItems, setReadinessItems] = useState<ReadinessItem[]>([]);

  useEffect(() => {
    // Calculate readiness based on current state
    const feedbackCount = JSON.parse(localStorage.getItem('loglings-feedback') || '[]').length;
    const analyticsEvents = JSON.parse(localStorage.getItem('loglings-analytics') || '[]').length;
    const sessionHistory = JSON.parse(localStorage.getItem('loglings-session-history') || '[]').length;
    
    const items: ReadinessItem[] = [
      {
        id: 'content',
        title: 'Content Library',
        status: 'partial',
        progress: 65,
        description: 'Basic scenarios implemented, need expansion for retention',
        action: 'Expand scenario library to 100+ items'
      },
      {
        id: 'user_feedback',
        title: 'User Feedback System',
        status: feedbackCount >= 5 ? 'complete' : 'partial',
        progress: Math.min(100, (feedbackCount / 10) * 100),
        description: `${feedbackCount}/10 feedback items collected`,
        action: feedbackCount < 10 ? 'Collect more user feedback' : undefined
      },
      {
        id: 'analytics',
        title: 'Analytics & Tracking',
        status: analyticsEvents >= 50 ? 'complete' : 'partial',
        progress: Math.min(100, (analyticsEvents / 100) * 100),
        description: `${analyticsEvents} events tracked, monitoring user behavior`,
        action: analyticsEvents < 50 ? 'Generate more usage data' : undefined
      },
      {
        id: 'monetization',
        title: 'Monetization Ready',
        status: 'complete',
        progress: 100,
        description: 'Donation system implemented, premium infrastructure ready',
      },
      {
        id: 'performance',
        title: 'Performance Optimized',
        status: launchMetrics.performanceScore >= 80 ? 'complete' : 'partial',
        progress: launchMetrics.performanceScore,
        description: `Performance score: ${launchMetrics.performanceScore}/100`,
        action: launchMetrics.performanceScore < 80 ? 'Optimize loading times' : undefined
      },
      {
        id: 'accessibility',
        title: 'Accessibility Features',
        status: 'complete',
        progress: 100,
        description: 'Screen reader support, keyboard navigation, color accessibility',
      }
    ];

    setReadinessItems(items);
  }, [launchMetrics]);

  const getStatusIcon = (status: ReadinessItem['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'partial':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: ReadinessItem['status']) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-red-100 text-red-800">Needs Work</Badge>;
    }
  };

  const handleLaunchPrep = () => {
    trackMonetization({
      action: 'premium_inquiry',
      source: 'launch_readiness',
      context: 'soft_launch_prep'
    });
    
    // Show launch preparation guidance
    const incompleteItems = readinessItems.filter(item => item.status !== 'complete');
    if (incompleteItems.length === 0) {
      alert('🚀 You\'re ready for soft launch! All systems are go.');
    } else {
      const actions = incompleteItems.map(item => item.action).filter(Boolean).join('\n• ');
      alert(`Almost ready! Complete these items:\n• ${actions}`);
    }
  };

  const overallProgress = Math.round(readinessItems.reduce((sum, item) => sum + item.progress, 0) / readinessItems.length);

  return (
    <Card className="cozy-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Soft Launch Readiness
          </div>
          <Badge variant={overallProgress >= 80 ? 'default' : 'secondary'}>
            {overallProgress}% Ready
          </Badge>
        </CardTitle>
        <Progress value={overallProgress} className="w-full" />
      </CardHeader>
      
      <CardContent className="space-y-4">
        {readinessItems.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border">
            {getStatusIcon(item.status)}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{item.title}</h4>
                {getStatusBadge(item.status)}
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              {item.action && (
                <p className="text-xs text-blue-600 dark:text-blue-400">→ {item.action}</p>
              )}
              <Progress value={item.progress} className="h-2" />
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">{launchMetrics.userCount}</div>
              <div className="text-sm text-muted-foreground">Beta Users</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">{launchMetrics.feedbackCount}</div>
              <div className="text-sm text-muted-foreground">Feedback Items</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-600">{launchMetrics.avgSessionTime}m</div>
              <div className="text-sm text-muted-foreground">Avg Session</div>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleLaunchPrep}
          className="w-full logling-button"
          size="lg"
        >
          <Zap className="w-4 h-4 mr-2" />
          {overallProgress >= 80 ? 'Launch Now!' : 'Review Launch Plan'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SoftLaunchReadinessChecker;
