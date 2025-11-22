import { useEffect, useState } from 'react';
import { useEventStore } from '@/stores/eventStore';
import { useUserStore } from '@/stores/userStore';

export function useInitializeData() {
  const { events, setViewMode } = useEventStore();
  const { login } = useUserStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Проверяем, не инициализированы ли уже данные
    if (isInitialized) return;

    // Mock data initialization
    const mockEvents = [
      {
        id: 1,
        title: 'Прогулка в парке',
        description: 'Приятная прогулка в центральном парке города',
        date: '2024-01-15',
        location: 'Центральный парк',
        participants: 3,
        maxParticipants: 10,
      },
      {
        id: 2,
        title: 'Кофе в центре',
        description: 'Встреча за чашкой кофе в уютной кофейне',
        date: '2024-01-16',
        location: 'Кофейня "Уют"',
        participants: 2,
        maxParticipants: 6,
      },
      {
        id: 3,
        title: 'Кино вечер',
        description: 'Просмотр нового фильма в кинотеатре',
        date: '2024-01-17',
        location: 'Кинотеатр "Мир"',
        participants: 5,
        maxParticipants: 8,
      },
    ];

    // Mock user login
    const mockUser = {
      id: 1,
      name: 'Тестовый пользователь',
      email: 'test@example.com',
      avatar: '',
    };

    // Initialize stores with mock data
    useEventStore.setState({ events: mockEvents, viewMode: 'list' });
    login(mockUser);

    // Initialize theme - принудительно светлая тема
    const lightTheme = 'light';
    localStorage.setItem('theme', lightTheme);
    document.documentElement.setAttribute('data-theme', lightTheme);
    
    setIsInitialized(true);
  }, [login, isInitialized]);

  return isInitialized;
}
