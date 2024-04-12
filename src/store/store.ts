import { create } from 'zustand';
import { SettingsSlice, createSettingsSlice } from './settings-slice';
import { persist, createJSONStorage } from 'zustand/middleware';

const useBoundStore = create<SettingsSlice>()(
  persist(
    (...a) => ({
      ...createSettingsSlice(...a),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBoundStore;
