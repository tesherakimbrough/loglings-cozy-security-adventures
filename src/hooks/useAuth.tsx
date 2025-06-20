
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Auth state cleanup utility to prevent limbo states
const cleanupAuthState = () => {
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

// Input validation utilities
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return { isValid: errors.length === 0, errors };
};

const validateDisplayName = (displayName: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (displayName.length < 2) {
    errors.push('Display name must be at least 2 characters long');
  }
  if (displayName.length > 50) {
    errors.push('Display name must be less than 50 characters');
  }
  if (!/^[a-zA-Z0-9\s._-]+$/.test(displayName)) {
    errors.push('Display name contains invalid characters');
  }
  
  return { isValid: errors.length === 0, errors };
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle successful email verification
        if (event === 'SIGNED_IN' && session) {
          console.log('User signed in successfully');
        }
      }
    );

    // THEN check for existing session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session');
        }
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error('Exception getting session');
        setLoading(false);
      }
    };

    getInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      // Validate inputs
      if (!validateEmail(email)) {
        return { error: { message: 'Invalid email format' } };
      }
      
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return { error: { message: passwordValidation.errors.join(', ') } };
      }
      
      if (displayName) {
        const displayNameValidation = validateDisplayName(displayName);
        if (!displayNameValidation.isValid) {
          return { error: { message: displayNameValidation.errors.join(', ') } };
        }
      }
      
      // Clean up any existing auth state
      cleanupAuthState();
      
      // Get the current origin for redirect
      const redirectUrl = `${window.location.origin}/`;
      console.log('Sign up initiated');
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            display_name: displayName || email.split('@')[0]
          }
        }
      });
      
      if (error) {
        console.error('Sign up failed');
        return { error };
      }
      
      console.log('Sign up successful');
      return { error: null, data };
    } catch (error) {
      console.error('Sign up exception');
      return { error: error as any };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Validate inputs
      if (!validateEmail(email)) {
        return { error: { message: 'Invalid email format' } };
      }
      
      if (password.length < 1) {
        return { error: { message: 'Password is required' } };
      }
      
      // Clean up existing state
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
        console.warn('Could not sign out globally');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Sign in failed');
        return { error };
      }
      
      console.log('Sign in successful');
      
      // Update state immediately instead of forcing page reload
      setSession(data.session);
      setUser(data.user);
      
      return { error: null, data };
    } catch (error) {
      console.error('Sign in exception');
      return { error: error as any };
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.warn('Could not sign out globally');
      }
      
      // Update state immediately
      setSession(null);
      setUser(null);
      
      return { error: null };
    } catch (error) {
      console.error('Sign out error');
      return { error: error as any };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    // Export validation utilities for use in components
    validateEmail,
    validatePassword,
    validateDisplayName
  };
};
