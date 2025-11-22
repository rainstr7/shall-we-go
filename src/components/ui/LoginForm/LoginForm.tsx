'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Button } from '@/components/ui';
import { useLogin } from '@/hooks/useAuth';
import { createLoginSchema } from '@/lib/validationSchemas';
import * as yup from 'yup';
import styles from './LoginForm.module.css';

interface FormErrors {
  login?: string;
  password?: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const loginMutation = useLogin();

  // Схема валидации Yup
  const validationSchema = createLoginSchema(t);

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

    // Очищаем общую ошибку
    if (loginMutation.error) {
      loginMutation.reset();
    }
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    try {
      // Преобразуем login в email для API
      await loginMutation.mutateAsync({
        email: formData.login,
        password: formData.password
      });
      onSuccess?.();
    } catch (err) {
      // Ошибка уже обработана в TanStack Query
      console.error('Ошибка входа:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Общая ошибка */}
      {loginMutation.error && (
        <div className={styles.errorMessage}>
          {loginMutation.error.message}
        </div>
      )}

      {/* Поле логина */}
      <Input
        type="text"
        placeholder={t('auth.loginPlaceholder')}
        value={formData.login}
        onChange={handleInputChange('login')}
        hasError={!!errors.login}
        errorMessage={errors.login}
        autoComplete="username"
      />

      {/* Поле пароля */}
      <Input
        type="password"
        placeholder={t('auth.passwordPlaceholder')}
        value={formData.password}
        onChange={handleInputChange('password')}
        hasError={!!errors.password}
        errorMessage={errors.password}
        showPasswordToggle={true}
        autoComplete="current-password"
      />

      {/* Кнопка отправки */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={loginMutation.isPending}
        fullWidth={true}
        className={styles.submitButton}
      >
        {loginMutation.isPending ? t('common.loading') : t('auth.login')}
      </Button>
    </form>
  );
};
