import { create } from 'zustand';
import { SettingsSlice, createSettingsSlice } from './settings-slice';

const useBoundStore = create<SettingsSlice>()((...a) => ({
  ...createSettingsSlice(...a),
}));

export default useBoundStore;
