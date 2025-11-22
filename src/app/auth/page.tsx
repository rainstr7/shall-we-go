'use client';

import { useUserStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './auth.module.css';

export default function AuthPage() {
  const { login, isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleMockLogin = () => {
    const mockUser = {
      id: 1,
      name: 'Тестовый пользователь',
      email: 'test@example.com',
      avatar: '',
    };
    login(mockUser);
  };

  if (isAuthenticated) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingText}>Перенаправление...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Shall We Go</h1>
        <p className={styles.subtitle}>Добро пожаловать!</p>
        <p className={styles.description}>
          Для демонстрации приложения используйте тестовый вход
        </p>
        <button className={styles.loginButton} onClick={handleMockLogin}>
          Войти как тестовый пользователь
        </button>
      </div>
    </div>
  );
}
