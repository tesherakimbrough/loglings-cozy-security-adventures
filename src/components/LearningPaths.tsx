
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Target, Users, Shield, Zap, Award } from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  modules: Module[];
  requirements?: string[];
  badge: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  scenarios: number;
}

const learningPaths: LearningPath[] = [
  {
    id: 'soc-analyst',
    title: 'SOC Analyst Fundamentals',
    description: 'Learn the essentials of Security Operations Center analysis',
    icon: Shield,
    difficulty: 'intermediate',
    estimatedTime: '4-6 weeks',
    badge: '🛡️ SOC Analyst',
    modules: [
      {
        id: 'log-analysis',
        title: 'Log Analysis Basics',
        description: 'Understanding different types of security logs',
        completed: false,
        scenarios: 15
      },
      {
        id: 'threat-detection',
        title: 'Threat Detection',
        description: 'Identifying malicious activities in network traffic',
        completed: false,
        scenarios: 20
      },
      {
        id: 'incident-response',
        title: 'Incident Response',
        description: 'Proper procedures for handling security incidents',
        completed: false,
        scenarios: 12
      }
    ]
  },
  {
    id: 'security-fundamentals',
    title: 'Cybersecurity Foundations',
    description: 'Perfect starting point for cybersecurity newcomers',
    icon: BookOpen,
    difficulty: 'beginner',
    estimatedTime: '2-3 weeks',
    badge: '🌱 Security Seedling',
    modules: [
      {
        id: 'basic-concepts',
        title: 'Security Concepts',
        description: 'CIA Triad, authentication, and basic principles',
        completed: false,
        scenarios: 10
      },
      {
        id: 'common-threats',
        title: 'Common Threats',
        description: 'Phishing, malware, and social engineering',
        completed: false,
        scenarios: 15
      },
      {
        id: 'best-practices',
        title: 'Security Best Practices',
        description: 'Password security, updates, and safe browsing',
        completed: false,
        scenarios: 8
      }
    ]
  },
  {
    id: 'threat-hunter',
    title: 'Threat Hunting Specialist',
    description: 'Advanced techniques for proactive threat detection',
    icon: Target,
    difficulty: 'advanced',
    estimatedTime: '6-8 weeks',
    badge: '🎯 Threat Hunter',
    requirements: ['Complete SOC Analyst Fundamentals'],
    modules: [
      {
        id: 'advanced-analysis',
        title: 'Advanced Log Analysis',
        description: 'Complex pattern recognition and correlation',
        completed: false,
        scenarios: 25
      },
      {
        id: 'threat-intelligence',
        title: 'Threat Intelligence',
        description: 'Using intelligence feeds and IOCs',
        completed: false,
        scenarios: 18
      },
      {
        id: 'hunt-methodologies',
        title: 'Hunting Methodologies',
        description: 'Systematic approaches to threat hunting',
        completed: false,
        scenarios: 22
      }
    ]
  }
];

const LearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const calculateProgress = (path: LearningPath) => {
    const completed = path.modules.filter(m => m.completed).length;
    return (completed / path.modules.length) * 100;
  };

  if (selectedPath) {
    return (
      <Card className="cozy-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <selectedPath.icon className="w-8 h-8 text-primary" />
              <div>
                <CardTitle>{selectedPath.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{selectedPath.description}</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setSelectedPath(null)}>
              ← Back to Paths
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Badge className={getDifficultyColor(selectedPath.difficulty)}>
              {selectedPath.difficulty}
            </Badge>
            <span className="text-sm text-muted-foreground">
              📅 {selectedPath.estimatedTime}
            </span>
            <span className="text-sm text-muted-foreground">
              🎖️ Earn: {selectedPath.badge}
            </span>
          </div>

          {selectedPath.requirements && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Prerequisites:</h4>
              <ul className="list-disc list-inside text-sm text-amber-700 dark:text-amber-300">
                {selectedPath.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Progress</h4>
              <span className="text-sm text-muted-foreground">
                {selectedPath.modules.filter(m => m.completed).length}/{selectedPath.modules.length} modules
              </span>
            </div>
            <Progress value={calculateProgress(selectedPath)} className="h-2" />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Learning Modules</h4>
            {selectedPath.modules.map((module, index) => (
              <div key={module.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  module.completed ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
                }`}>
                  {module.completed ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium">{module.title}</h5>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {module.scenarios} practice scenarios
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant={module.completed ? "outline" : "default"}
                  disabled={module.completed}
                >
                  {module.completed ? 'Completed' : 'Start Module'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="cozy-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Learning Paths
        </CardTitle>
        <p className="text-muted-foreground">
          Structured learning journeys to build your cybersecurity expertise
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {learningPaths.map(path => {
            const Icon = path.icon;
            const progress = calculateProgress(path);
            
            return (
              <div 
                key={path.id} 
                className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedPath(path)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{path.title}</h3>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span>📅 {path.estimatedTime}</span>
                      <span>📚 {path.modules.length} modules</span>
                      <span>🎖️ {path.badge}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-1" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningPaths;
