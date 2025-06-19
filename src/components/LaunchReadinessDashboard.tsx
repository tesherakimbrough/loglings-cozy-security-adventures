
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Users, 
  Heart,
  DollarSign,
  Target,
  Activity,
  Sparkles,
  TreePine
} from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import { useSession } from '../hooks/useSession';
import { useLaunchReadiness } from '../hooks/useLaunchReadiness';

const LaunchReadinessDashboard = () => {
  const { session } = useSession();
  const { trackEvent } = useAnalytics();
  const { 
    readinessScore, 
    criticalIssues, 
    recommendations,
    launchMetrics,
    performanceData 
  } = useLaunchReadiness();

  useEffect(() => {
    trackEvent({
      action: 'launch_dashboard_viewed',
      category: 'launch',
      label: 'readiness_check'
    });
  }, [trackEvent]);

  const getReadinessColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getReadinessStatus = (score: number) => {
    if (score >= 85) return 'Ready to Launch';
    if (score >= 70) return 'Almost Ready';
    return 'Needs Work';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <TreePine className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold cozy-heading">Launch Readiness Dashboard</h1>
          <Sparkles className="w-8 h-8 text-accent" />
        </div>
        <p className="text-muted-foreground text-lg">
          Your complete soft launch readiness assessment
        </p>
      </div>

      {/* Overall Readiness Score */}
      <Card className="cozy-card">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Target className="w-6 h-6" />
            Overall Launch Readiness
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className={`text-6xl font-bold ${getReadinessColor(readinessScore)}`}>
              {readinessScore}%
            </div>
            <p className="text-xl text-muted-foreground mt-2">
              {getReadinessStatus(readinessScore)}
            </p>
          </div>
          <Progress value={readinessScore} className="h-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{launchMetrics.userCount}</div>
              <p className="text-sm text-muted-foreground">Beta Users</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{launchMetrics.feedbackCount}</div>
              <p className="text-sm text-muted-foreground">Feedback Items</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{launchMetrics.performanceScore}%</div>
              <p className="text-sm text-muted-foreground">Performance</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{launchMetrics.contentReadiness}%</div>
              <p className="text-sm text-muted-foreground">Content Ready</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="issues" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issues">Critical Issues</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
        </TabsList>

        <TabsContent value="issues">
          <Card className="cozy-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Critical Issues to Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalIssues.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium">No critical issues found!</p>
                  <p className="text-muted-foreground">Your forest is ready to welcome visitors.</p>
                </div>
              ) : (
                criticalIssues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-red-800 dark:text-red-200">{issue.title}</h4>
                      <p className="text-sm text-red-600 dark:text-red-300 mt-1">{issue.description}</p>
                      <Badge variant="destructive" className="mt-2">
                        Priority: {issue.priority}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card className="cozy-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Launch Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                  <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">{rec.title}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">{rec.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">Impact: {rec.impact}</Badge>
                      <Badge variant="outline">Effort: {rec.effort}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="cozy-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Load Time</span>
                    <span className={performanceData.loadTime < 3000 ? 'text-green-600' : 'text-red-600'}>
                      {(performanceData.loadTime / 1000).toFixed(1)}s
                    </span>
                  </div>
                  <Progress value={Math.max(0, 100 - (performanceData.loadTime / 50))} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Memory Usage</span>
                    <span className={performanceData.memoryUsage < 100 ? 'text-green-600' : 'text-red-600'}>
                      {performanceData.memoryUsage.toFixed(1)}MB
                    </span>
                  </div>
                  <Progress value={Math.max(0, 100 - performanceData.memoryUsage)} />
                </div>
              </CardContent>
            </Card>

            <Card className="cozy-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  User Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{launchMetrics.avgSessionTime}m</div>
                    <p className="text-sm text-muted-foreground">Avg Session</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">{launchMetrics.completionRate}%</div>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monetization">
          <Card className="cozy-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Monetization Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg border">
                  <Heart className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                  <h4 className="font-medium">Donation Ready</h4>
                  <p className="text-sm text-muted-foreground">Ko-fi/PayPal integration</p>
                  <Badge className="mt-2" variant="secondary">Phase 1</Badge>
                </div>
                <div className="text-center p-4 rounded-lg border">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-medium">User Accounts</h4>
                  <p className="text-sm text-muted-foreground">Supabase auth needed</p>
                  <Badge className="mt-2" variant="outline">Phase 3</Badge>
                </div>
                <div className="text-center p-4 rounded-lg border">
                  <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-medium">Subscriptions</h4>
                  <p className="text-sm text-muted-foreground">Stripe integration</p>
                  <Badge className="mt-2" variant="outline">Phase 4</Badge>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Next Steps for Monetization:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Add simple donation button (immediate)</li>
                  <li>• Set up Supabase for user accounts (month 2)</li>
                  <li>• Integrate Stripe for subscriptions (month 4)</li>
                  <li>• Create premium content tiers (month 5)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaunchReadinessDashboard;
