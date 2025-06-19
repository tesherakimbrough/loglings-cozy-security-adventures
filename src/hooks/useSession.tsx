
import { useState, useEffect } from 'react';
import { useAnalytics } from './useAnalytics';

interface SessionData {
  id: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  gamesSessions: number;
  totalTimeSpent: number;
}

export const useSession = () => {
  const [session, setSession] = useState<SessionData | null>(null);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Initialize or restore session
    const initSession = () => {
      const existingSessionId = sessionStorage.getItem('loglings-session-id');
      const sessionData = localStorage.getItem('loglings-current-session');
      
      if (existingSessionId && sessionData) {
        // Restore existing session
        const parsed = JSON.parse(sessionData);
        setSession({
          ...parsed,
          lastActivity: Date.now(),
          pageViews: parsed.pageViews + 1
        });
      } else {
        // Create new session
        const newSession: SessionData = {
          id: crypto.randomUUID(),
          startTime: Date.now(),
          lastActivity: Date.now(),
          pageViews: 1,
          gamesSessions: 0,
          totalTimeSpent: 0
        };
        
        setSession(newSession);
        sessionStorage.setItem('loglings-session-id', newSession.id);
        
        trackEvent({
          action: 'session_start',
          category: 'engagement'
        });
      }
    };

    initSession();

    // Track activity
    const handleActivity = () => {
      setSession(prev => prev ? {
        ...prev,
        lastActivity: Date.now()
      } : prev);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Update session periodically
    const interval = setInterval(() => {
      setSession(prev => {
        if (!prev) return prev;
        
        const now = Date.now();
        const timeSpent = now - prev.lastActivity;
        
        // Session timeout after 30 minutes of inactivity
        if (timeSpent > 30 * 60 * 1000) {
          trackEvent({
            action: 'session_timeout',
            category: 'engagement',
            value: Math.floor((now - prev.startTime) / 1000)
          });
          return null;
        }
        
        return {
          ...prev,
          totalTimeSpent: now - prev.startTime
        };
      });
    }, 60000); // Update every minute

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      clearInterval(interval);
    };
  }, [trackEvent]);

  // Save session data
  useEffect(() => {
    if (session) {
      localStorage.setItem('loglings-current-session', JSON.stringify(session));
    }
  }, [session]);

  const trackGameSession = () => {
    setSession(prev => prev ? {
      ...prev,
      gamesSessions: prev.gamesSessions + 1
    } : prev);
  };

  const endSession = () => {
    if (session) {
      trackEvent({
        action: 'session_end',
        category: 'engagement',
        value: Math.floor(session.totalTimeSpent / 1000)
      });
      
      // Save session to history
      const sessionHistory = JSON.parse(localStorage.getItem('loglings-session-history') || '[]');
      sessionHistory.push({
        ...session,
        endTime: Date.now()
      });
      localStorage.setItem('loglings-session-history', JSON.stringify(sessionHistory.slice(-50))); // Keep last 50 sessions
      
      // Clear current session
      sessionStorage.removeItem('loglings-session-id');
      localStorage.removeItem('loglings-current-session');
      setSession(null);
    }
  };

  return {
    session,
    trackGameSession,
    endSession,
    sessionTimeMinutes: session ? Math.floor(session.totalTimeSpent / 60000) : 0,
    isActiveSession: session && (Date.now() - session.lastActivity) < 5 * 60 * 1000 // 5 minutes
  };
};
