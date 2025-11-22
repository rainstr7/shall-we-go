import * as yup from 'yup';

// Создаем функцию для получения схемы валидации с переводами
export const createRegistrationSchema = (t: (key: string, options?: any) => string) => {
  return yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('auth.validation.nameRequired'))
      .min(2, t('auth.validation.nameMinLength', { count: 2 }))
      .max(50, t('auth.validation.nameTooLong')),
    email: yup
      .string()
      .trim()
      .required(t('auth.validation.emailRequired'))
      .email(t('auth.validation.invalidEmail'))
      .max(100, t('auth.validation.emailTooLong')),
    birthdate: yup
      .string()
      .required(t('auth.validation.birthdateRequired'))
      .matches(/^\d{2}\/\d{2}\/\d{2}$/, t('auth.validation.invalidBirthdate'))
      .test('valid-date', t('auth.validation.invalidBirthdate'), function(value) {
        if (!value) return false;
        const [day, month, year] = value.split('/');
        const date = new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day));
        return date.getDate() == parseInt(day) && 
               date.getMonth() == parseInt(month) - 1 && 
               date.getFullYear() == 2000 + parseInt(year);
      }),
    password: yup
      .string()
      .required(t('auth.validation.passwordRequired'))
      .min(6, t('auth.validation.passwordMinLength', { count: 6 }))
      .max(100, t('auth.validation.passwordTooLong'))
      .test('contains-letters', t('auth.validation.passwordMustContainLetters'), function(value) {
        if (!value) return true; // Пропускаем если поле пустое (уже обработано required)
        return /[A-Za-z]/.test(value);
      })
      .test('contains-numbers', t('auth.validation.passwordMustContainNumbers'), function(value) {
        if (!value) return true; // Пропускаем если поле пустое (уже обработано required)
        return /[0-9]/.test(value);
      })
  });
};

// Схема для логина
export const createLoginSchema = (t: (key: string, options?: any) => string) => {
  return yup.object().shape({
    login: yup
      .string()
      .trim()
      .required(t('auth.validation.loginRequired'))
      .min(3, t('auth.validation.loginMinLength', { count: 3 })),
    password: yup
      .string()
      .required(t('auth.validation.passwordRequired'))
      .min(6, t('auth.validation.passwordMinLength', { count: 6 }))
  });
};
