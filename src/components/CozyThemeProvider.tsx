
import React, { createContext, useContext, useState, useEffect } from 'react';

type CozyTheme = 'spring' | 'summer' | 'autumn' | 'winter';

interface CozyThemeContextType {
  currentTheme: CozyTheme;
  setTheme: (theme: CozyTheme) => void;
  isCozyMode: boolean;
  toggleCozyMode: () => void;
}

const CozyThemeContext = createContext<CozyThemeContextType | undefined>(undefined);

export const useCozyTheme = () => {
  const context = useContext(CozyThemeContext);
  if (!context) {
    throw new Error('useCozyTheme must be used within a CozyThemeProvider');
  }
  return context;
};

interface CozyThemeProviderProps {
  children: React.ReactNode;
}

export const CozyThemeProvider = ({ children }: CozyThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<CozyTheme>('spring');
  const [isCozyMode, setIsCozyMode] = useState(true);

  useEffect(() => {
    // Get current season
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setCurrentTheme('spring');
    else if (month >= 5 && month <= 7) setCurrentTheme('summer');
    else if (month >= 8 && month <= 10) setCurrentTheme('autumn');
    else setCurrentTheme('winter');

    // Load saved preferences
    const savedCozyMode = localStorage.getItem('loglings-cozy-mode');
    if (savedCozyMode) {
      setIsCozyMode(JSON.parse(savedCozyMode));
    }
  }, []);

  const setTheme = (theme: CozyTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('loglings-current-theme', theme);
  };

  const toggleCozyMode = () => {
    const newMode = !isCozyMode;
    setIsCozyMode(newMode);
    localStorage.setItem('loglings-cozy-mode', JSON.stringify(newMode));
  };

  useEffect(() => {
    if (isCozyMode) {
      document.body.classList.add('cozy-mode');
      document.body.classList.add(`theme-${currentTheme}`);
    } else {
      document.body.classList.remove('cozy-mode');
      document.body.classList.remove(`theme-${currentTheme}`);
    }

    return () => {
      document.body.classList.remove('cozy-mode', 'theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter');
    };
  }, [isCozyMode, currentTheme]);

  return (
    <CozyThemeContext.Provider value={{
      currentTheme,
      setTheme,
      isCozyMode,
      toggleCozyMode
    }}>
      {children}
    </CozyThemeContext.Provider>
  );
};
