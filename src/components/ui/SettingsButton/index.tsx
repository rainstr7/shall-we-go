import React from 'react';
import { Button } from '@/components/ui/Button';
import styles from './SettingsButton.module.css';

interface SettingsButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function SettingsButton({ children, onClick, disabled }: SettingsButtonProps) {
  return (
    <Button
      variant="primary"
      onClick={onClick}
      disabled={disabled}
      className={styles.settingsButton}
    >
      {children}
    </Button>
  );
}
