'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { InterestIcon } from './InterestIcon';
import { ANIMATION_CONFIG, scaleInVariants, hoverVariants } from '../shared/animations';
import styles from './InterestChip.module.css';

interface InterestChipProps {
  interestId: string;
  isSelected: boolean;
  onToggle: () => void;
  index?: number; // Для staggered анимации
}

export const InterestChip: React.FC<InterestChipProps> = ({ 
  interestId, 
  isSelected, 
  onToggle,
  index = 0
}) => {
  const { t } = useTranslation();

  return (
    <motion.button
      className={`${styles.chip} ${isSelected ? styles.selected : ''}`}
      onClick={onToggle}
      type="button"
      variants={scaleInVariants}
      initial="hidden"
      animate="visible"
      transition={{ 
        duration: ANIMATION_CONFIG.duration.normal, 
        ease: ANIMATION_CONFIG.ease,
        delay: index * 0.05 // Детерминированная задержка
      }}
      whileHover={hoverVariants.chip.hover}
      whileTap={hoverVariants.chip.tap}
      layout
    >
      <InterestIcon interestId={interestId} isSelected={isSelected} />
      <div className={styles.label}>
        {t(`interests.items.${interestId}`)}
      </div>
    </motion.button>
  );
};
