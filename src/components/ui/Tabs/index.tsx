import React from 'react';
import styles from './Tabs.module.css';

interface TabsProps {
  children: React.ReactNode;
}

export function Tabs({ children }: TabsProps) {
  return (
    <div className={styles.tabs}>
      {children}
    </div>
  );
}
