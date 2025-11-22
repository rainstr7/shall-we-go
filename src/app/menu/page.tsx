"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useLogout } from '@/hooks/useAuth';
import clsx from 'clsx';
import {
  HomeIcon,
  MatchesIcon,
  GameIcon,
  DatesIcon,
  PicksIcon,
  SettingsIcon,
  SignOutIcon,
  PremiumStarIcon
} from '@/components/icons';
import styles from './menu.module.css';

const MenuPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const logoutMutation = useLogout();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await logoutMutation.mutateAsync();
      // После успешного выхода перенаправляем на страницу логина
      router.push('/auth/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      // Даже если есть ошибка, перенаправляем на логин
      router.push('/auth/login');
    }
  };

  return (
    <div className={styles.menuContainer}>

      {/* Profile Section */}
      <div className={styles.profileSection}>
        <img
          src="/images/avatars/ava_ashley.jpg"
          alt="Profile"
          className={styles.profileImage}
        />
        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>Ashley</h2>
          <p className={styles.editProfile}>{isHydrated ? t('menu.editProfile') : 'EDIT PROFILE'}</p>
        </div>
      </div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        {/* Navigation Items */}
        <div className={styles.navigation}>
        {/* Home - Active */}
        <div className={`${styles.navItem} ${styles.active}`}>
          <div className={styles.navIcon}>
            <HomeIcon />
          </div>
          <span className={styles.navText}>{isHydrated ? t('menu.home') : 'Home'}</span>
        </div>

        {/* Matches */}
        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <MatchesIcon />
          </div>
          <span className={styles.navText}>{isHydrated ? t('menu.matches') : 'Matches'}</span>
          <div className={styles.badge}>
            <span className={styles.badgeText}>1K</span>
          </div>
        </div>

        {/* Game */}
        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <GameIcon />
          </div>
          <span className={styles.navText}>{isHydrated ? t('menu.game') : 'Game'}</span>
          <div className={styles.badge}>
            <span className={styles.badgeText}>22</span>
          </div>
        </div>

        {/* Dates */}
        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <DatesIcon />
          </div>
          <span className={styles.navText}>{isHydrated ? t('menu.dates') : 'Dates'}</span>
        </div>

        {/* Picks */}
        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <PicksIcon />
          </div>
          <span className={styles.navText}>{isHydrated ? t('menu.picks') : 'Picks'}</span>
          <div className={styles.badge}>
            <span className={styles.badgeText}>14</span>
          </div>
        </div>

        {/* Settings */}
        <div className={styles.navItem}>
          <div className={styles.navIcon}>
            <SettingsIcon />
          </div>
          <span className={styles.navText}>{isHydrated ? t('menu.settings') : 'Settings'}</span>
        </div>

        {/* Sign Out */}
        <div 
          className={clsx(styles.navItem, { [styles.loading]: logoutMutation.isPending })} 
          onClick={handleSignOut}
        >
          <div className={styles.navIcon}>
            <SignOutIcon />
          </div>
          <span className={styles.navText}>
            {logoutMutation.isPending 
              ? (isHydrated ? t('menu.signingOut') : 'Signing Out...') 
              : (isHydrated ? t('menu.signOut') : 'Sign Out')
            }
          </span>
        </div>
        </div>

        {/* Background Image Container */}
        <div className={styles.backgroundContainer}>
          <div className={styles.backgroundImage}></div>
        </div>
      </div>

      {/* Go Premium Button */}
      <Button
        variant="secondary"
        icon={<PremiumStarIcon />}
        iconPosition="right"
        onClick={() => console.log('Go Premium clicked')}
        className={styles.footerButton}
      >
        {isHydrated ? t('menu.goPremium') : 'GO PREMIUM'}
      </Button>
    </div>
  );
};

export default MenuPage;
