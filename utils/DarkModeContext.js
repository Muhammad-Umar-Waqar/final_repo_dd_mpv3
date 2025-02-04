import React, { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const getInitialMode = () => {
      // Only access window/localStorage after component is mounted
      if (typeof window !== 'undefined') {
        const storedPreference = window.localStorage.getItem('darkMode');
        if (storedPreference !== null) {
          return storedPreference === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return false;
    };

    setIsDarkMode(getInitialMode());
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!window.localStorage.getItem('darkMode')) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    document.documentElement.classList.toggle('dark', isDarkMode);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isClient, isDarkMode]);

  const toggleDarkMode = React.useCallback(() => {
    if (!isClient) return;
    
    setIsDarkMode(prev => {
      const newValue = !prev;
      window.localStorage.setItem('darkMode', String(newValue));
      return newValue;
    });
  }, [isClient]);

  const value = React.useMemo(() => ({
    isDarkMode: isClient ? isDarkMode : false,
    toggleDarkMode
  }), [isDarkMode, toggleDarkMode, isClient]);

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}