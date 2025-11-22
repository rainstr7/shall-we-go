'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from './ProgressBar';
import styles from './WizardNavigation.module.css';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrev?: () => void;
  nextDisabled?: boolean;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  nextDisabled = false 
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {/* Left side - Previous button */}
      <div className={styles.leftSide}>
        <AnimatePresence>
          {onPrev && (
            <motion.button
              className={styles.prevButton}
              onClick={onPrev}
              type="button"
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={styles.prevArrow} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Center - Progress indicators */}
      <div className={styles.progressContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          if (index + 1 === currentStep) {
            // Current step - elongated gradient bar
            return (
              <ProgressBar key={`current-${index}`} />
            );
          } else {
            // Other steps - small dots
            return (
              <motion.div
                key={`dot-${index}`}
                className={`${styles.dot} ${
                  index < currentStep ? styles.completed : ''
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: index < currentStep ? 1.1 : 1,
                  opacity: 1
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.4, 0, 0.2, 1],
                  delay: index * 0.05
                }}
              />
            );
          }
        })}
      </div>

      {/* Right side - Next button */}
      <div className={styles.rightSide}>
        <AnimatePresence>
          {onNext && (
            <motion.button
              className={`${styles.nextButton} ${nextDisabled ? styles.disabled : ''}`}
              onClick={onNext}
              disabled={nextDisabled}
              type="button"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              whileHover={!nextDisabled ? { scale: 1.05 } : {}}
              whileTap={!nextDisabled ? { scale: 0.95 } : {}}
            >
              <div className={styles.nextArrow} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};