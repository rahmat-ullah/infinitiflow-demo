import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isAdminMode: boolean;
  logoClickCount: number;
  lastClickTime: number;
  setAdminMode: (value: boolean) => void;
  incrementLogoClick: () => void;
  resetLogoClick: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAdminMode: false,
      logoClickCount: 0,
      lastClickTime: 0,
      setAdminMode: (value) => set({ isAdminMode: value }),
      incrementLogoClick: () => {
        const currentTime = Date.now();
        const { logoClickCount, lastClickTime } = get();
        
        // Reset count if more than 3 seconds have passed
        if (currentTime - lastClickTime > 3000) {
          set({ logoClickCount: 1, lastClickTime: currentTime });
          return;
        }
        
        const newCount = logoClickCount + 1;
        set({ 
          logoClickCount: newCount, 
          lastClickTime: currentTime,
          isAdminMode: newCount === 5 ? true : false
        });
        
        // Reset after successful activation
        if (newCount === 5) {
          setTimeout(() => {
            set({ logoClickCount: 0 });
          }, 300);
        }
      },
      resetLogoClick: () => set({ logoClickCount: 0, lastClickTime: 0 }),
    }),
    {
      name: 'admin-storage',
    }
  )
);