'use client';

import { Navigation, EventCard, Tabs, ThemeToggle, SettingsButton } from '@/components/ui';
import { useEventStore, useUserStore } from '@/stores';
import { useInitializeData } from '@/hooks/useInitializeData';
import { ListIcon, MapIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const { viewMode, setViewMode, filteredEvents, joinEvent } = useEventStore();
  const { isAuthenticated, currentUser } = useUserStore();
  
  // Initialize mock data and wait for completion
  const isInitialized = useInitializeData();

  // Redirect to auth if not authenticated (only after initialization)
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, isInitialized, router]);

  const handleJoinEvent = async (eventId: number) => {
    await joinEvent(eventId);
  };

  const handleViewDetails = (eventId: number) => {
    console.log('Viewing details for event:', eventId);
  };

  // Get events from store
  const events = filteredEvents();

  // Show loading while initializing or if not authenticated
  if (!isInitialized || !isAuthenticated) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>
            {!isInitialized ? 'Загрузка...' : 'Перенаправление...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Shall We Go</h1>
            <div className={styles.headerControls}>
              <SettingsButton onClick={() => console.log('Settings clicked')}>
                Настройки
              </SettingsButton>
              <ThemeToggle size="sm" />
              <button
                onClick={() => setViewMode('list')}
                className={`${styles.viewToggleButton} ${
                  viewMode === 'list' 
                    ? styles.viewToggleButtonActive
                    : styles.viewToggleButtonInactive
                }`}
              >
                <ListIcon size={20} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`${styles.viewToggleButton} ${
                  viewMode === 'map'
                    ? styles.viewToggleButtonActive
                    : styles.viewToggleButtonInactive
                }`}
              >
                <MapIcon size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {viewMode === 'list' ? (
            <div className={styles.eventsList}>
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onJoin={() => handleJoinEvent(event.id)}
                  onViewDetails={() => handleViewDetails(event.id)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.mapPlaceholder}>
              <div>
                <div className={styles.mapIcon}>
                  <svg className={styles.mapIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h2 className={styles.mapTitle}>Карта событий</h2>
                <p className={styles.mapDescription}>Здесь будет отображена карта с событиями</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <Navigation />
      </div>
    </div>
  );
}