import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi, type Event } from '@/lib/api';

// Ключи для кэширования
export const eventsKeys = {
  all: ['events'] as const,
  lists: () => [...eventsKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...eventsKeys.lists(), { filters }] as const,
  details: () => [...eventsKeys.all, 'detail'] as const,
  detail: (id: number) => [...eventsKeys.details(), id] as const,
};

// Хук для получения всех событий
export function useEvents() {
  return useQuery({
    queryKey: eventsKeys.lists(),
    queryFn: eventsApi.getEvents,
    // Кэшировать на 5 минут
    staleTime: 5 * 60 * 1000,
  });
}

// Хук для получения конкретного события
export function useEvent(id: number) {
  return useQuery({
    queryKey: eventsKeys.detail(id),
    queryFn: () => eventsApi.getEvent(id),
    // Включать только если ID валидный
    enabled: !!id,
  });
}

// Хук для создания события
export function useCreateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: eventsApi.createEvent,
    onSuccess: (newEvent) => {
      // Инвалидировать список событий
      queryClient.invalidateQueries({ queryKey: eventsKeys.lists() });
      
      // Добавить новое событие в кэш
      queryClient.setQueryData(eventsKeys.detail(newEvent.id), newEvent);
    },
  });
}

// Хук для обновления события
export function useUpdateEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, event }: { id: number; event: Partial<Event> }) =>
      eventsApi.updateEvent(id, event),
    onSuccess: (updatedEvent) => {
      // Обновить событие в кэше
      queryClient.setQueryData(eventsKeys.detail(updatedEvent.id), updatedEvent);
      
      // Инвалидировать список событий
      queryClient.invalidateQueries({ queryKey: eventsKeys.lists() });
    },
  });
}

// Хук для удаления события
export function useDeleteEvent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: eventsApi.deleteEvent,
    onSuccess: (_, deletedId) => {
      // Удалить событие из кэша
      queryClient.removeQueries({ queryKey: eventsKeys.detail(deletedId) });
      
      // Инвалидировать список событий
      queryClient.invalidateQueries({ queryKey: eventsKeys.lists() });
    },
  });
}
