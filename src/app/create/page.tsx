'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wizard } from '@/components/ui';
import { InterestsStep } from '@/components/ui/InterestSelector/InterestsStep';
import { useRouter } from 'next/navigation';
import styles from './create.module.css';

export default function CreatePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['movies', 'traveling', 'videography']);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Последний шаг - завершение
      console.log('Wizard completed with interests:', selectedInterests);
      router.push('/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h1>Шаг 1: Добро пожаловать</h1>
            <p>Это первый шаг создания профиля.</p>
          </div>
        );
      case 2:
        return (
          <InterestsStep 
            selectedInterests={selectedInterests}
            onInterestToggle={handleInterestToggle}
          />
        );
      case 3:
        return (
          <div className={styles.stepContent}>
            <h1>Шаг 3: Фотографии</h1>
            <p>Здесь будет загрузка фотографий.</p>
          </div>
        );
      case 4:
        return (
          <div className={styles.stepContent}>
            <h1>Шаг 4: Завершение</h1>
            <p>Проверьте свои данные перед завершением.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <Wizard
        currentStep={currentStep}
        totalSteps={4}
        onNext={handleNext}
        onPrev={handlePrev}
        nextDisabled={currentStep === 2 && selectedInterests.length === 0}
      >
        {renderStepContent()}
      </Wizard>
    </div>
  );
}
