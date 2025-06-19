
import { Button } from '@/components/ui/button';
import { User, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AuthButton = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={signOut}
        className="flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        Sign Out
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate('/auth')}
      className="flex items-center gap-2"
    >
      <LogIn className="w-4 h-4" />
      Sign In
    </Button>
  );
};

export default AuthButton;
