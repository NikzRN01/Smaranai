import React, { createContext, useContext, useEffect } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
  }, []);

  return (
    <ThemeContext.Provider value={undefined}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(){
  return undefined
}
