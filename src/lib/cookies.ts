import { cookies } from 'next/headers';

// Имена cookie
export const AUTH_TOKEN_COOKIE = 'auth_token';
export const USER_DATA_COOKIE = 'user_data';

// Настройки cookie для безопасности
const COOKIE_OPTIONS = {
  httpOnly: true,        // Недоступно через JavaScript (защита от XSS)
  secure: process.env.NODE_ENV === 'production', // HTTPS только в продакшене
  sameSite: 'strict' as const, // Защита от CSRF
  path: '/',             // Доступно для всего сайта
  maxAge: 7 * 24 * 60 * 60, // 7 дней в секундах
};

// Серверные функции для работы с cookies
export function setAuthCookies(token: string, userData: string) {
  const cookieStore = cookies();
  
  cookieStore.set(AUTH_TOKEN_COOKIE, token, COOKIE_OPTIONS);
  cookieStore.set(USER_DATA_COOKIE, userData, COOKIE_OPTIONS);
}

export function clearAuthCookies() {
  const cookieStore = cookies();
  
  cookieStore.delete(AUTH_TOKEN_COOKIE);
  cookieStore.delete(USER_DATA_COOKIE);
}

export function getAuthToken(): string | null {
  const cookieStore = cookies();
  return cookieStore.get(AUTH_TOKEN_COOKIE)?.value || null;
}

export function getUserData(): string | null {
  const cookieStore = cookies();
  return cookieStore.get(USER_DATA_COOKIE)?.value || null;
}
