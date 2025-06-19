
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WaitlistButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/waitlist')}
      variant="outline"
      className="cozy-card hover:scale-105 transition-all duration-200 border-2 border-primary/30 hover:border-primary/50"
    >
      <Mail className="w-4 h-4 mr-2" />
      Join Waitlist
    </Button>
  );
};

export default WaitlistButton;
