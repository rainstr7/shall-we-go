import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  
  login: (user) => set({ 
    currentUser: user, 
    isAuthenticated: true 
  }),
  
  logout: () => set({ 
    currentUser: null, 
    isAuthenticated: false 
  }),
}));
