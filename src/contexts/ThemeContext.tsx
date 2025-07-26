import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'light') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme] = useState<'light'>('light');

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme class
    root.classList.remove('light-theme', 'dark-theme');
    
    // Add current theme class
    root.classList.add(`light-theme`);
    
    // Set data-theme attribute for CSS variables
    root.setAttribute('data-theme', 'light');
    
    // Update body class for background color
    document.body.classList.remove('dark-mode');
    
    // Save to localStorage
    localStorage.setItem('theme', 'light');
  }, []);

  const toggleTheme = () => {
    // Bu fonksiyon artık bir şey yapmıyor, sadece arayüz uyumluluğu için tutuldu
  };

  const setTheme = () => {
    // Bu fonksiyon artık bir şey yapmıyor, sadece arayüz uyumluluğu için tutuldu
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};