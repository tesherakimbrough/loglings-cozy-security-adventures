
import { useState, useEffect } from 'react';
import { useUserProfile } from './useUserProfile';
import { usePerformance } from './usePerformance';
import { useSession } from './useSession';

interface LaunchIssue {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface LaunchRecommendation {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High';
}

interface LaunchMetrics {
  userCount: number;
  feedbackCount: number;
  performanceScore: number;
  contentReadiness: number;
  avgSessionTime: number;
  completionRate: number;
}

export const useLaunchReadiness = () => {
  const { profile } = useUserProfile();
  const { metrics } = usePerformance();
  const { session } = useSession();
  
  const [readinessScore, setReadinessScore] = useState(75);
  const [criticalIssues, setCriticalIssues] = useState<LaunchIssue[]>([]);
  const [recommendations, setRecommendations] = useState<LaunchRecommendation[]>([]);
  const [launchMetrics, setLaunchMetrics] = useState<LaunchMetrics>({
    userCount: 15,
    feedbackCount: 8,
    performanceScore: 82,
    contentReadiness: 65,
    avgSessionTime: 12,
    completionRate: 78
  });

  useEffect(() => {
    // Calculate readiness score based on various factors
    let score = 0;
    const issues: LaunchIssue[] = [];
    const recs: LaunchRecommendation[] = [];

    // Performance check (20 points)
    if (metrics.loadTime < 3000) {
      score += 20;
    } else {
      score += 10;
      issues.push({
        title: 'Slow Load Time',
        description: `App loads in ${(metrics.loadTime / 1000).toFixed(1)}s. Target is under 3s for good user experience.`,
        priority: 'High'
      });
    }

    // Memory usage check (15 points)
    if (metrics.memoryUsage < 100) {
      score += 15;
    } else {
      score += 8;
      issues.push({
        title: 'High Memory Usage',
        description: `Memory usage is ${metrics.memoryUsage.toFixed(1)}MB. Consider optimizing components.`,
        priority: 'Medium'
      });
    }

    // User profile completeness (20 points)
    if (profile.hasCompletedOnboarding) {
      score += 20;
    } else {
      score += 5;
    }

    // Content readiness (25 points)
    const feedbackCount = JSON.parse(localStorage.getItem('loglings-feedback') || '[]').length;
    if (feedbackCount >= 10) {
      score += 25;
    } else if (feedbackCount >= 5) {
      score += 15;
    } else {
      score += 5;
      issues.push({
        title: 'Limited User Feedback',
        description: 'Need more user feedback before full launch. Target 10+ feedback items.',
        priority: 'High'
      });
    }

    // Analytics implementation (10 points)
    const analyticsData = JSON.parse(localStorage.getItem('loglings-analytics') || '[]');
    if (analyticsData.length > 50) {
      score += 10;
    } else {
      score += 5;
    }

    // Session tracking (10 points)
    if (session) {
      score += 10;
    } else {
      score += 3;
    }

    // Add recommendations based on current state
    recs.push({
      title: 'Add Donation Button',
      description: 'Implement Ko-fi or PayPal donation for immediate monetization opportunity.',
      impact: 'High',
      effort: 'Low'
    });

    recs.push({
      title: 'Expand Content Library',
      description: 'Create 50+ more cybersecurity scenarios for better user retention.',
      impact: 'High',
      effort: 'High'
    });

    recs.push({
      title: 'User Account System',
      description: 'Set up Supabase authentication for user progress tracking.',
      impact: 'Medium',
      effort: 'Medium'
    });

    recs.push({
      title: 'Mobile Optimization',
      description: 'Improve mobile experience for broader accessibility.',
      impact: 'Medium',
      effort: 'Medium'
    });

    if (score < 70) {
      issues.push({
        title: 'Launch Readiness Below Threshold',
        description: 'Address critical issues before launching to ensure user satisfaction.',
        priority: 'High'
      });
    }

    setReadinessScore(Math.min(100, score));
    setCriticalIssues(issues);
    setRecommendations(recs);

    // Update metrics with real data where available
    setLaunchMetrics(prev => ({
      ...prev,
      feedbackCount: feedbackCount,
      performanceScore: Math.round(100 - (metrics.loadTime / 50)),
      userCount: Math.max(15, Math.floor(Math.random() * 25) + 10) // Simulated for demo
    }));

  }, [metrics, profile, session]);

  return {
    readinessScore,
    criticalIssues,
    recommendations,
    launchMetrics,
    performanceData: metrics
  };
};
