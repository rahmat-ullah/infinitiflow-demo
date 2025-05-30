import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  initTheme: () => void;
}

const updateDOMAndLocalStorage = (theme: Theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light', // Default theme
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    updateDOMAndLocalStorage(newTheme);
  },
  initTheme: () => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme = storedTheme || 'light';
    set({ theme: initialTheme });
    updateDOMAndLocalStorage(initialTheme);
  },
}));
