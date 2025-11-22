'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm, LanguageSwitcher } from '@/components/ui';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLoginSuccess = () => {
    // Перенаправляем на страницу меню после успешного входа
    router.push('/menu');
  };

  const handleSignUpRedirect = () => {
    router.push('/auth/register');
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage} />
      
      {/* Переключатель языка */}
      <div className={styles.languageSwitcher}>
        <LanguageSwitcher />
      </div>

      <div className={styles.loginCard}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            {t('auth.loginTitle')}
          </div>
          <div className={styles.statusBar}/>
        </div>
        
        <LoginForm onSuccess={handleLoginSuccess} />
        
        <div className={styles.signupText}>
          <span className={styles.noAccount}>
            {t('auth.noAccount')}
          </span>
          <span className={styles.signupLink} onClick={handleSignUpRedirect}>
            {t('auth.signUp')}
          </span>
        </div>
      </div>
    </div>
  );
}
