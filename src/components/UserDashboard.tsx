
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Trophy, Calendar, Target, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSupabaseProfile } from '@/hooks/useSupabaseProfile';

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const { profile, progress, loading } = useSupabaseProfile();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!user || !profile || !progress) {
    return null;
  }

  const accuracyPercentage = progress.total_sessions > 0 
    ? Math.round((progress.correct_answers / (progress.total_sessions * 10)) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card className="cozy-card cozy-glow bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-emerald-800 dark:text-emerald-200">
                  {profile.display_name || 'Cozy Explorer'}
                </CardTitle>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  {user.email}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={signOut}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-emerald-600 border-emerald-300">
              {progress.user_mode === 'cozy-everyday' ? '🌱 Cozy Explorer' : '🚀 Career Pro'}
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-300">
              {progress.difficulty_level.charAt(0).toUpperCase() + progress.difficulty_level.slice(1)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cozy-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Adventures</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{progress.total_sessions}</div>
            <p className="text-xs text-muted-foreground">
              Sessions completed
            </p>
          </CardContent>
        </Card>

        <Card className="cozy-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Joy Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{progress.total_score}</div>
            <p className="text-xs text-muted-foreground">
              Total points earned
            </p>
          </CardContent>
        </Card>

        <Card className="cozy-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{progress.current_streak}</div>
            <p className="text-xs text-muted-foreground">
              Days in a row
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accuracy Progress */}
      <Card className="cozy-card">
        <CardHeader>
          <CardTitle className="text-primary">Learning Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Accuracy Rate</span>
              <span>{accuracyPercentage}%</span>
            </div>
            <Progress value={accuracyPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Correct Answers</div>
              <div className="text-green-600">{progress.correct_answers}</div>
            </div>
            <div>
              <div className="font-medium">Longest Streak</div>
              <div className="text-blue-600">{progress.longest_streak} days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="cozy-card">
        <CardHeader>
          <CardTitle className="text-primary">Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {progress.achievements.length > 0 ? (
              progress.achievements.map((achievement, index) => (
                <Badge key={index} variant="secondary" className="justify-center">
                  {achievement}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground col-span-full">
                Complete your first adventure to start earning achievements!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
