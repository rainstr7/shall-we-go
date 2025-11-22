import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Кэшировать данные 5 минут
      staleTime: 5 * 60 * 1000,
      // Хранить в кэше 10 минут
      gcTime: 10 * 60 * 1000,
      // Retry 3 раза при ошибке
      retry: 3,
      // Не делать запросы в фоне если окно не активно
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Retry мутации только 1 раз
      retry: 1,
    },
  },
});
