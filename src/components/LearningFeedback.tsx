
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, Target, Lightbulb, ChevronRight } from 'lucide-react';

interface LearningStats {
  strongestCategories: string[];
  improvementAreas: string[];
  accuracyTrend: number;
  speedTrend: number;
  totalLearned: number;
}

interface LearningFeedbackProps {
  stats: LearningStats;
  onViewTutorial: (category: string) => void;
}

const LearningFeedback = ({ stats, onViewTutorial }: LearningFeedbackProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const categoryInfo = {
    'authentication': {
      emoji: '🔐',
      name: 'Authentication Security',
      description: 'Login patterns, password security, and access controls',
      tips: [
        'Look for unusual login times or locations',
        'Multiple failed attempts often indicate attacks',
        'Geographic anomalies are red flags'
      ]
    },
    'network': {
      emoji: '🌐', 
      name: 'Network Security',
      description: 'Data transfers, network scanning, and connectivity patterns',
      tips: [
        'Large data transfers during off-hours are suspicious',
        'Port scans indicate reconnaissance activity',
        'Unknown devices need investigation'
      ]
    },
    'malware': {
      emoji: '🦠',
      name: 'Malware Detection', 
      description: 'Suspicious processes, file behaviors, and system anomalies',
      tips: [
        'Unexpected process communications are concerning',
        'File modifications in system directories need attention',
        'Network connections to unknown domains require investigation'
      ]
    },
    'data-breach': {
      emoji: '💾',
      name: 'Data Protection',
      description: 'File access patterns, data movement, and privacy controls',
      tips: [
        'Unusual file access patterns indicate potential breaches',
        'Large data downloads need verification',
        'Access to sensitive files outside business hours is suspicious'
      ]
    },
    'social-engineering': {
      emoji: '🎭',
      name: 'Social Engineering',
      description: 'Human-based attacks, phishing, and manipulation tactics',
      tips: [
        'Urgent requests for sensitive information are red flags',
        'Unusual communication patterns may indicate compromise',
        'Requests bypassing normal procedures need verification'
      ]
    },
    'system-admin': {
      emoji: '⚙️',
      name: 'System Administration',
      description: 'System changes, administrative actions, and configuration updates',
      tips: [
        'Unexpected system changes during business hours are concerning',
        'Administrative actions from unusual accounts need investigation',
        'Configuration changes without approval are suspicious'
      ]
    }
  };

  const getProgressColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600';
    if (accuracy >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    return <TrendingUp className="w-4 h-4 text-yellow-600 rotate-180" />;
  };

  return (
    <div className="space-y-6">
      {/* Learning Overview */}
      <Card className="cozy-card cozy-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BookOpen className="w-5 h-5" />
            Your Learning Journey
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Track your progress and discover areas for growth
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold text-primary">{stats.totalLearned}</div>
              <div className="text-sm text-muted-foreground">Concepts Learned</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center justify-center gap-1">
                <span className={`text-2xl font-bold ${getProgressColor(stats.accuracyTrend)}`}>
                  {stats.accuracyTrend}%
                </span>
                {getTrendIcon(stats.accuracyTrend - 70)}
              </div>
              <div className="text-sm text-muted-foreground">Recent Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strongest Areas */}
      <Card className="cozy-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <Target className="w-5 h-5" />
            Your Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.strongestCategories.map((category) => {
              const info = categoryInfo[category as keyof typeof categoryInfo];
              if (!info) return null;
              
              return (
                <div key={category} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{info.emoji}</span>
                    <div>
                      <div className="font-medium text-green-700 dark:text-green-300">
                        {info.name}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        You're showing excellent understanding here!
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-300">
                    Strong
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Improvement Areas */}
      <Card className="cozy-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-600">
            <Lightbulb className="w-5 h-5" />
            Growth Opportunities
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Focus on these areas to become an even better security detective!
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.improvementAreas.map((category) => {
              const info = categoryInfo[category as keyof typeof categoryInfo];
              if (!info) return null;
              
              const isExpanded = expandedSection === category;
              
              return (
                <div key={category} className="border border-amber-200 dark:border-amber-800 rounded-xl overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/30 cursor-pointer"
                    onClick={() => setExpandedSection(isExpanded ? null : category)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{info.emoji}</span>
                      <div>
                        <div className="font-medium text-amber-700 dark:text-amber-300">
                          {info.name}
                        </div>
                        <div className="text-xs text-amber-600 dark:text-amber-400">
                          Let's practice this together!
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-amber-600 border-amber-300">
                        Practice
                      </Badge>
                      <ChevronRight className={`w-4 h-4 text-amber-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="p-4 bg-background border-t border-amber-200 dark:border-amber-800">
                      <p className="text-sm text-muted-foreground mb-3">
                        {info.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium">Key things to look for:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {info.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onViewTutorial(category)}
                        className="text-amber-600 border-amber-300 hover:bg-amber-50"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningFeedback;
