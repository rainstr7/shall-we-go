'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

export const ProgressBar: React.FC = () => {
  return (
    <motion.div 
      className={styles.progressBar}
      initial={{ width: 8, borderRadius: '50%', scale: 0.8 }}
      animate={{ 
        width: 19, 
        borderRadius: '25px', 
        scale: 1 
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1],
        scale: { duration: 0.3 }
      }}
    >
      {/* Shimmer effect */}
      <motion.div 
        className={styles.shimmer}
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
};