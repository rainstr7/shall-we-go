'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InterestChip } from './InterestChip';
import { NextButtonWithProgress } from './NextButtonWithProgress';
import styles from './InterestSelector.module.css';

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

interface InterestSelectorProps {
  onNext: (selectedInterests: string[]) => void;
}

export const InterestSelector: React.FC<InterestSelectorProps> = ({ onNext }) => {
  const { t } = useTranslation();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['movies', 'traveling', 'videography']);

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleNext = () => {
    onNext(selectedInterests);
  };

  return (
    <div className={styles.container}>
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
      <div className={styles.interestsGrid}>
        {INTERESTS_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.interestRow}>
            {row.map((interestId) => (
              <InterestChip
                key={interestId}
                interestId={interestId}
                isSelected={selectedInterests.includes(interestId)}
                onToggle={() => handleInterestToggle(interestId)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Next Button with Progress */}
      <div className={styles.nextButtonContainer}>
        <NextButtonWithProgress 
          onNext={handleNext}
          disabled={selectedInterests.length === 0}
          currentStep={2}
          totalSteps={4}
        />
      </div>
    </div>
  );
};