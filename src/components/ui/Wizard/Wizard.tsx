'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WizardNavigation } from './WizardNavigation';
import styles from './Wizard.module.css';

interface WizardProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrev?: () => void;
  nextDisabled?: boolean;
  children: React.ReactNode;
}

export const Wizard: React.FC<WizardProps> = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  nextDisabled = false,
  children 
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={styles.container}>
      {/* Wizard Content */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className={styles.navigationContainer}>
        <WizardNavigation 
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={!isLastStep ? onNext : undefined}
          onPrev={!isFirstStep ? onPrev : undefined}
          nextDisabled={nextDisabled}
        />
      </div>
    </div>
  );
};