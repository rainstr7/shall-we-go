'use client';

import React from 'react';
import styles from './ProgressIndicator.module.css';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`${styles.dot} ${
            index < currentStep ? styles.completed : ''
          } ${index === currentStep - 1 ? styles.current : ''}`}
        />
      ))}
    </div>
  );
};