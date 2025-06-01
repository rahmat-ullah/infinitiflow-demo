import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isAdminMode: boolean;
  setAdminMode: (value: boolean) => void;
  // Potentially add a logout function here if desired, e.g.,
  // logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAdminMode: false,
      setAdminMode: (value) => set({ isAdminMode: value }),
      // logout: () => set({ isAdminMode: false }), // If adding logout
    }),
    {
      name: 'admin-storage',
    }
  )
);