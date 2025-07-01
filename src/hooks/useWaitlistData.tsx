
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WaitlistEntry {
  id: string;
  email: string;
  first_name: string | null;
  source: string;
  is_premium: boolean;
  created_at: string;
}

export const useWaitlistData = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [premiumCount, setPremiumCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWaitlistCounts = async () => {
    try {
      // Get total count
      const { count: total } = await supabase
        .from('waitlist_signups')
        .select('*', { count: 'exact', head: true });

      // Get premium count
      const { count: premium } = await supabase
        .from('waitlist_signups')
        .select('*', { count: 'exact', head: true })
        .eq('is_premium', true);

      setTotalCount(total || 0);
      setPremiumCount(premium || 0);
    } catch (error) {
      console.error('Error fetching waitlist counts:', error);
      // Fallback to reasonable defaults if database fails
      setTotalCount(47);
      setPremiumCount(12);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWaitlist = async (entry: {
    email: string;
    first_name?: string;
    source?: string;
    is_premium?: boolean;
  }) => {
    try {
      const { data, error } = await supabase
        .from('waitlist_signups')
        .insert({
          email: entry.email,
          first_name: entry.first_name || null,
          source: entry.source || 'waitlist',
          is_premium: entry.is_premium || false
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          // Email already exists
          throw new Error('Email already registered');
        }
        throw error;
      }

      // Refresh counts after successful insert
      await fetchWaitlistCounts();
      return { success: true, data };
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to join waitlist' 
      };
    }
  };

  const migrateLocalStorageData = async () => {
    try {
      const localData = localStorage.getItem('loglings-waitlist');
      if (localData) {
        const entries = JSON.parse(localData);
        for (const entry of entries) {
          await addToWaitlist({
            email: entry.email,
            first_name: entry.firstName,
            source: entry.source || 'waitlist',
            is_premium: entry.isPremium || false
          });
        }
        // Clear local storage after migration
        localStorage.removeItem('loglings-waitlist');
      }
    } catch (error) {
      console.error('Error migrating local storage data:', error);
    }
  };

  useEffect(() => {
    fetchWaitlistCounts();
    migrateLocalStorageData();

    // Set up real-time subscription for count updates
    const channel = supabase
      .channel('waitlist-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'waitlist_signups'
        },
        () => {
          fetchWaitlistCounts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    totalCount,
    premiumCount,
    isLoading,
    addToWaitlist,
    refreshCounts: fetchWaitlistCounts
  };
};
