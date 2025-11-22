'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './InterestIcon.module.css';

interface InterestIconProps {
  interestId: string;
  isSelected: boolean;
}

export const InterestIcon: React.FC<InterestIconProps> = ({ interestId, isSelected }) => {
  return (
    <div className={styles.icon}>
      <motion.div 
        className={`${styles.circle} ${isSelected ? styles.selected : styles.normal}`}
        animate={{
          borderColor: isSelected ? '#ffffff' : '#A776FC',
          backgroundColor: isSelected ? '#ffffff' : 'transparent',
          scale: isSelected ? 1.1 : 1
        }}
        transition={{ 
          duration: 0.3, 
          ease: [0.4, 0, 0.2, 1]
        }}
        whileHover={{ 
          scale: isSelected ? 1.15 : 1.05,
          transition: { duration: 0.2 }
        }}
      />
    </div>
  );
};
