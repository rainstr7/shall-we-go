'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { InterestChip } from './InterestChip';
import styles from './InterestsStep.module.css';

const INTERESTS_ROWS = [
  ['movies', 'cooking'],
  ['bookNerd', 'musicEnthusiast'],  
  ['videoGames', 'traveling'],
  ['boating', 'athlete'],
  ['gambling', 'technology'],
  ['swimming', 'shopping'],
  ['videography', 'art'],
  ['design', 'photography']
] as const;

interface InterestsStepProps {
  selectedInterests: string[];
  onInterestToggle: (interestId: string) => void;
}

export const InterestsStep: React.FC<InterestsStepProps> = ({ 
  selectedInterests, 
  onInterestToggle 
}) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <div className={styles.headerIcon} />
        </div>
        <h1 className={styles.title}>{t('interests.title')}</h1>
      </div>

      {/* Description */}
      <p className={styles.description}>
        {t('interests.description')}
      </p>

      {/* Interests Grid */}
      <motion.div 
        className={styles.interestsGrid}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {INTERESTS_ROWS.map((row, rowIndex) => (
          <motion.div 
            key={rowIndex} 
            className={styles.interestRow}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: rowIndex * 0.1 + 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {row.map((interestId, chipIndex) => {
              const globalIndex = rowIndex * 2 + chipIndex;
              return (
                <InterestChip
                  key={interestId}
                  interestId={interestId}
                  isSelected={selectedInterests.includes(interestId)}
                  onToggle={() => onInterestToggle(interestId)}
                  index={globalIndex}
                />
              );
            })}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};