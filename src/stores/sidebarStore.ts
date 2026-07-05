import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarStore {
  isCollapsed: boolean;
  _hasHydrated: boolean;
  toggle: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      _hasHydrated: false,
      toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: 'sidebar-state',
      partialize: (state) => ({ isCollapsed: state.isCollapsed }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
