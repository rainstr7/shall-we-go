import React from 'react';
import styles from './Navigation.module.css';

export function Navigation() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.navItem}>Главная</div>
      <div className={styles.navItem}>События</div>
      <div className={styles.navItem}>Профиль</div>
    </nav>
  );
}
