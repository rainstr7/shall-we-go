'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './NextButton.module.css';

interface NextButtonProps {
  onNext: () => void;
  disabled?: boolean;
}

export const NextButton: React.FC<NextButtonProps> = ({ onNext, disabled = false }) => {
  const { t } = useTranslation();

  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ''}`}
      onClick={onNext}
      disabled={disabled}
      type="button"
    >
      <span>{t('common.next')}</span>
      <div className={styles.iconContainer}>
        <div className={styles.arrow} />
      </div>
    </button>
  );
};