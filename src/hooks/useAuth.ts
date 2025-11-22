import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi, type LoginCredentials, type RegisterData, type User } from '@/lib/api';

// Ключи для кэширования аутентификации
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Хук для получения текущего пользователя
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authApi.getCurrentUser,
    // Не делать запрос если нет токена
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('auth_token'),
    // Кэшировать пользователя на 10 минут
    staleTime: 10 * 60 * 1000,
  });
}

// Хук для входа
export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      // JWT токен автоматически сохраняется в HTTP-only cookies сервером
      // Обновляем кэш пользователя
      queryClient.setQueryData(authKeys.user(), user);
      
      // Инвалидировать все запросы (пользователь может получить доступ к новым данным)
      queryClient.invalidateQueries();
    },
  });
}

// Хук для регистрации
export function useRegister() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (user) => {
      // JWT токен автоматически сохраняется в HTTP-only cookies сервером
      // Обновляем кэш пользователя
      queryClient.setQueryData(authKeys.user(), user);
      
      // Инвалидировать все запросы
      queryClient.invalidateQueries();
    },
  });
}

// Хук для выхода
export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Очистить весь кэш
      queryClient.clear();
    },
  });
}
