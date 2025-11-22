import React from 'react';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ size = 'md' }: ThemeToggleProps) {
  const toggleTheme = () => {
    // Принудительно устанавливаем только светлую тему
    const lightTheme = 'light';
    document.documentElement.setAttribute('data-theme', lightTheme);
    localStorage.setItem('theme', lightTheme);
  };

  return (
    <button 
      className={`${styles.themeToggle} ${styles[`size-${size}`]}`}
      onClick={toggleTheme}
      aria-label="Переключить тему"
    >
      <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  );
}
