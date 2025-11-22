import { useEffect } from 'react';
import { useUIStore } from '@/stores';

export const useHydration = () => {
  const { isHydrated, setHydrated } = useUIStore();

  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  return isHydrated;
};
