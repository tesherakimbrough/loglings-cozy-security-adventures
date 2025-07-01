
import { useState, useEffect, useCallback } from 'react';
import { generateAdvancedScenario } from '../utils/expandedScenarioDatabase';

interface OfflineState {
  isOnline: boolean;
  isOfflineMode: boolean;
  cachedScenarios: any[];
  pendingSync: any[];
  lastSync: number | null;
}

export const useOfflineMode = () => {
  const [offlineState, setOfflineState] = useState<OfflineState>({
    isOnline: navigator.onLine,
    isOfflineMode: false,
    cachedScenarios: [],
    pendingSync: [],
    lastSync: null
  });

  // Cache essential scenarios for offline play
  const cacheScenarios = useCallback(async () => {
    const scenarios = [];
    const difficulties = ['beginner', 'intermediate', 'advanced'] as const;
    
    // Cache 50 scenarios (mix of difficulties)
    for (let i = 0; i < 50; i++) {
      const difficulty = difficulties[i % 3];
      const scenario = generateAdvancedScenario(difficulty);
      scenarios.push(scenario);
    }
    
    localStorage.setItem('loglings-cached-scenarios', JSON.stringify(scenarios));
    
    setOfflineState(prev => ({
      ...prev,
      cachedScenarios: scenarios,
      lastSync: Date.now()
    }));
  }, []);

  // Load cached scenarios
  const loadCachedScenarios = useCallback(() => {
    const cached = localStorage.getItem('loglings-cached-scenarios');
    if (cached) {
      try {
        const scenarios = JSON.parse(cached);
        setOfflineState(prev => ({
          ...prev,
          cachedScenarios: scenarios
        }));
      } catch (error) {
        console.warn('Failed to load cached scenarios:', error);
      }
    }
  }, []);

  // Handle online/offline status changes
  useEffect(() => {
    const handleOnline = () => {
      setOfflineState(prev => ({ ...prev, isOnline: true }));
      syncPendingData();
    };

    const handleOffline = () => {
      setOfflineState(prev => ({ 
        ...prev, 
        isOnline: false,
        isOfflineMode: true 
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize offline capabilities
  useEffect(() => {
    loadCachedScenarios();
    if (offlineState.cachedScenarios.length === 0) {
      cacheScenarios();
    }
    registerServiceWorker();
  }, []);

  const registerServiceWorker = useCallback(async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      }
    }
  }, []);

  const syncPendingData = useCallback(async () => {
    const pending = JSON.parse(localStorage.getItem('loglings-pending-sync') || '[]');
    
    if (pending.length > 0 && offlineState.isOnline) {
      // Sync pending game data, achievements, etc.
      try {
        // Implementation would sync with Supabase
        localStorage.removeItem('loglings-pending-sync');
        setOfflineState(prev => ({ ...prev, pendingSync: [] }));
      } catch (error) {
        console.warn('Sync failed:', error);
      }
    }
  }, [offlineState.isOnline]);

  const addToPendingSync = useCallback((data: any) => {
    const pending = JSON.parse(localStorage.getItem('loglings-pending-sync') || '[]');
    pending.push({ ...data, timestamp: Date.now() });
    localStorage.setItem('loglings-pending-sync', JSON.stringify(pending));
    
    setOfflineState(prev => ({ ...prev, pendingSync: pending }));
  }, []);

  const getOfflineScenario = useCallback((difficulty: string = 'beginner') => {
    const filtered = offlineState.cachedScenarios.filter(s => s.difficulty === difficulty);
    return filtered[Math.floor(Math.random() * filtered.length)] || offlineState.cachedScenarios[0];
  }, [offlineState.cachedScenarios]);

  return {
    ...offlineState,
    cacheScenarios,
    addToPendingSync,
    syncPendingData,
    getOfflineScenario,
    canPlayOffline: offlineState.cachedScenarios.length > 0
  };
};
