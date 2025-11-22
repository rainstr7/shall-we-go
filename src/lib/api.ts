// Типы для API
export interface User {
  id: number;
  name: string;
  email: string;
  birthDate: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  birthDate: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Базовый URL для API
const API_BASE_URL = '/api';

// Утилита для выполнения запросов с авторизацией
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Cookies автоматически отправляются браузером, не нужно добавлять заголовки
  
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Важно! Включаем отправку cookies
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// API функции аутентификации
export const authApi = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (!response.success) {
      throw new Error('Login failed');
    }

    return response.user;
  },

  async register(data: RegisterData): Promise<User> {
    const response = await request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.success) {
      throw new Error('Registration failed');
    }

    return response.user;
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await request<{ success: boolean; user: User }>('/auth/me');
      return response.success ? response.user : null;
    } catch (error) {
      // Если токен невалидный или отсутствует, возвращаем null
      return null;
    }
  },

  async logout(): Promise<void> {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch (error) {
      // Игнорируем ошибки при выходе - cookies все равно будут очищены сервером
    }
  }
};