
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { enhancedScenarioGenerator } from '../utils/enhancedScenarioGenerator';

interface ContentStats {
  total: number;
  byDifficulty: Record<string, number>;
  byCategory: Record<string, number>;
}

const ContentAnalytics = () => {
  const [stats, setStats] = useState<ContentStats | null>(null);

  useEffect(() => {
    const loadStats = () => {
      try {
        const poolStats = enhancedScenarioGenerator.getPoolStats();
        setStats(poolStats);
      } catch (error) {
        console.error('Error loading content stats:', error);
      }
    };

    loadStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshContent = () => {
    enhancedScenarioGenerator.refreshPool();
    const poolStats = enhancedScenarioGenerator.getPoolStats();
    setStats(poolStats);
  };

  if (!stats) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Content Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading content statistics...</p>
        </CardContent>
      </Card>
    );
  }

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500', 
    advanced: 'bg-red-500'
  };

  const categoryColors = [
    'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 
    'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Content Library Analytics</CardTitle>
        <button 
          onClick={refreshContent}
          className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          Refresh Pool
        </button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Scenarios */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{stats.total}</div>
          <p className="text-muted-foreground">Total Available Scenarios</p>
        </div>

        {/* Difficulty Distribution */}
        <div>
          <h3 className="font-semibold mb-3">By Difficulty Level</h3>
          <div className="space-y-2">
            {Object.entries(stats.byDifficulty).map(([difficulty, count]) => {
              const percentage = (count / stats.total) * 100;
              return (
                <div key={difficulty} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="capitalize">
                      {difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Distribution */}
        <div>
          <h3 className="font-semibold mb-3">By Security Category</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(stats.byCategory).map(([category, count], index) => {
              const percentage = (count / stats.total) * 100;
              const colorClass = categoryColors[index % categoryColors.length];
              
              return (
                <div key={category} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${colorClass}`} />
                    <span className="text-sm capitalize">
                      {category.replace('_', ' ')}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {count}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Quality Indicator */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Content Variety Score</span>
            <Badge variant={stats.total > 150 ? "default" : stats.total > 100 ? "secondary" : "destructive"}>
              {stats.total > 150 ? "Excellent" : stats.total > 100 ? "Good" : "Needs Expansion"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on total scenarios and category distribution
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentAnalytics;
