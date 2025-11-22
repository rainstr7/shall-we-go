'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button, Gap } from '@/components/ui';
import { PersonIcon, EmailIcon, CalendarIcon, LockIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { createRegistrationSchema } from '@/lib/validationSchemas';
import { useRegister } from '@/hooks/useAuth';
import styles from './register.module.css';

interface FormErrors {
  name?: string;
  email?: string;
  birthdate?: string;
  password?: string;
}

export default function RegisterPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthdate: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();
  const registerMutation = useRegister();

  // Схема валидации Yup
  const validationSchema = createRegistrationSchema(t);

  // Валидация формы с Yup
  const validateForm = async (): Promise<boolean> => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: FormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof FormErrors] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Валидация отдельного поля
  const validateField = async (field: string, value: string) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, [field]: err.message }));
      }
    }
  };

  // Обработка изменения полей
  const handleInputChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Валидируем поле при изменении
    validateField(field, value);
  };

  const handleRegister = async () => {
    console.log('Начинаем регистрацию...', formData);
    
    const isValid = await validateForm();
    console.log('Валидация прошла:', isValid);
    console.log('Ошибки:', errors);
    
    if (!isValid) {
      console.log('Валидация не прошла, останавливаемся');
      return;
    }
    
    try {
      console.log('Отправляем данные на сервер...');
      await registerMutation.mutateAsync({
        ...formData,
        birthDate: formData.birthdate
      });
      console.log('Регистрация успешна, перенаправляем...');
      // Перенаправляем на страницу меню после успешной регистрации
      router.push('/menu');
    } catch (err) {
      // Ошибка уже обработана в TanStack Query
      console.error('Ошибка регистрации:', err);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/auth/login');
  };

  // Валидация для иконок - просто проверяем отсутствие ошибок
  const isNameValid = !errors.name && formData.name.length > 0;
  const isEmailValid = !errors.email && formData.email.length > 0;
  const isBirthdateValid = !errors.birthdate && formData.birthdate.length > 0;
  const isPasswordValid = !errors.password && formData.password.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage} />

      <div className={styles.registerCard}>

        {/* Приветствие */}
        <div className={styles.welcomeSection}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              {t('auth.registerTitle')}
            </div>
            <div className={styles.statusBar}/>
          </div>
          <p className={styles.welcomeSubtitle}>
            {t('auth.welcomeSubtitle')}
          </p>
        </div>

                {/* Форма регистрации */}
                <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                  {/* Общая ошибка */}
                  {registerMutation.error && (
                    <div className={styles.errorMessage}>
                      {registerMutation.error.message}
                    </div>
                  )}
                  
                  <Input
                    label={t('auth.nameLabel')}
                    placeholder={t('auth.namePlaceholder')}
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    leftIcon={<PersonIcon />}
                    isValid={isNameValid}
                    hasError={!!errors.name}
                    required={true}
                    errorMessage={errors.name}
                    autoComplete="name"
                  />

                  <Gap size="md" />

                  <Input
                    label={t('auth.emailLabel')}
                    type="email"
                    placeholder={t('auth.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    leftIcon={<EmailIcon />}
                    isValid={isEmailValid}
                    hasError={!!errors.email}
                    required={true}
                    errorMessage={errors.email}
                    autoComplete="email"
                  />

                  <Gap size="md" />

                  <Input
                    label={t('auth.birthdateLabel')}
                    placeholder={t('auth.birthdatePlaceholder')}
                    value={formData.birthdate}
                    onChange={handleInputChange('birthdate')}
                    leftIcon={<CalendarIcon />}
                    isValid={isBirthdateValid}
                    hasError={!!errors.birthdate}
                    required={true}
                    errorMessage={errors.birthdate}
                    autoComplete="bday"
                  />

                  <Gap size="md" />

                  <Input
                    label={t('auth.passwordLabel')}
                    type="password"
                    placeholder={t('auth.passwordPlaceholder')}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    leftIcon={<LockIcon />}
                    isValid={isPasswordValid}
                    hasError={!!errors.password}
                    showPasswordToggle={true}
                    required={true}
                    errorMessage={errors.password}
                    autoComplete="new-password"
                  />

                  <Gap size="lg" />

                  {/* Кнопка регистрации */}
                  <div className={styles.buttonSection}>
                    <Button 
                      type="submit"
                      variant="primary" 
                      size="lg" 
                      disabled={registerMutation.isPending}
                      fullWidth={true}
                      className={styles.registerButton}
                    >
                      {registerMutation.isPending ? t('common.loading') : t('auth.continue')}
                    </Button>
                  </div>
                </form>

        {/* Ссылка на логин */}
        <div className={styles.loginText}>
          <span className={styles.haveAccount}>{t('auth.hasAccount')}</span>
          <span className={styles.loginLink} onClick={handleLoginRedirect}>{t('auth.signIn')}</span>
        </div>
      </div>
    </div>
  );
}
