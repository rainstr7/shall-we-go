import { create } from 'zustand';

interface UIState {
  isHydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isHydrated: false,
  setHydrated: (hydrated) => set({ isHydrated: hydrated }),
}));
