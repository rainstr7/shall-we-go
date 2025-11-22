'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' }
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className={styles.switcher}>
      {languages.map((language) => (
        <button
          key={language.code}
          className={`${styles.button} ${
            i18n.language === language.code ? styles.active : ''
          }`}
          onClick={() => changeLanguage(language.code)}
        >
          {language.name}
        </button>
      ))}
    </div>
  );
};