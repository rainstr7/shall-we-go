'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Принудительно устанавливаем светлую тему
    const lightTheme = 'light';
    setTheme(lightTheme);
    localStorage.setItem('theme', lightTheme);
    document.documentElement.setAttribute('data-theme', lightTheme);
  }, []);

  const handleSetTheme = (newTheme: 'light' | 'dark') => {
    // Принудительно устанавливаем только светлую тему
    const lightTheme = 'light';
    setTheme(lightTheme);
    localStorage.setItem('theme', lightTheme);
    document.documentElement.setAttribute('data-theme', lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
