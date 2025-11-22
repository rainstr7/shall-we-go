import { create } from 'zustand';

interface User {
  id: string;
  login: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (credentials: { login: string; password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  // State
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // Actions
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    
    try {
      // Здесь будет реальная логика авторизации
      // Пока что симулируем запрос к API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Симулируем успешную авторизацию
      if (credentials.login && credentials.password) {
        const user: User = {
          id: '1',
          login: credentials.login,
          email: `${credentials.login}@example.com`
        };
        
        set({ 
          user, 
          isAuthenticated: true, 
          isLoading: false,
          error: null 
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
        user: null,
        isAuthenticated: false
      });
    }
  },

  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false, 
      error: null 
    });
  },

  clearError: () => {
    set({ error: null });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  }
}));