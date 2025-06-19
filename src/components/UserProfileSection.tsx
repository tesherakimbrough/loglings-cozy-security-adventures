
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import UserDashboard from './UserDashboard';

const UserProfileSection = () => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!user) return null;

  return (
    <Card className="cozy-card mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary">Your Profile</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                Hide <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <UserDashboard />
        </CardContent>
      )}
    </Card>
  );
};

export default UserProfileSection;
