'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './NextButtonWithProgress.module.css';

interface NextButtonWithProgressProps {
  onNext: () => void;
  disabled?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export const NextButtonWithProgress: React.FC<NextButtonWithProgressProps> = ({ 
  onNext, 
  disabled = false,
  currentStep = 2,
  totalSteps = 4
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {/* Progress indicators */}
      <div className={styles.progressContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          if (index + 1 === currentStep) {
            // Current step - elongated gradient bar
            return (
              <div
                key={index}
                className={styles.currentProgress}
              />
            );
          } else {
            // Other steps - small dots
            return (
              <div
                key={index}
                className={`${styles.dot} ${
                  index < currentStep ? styles.completed : ''
                }`}
              />
            );
          }
        })}
      </div>

      {/* Next text */}
      <div className={styles.nextText}>
        {t('common.next')}
      </div>

      {/* Next button */}
      <button
        className={`${styles.button} ${disabled ? styles.disabled : ''}`}
        onClick={onNext}
        disabled={disabled}
        type="button"
      >
        <div className={styles.arrow} />
      </button>
    </div>
  );
};