import { StateCreator } from 'zustand';

export interface SettingsSlice {
  isBlind: boolean;
  setBlind: () => void;
}

export const createSettingsSlice: StateCreator<
  SettingsSlice,
  [],
  [],
  SettingsSlice
> = (set) => ({
  isBlind: false,
  setBlind: () => {
    set((state) => ({
      ...state,
      isBlind: !state.isBlind,
    }));
  },
});
