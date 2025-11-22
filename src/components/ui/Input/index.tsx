import React, { useState } from 'react';
import styles from './Input.module.css';

interface InputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  autoComplete?: string;
  // Новые пропсы для иконок и лейбла
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isValid?: boolean;
  showPasswordToggle?: boolean;
  required?: boolean;
  errorMessage?: string;
}

// Утилита для преобразования текста в разные форматы
const textUtils = {
  toUppercase: (text: string) => text.toUpperCase(),
  toLowercase: (text: string) => text.toLowerCase(),
  toTitleCase: (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
};

export function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '', 
  disabled = false,
  hasError = false,
  autoComplete,
  label,
  leftIcon,
  rightIcon,
  isValid = false,
  showPasswordToggle = false,
  required = false,
  errorMessage
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);
  const [isTouched, setIsTouched] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? 'password' : 'text');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTouched) {
      setIsTouched(true);
    }
    onChange?.(e.target.value);
  };

  // Определяем состояние иконки валидации
  const getValidationIconClass = () => {
    // Если есть ошибка - всегда показываем красную иконку
    if (errorMessage || hasError) return styles.error;
    // Если поле валидно и было затронуто - показываем зеленую
    if (isValid && isTouched) return styles.success;
    // По умолчанию - серая иконка
    return styles.initial;
  };

  // Определяем, должен ли показываться глаз (только для пароля)
  const shouldShowEye = type === 'password' && showPasswordToggle;
  // Если есть лейбл или иконки, используем контейнерный стиль
  if (label || leftIcon || rightIcon) {
    return (
      <div className={styles.inputGroup}>
        {label && <label className={styles.label}>{textUtils.toUppercase(label)}</label>}
        <div className={`${styles.inputContainer} ${hasError ? styles.error : ''} ${className}`}>
          {leftIcon && <div className={styles.iconLeft}>{leftIcon}</div>}
          <input
            type={inputType}
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            autoComplete={autoComplete}
          />
          {rightIcon && <div className={styles.iconRight}>{rightIcon}</div>}
          
          {/* Иконка глаза для пароля (появляется при наведении и если есть текст) */}
          {shouldShowEye && (
            <div className={`${styles.iconRight} ${styles.eyeIcon}`} onClick={togglePasswordVisibility}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        {showPassword ? (
                          // Зачеркнутый глаз (пароль скрыт)
                          <>
                            <path
                              d="M12 6.36328C8.36364 6.36328 5.25818 8.6251 4 11.8178C5.25818 15.0106 8.36364 17.2724 12 17.2724C15.6364 17.2724 18.7418 15.0106 20 11.8178C18.7418 8.6251 15.6364 6.36328 12 6.36328ZM12 15.4542C9.99273 15.4542 8.36364 13.8251 8.36364 11.8178C8.36364 9.81055 9.99273 8.18146 12 8.18146C14.0073 8.18146 15.6364 9.81055 15.6364 11.8178C15.6364 13.8251 14.0073 15.4542 12 15.4542ZM12 9.63601C10.7927 9.63601 9.81818 10.6106 9.81818 11.8178C9.81818 13.0251 10.7927 13.9996 12 13.9996C13.2073 13.9996 14.1818 13.0251 14.1818 11.8178C14.1818 10.6106 13.2073 9.63601 12 9.63601Z"
                              fill="currentColor"
                            />
                            <path
                              d="M6 6L18 18"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </>
                        ) : (
                          // Обычный глаз (пароль видимый)
                          <path
                            d="M12 6.36328C8.36364 6.36328 5.25818 8.6251 4 11.8178C5.25818 15.0106 8.36364 17.2724 12 17.2724C15.6364 17.2724 18.7418 15.0106 20 11.8178C18.7418 8.6251 15.6364 6.36328 12 6.36328ZM12 15.4542C9.99273 15.4542 8.36364 13.8251 8.36364 11.8178C8.36364 9.81055 9.99273 8.18146 12 8.18146C14.0073 8.18146 15.6364 9.81055 15.6364 11.8178C15.6364 13.8251 14.0073 15.4542 12 15.4542ZM12 9.63601C10.7927 9.63601 9.81818 10.6106 9.81818 11.8178C9.81818 13.0251 10.7927 13.9996 12 13.9996C13.2073 13.9996 14.1818 13.0251 14.1818 11.8178C14.1818 10.6106 13.2073 9.63601 12 9.63601Z"
                            fill="currentColor"
                          />
                        )}
                      </svg>
            </div>
          )}
          
          {/* Иконка валидации для required полей (правее глаза) */}
          {required && (
            <div className={`${styles.iconRight} ${getValidationIconClass()}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.5 4.5L6 12L2.5 8.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
        {errorMessage && (
          <div className={styles.fieldError}>
            {errorMessage}
          </div>
        )}
      </div>
    );
  }

  // Обычный инпут без иконок - но все равно показываем ошибки если они есть
  const inputClassName = `${styles.simpleInput} ${hasError ? styles.error : ''} ${className}`;
  
  return (
    <div>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        className={inputClassName}
        autoComplete={autoComplete}
      />
      {errorMessage && (
        <div className={styles.fieldError}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}
