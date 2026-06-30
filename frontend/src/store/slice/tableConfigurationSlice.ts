import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Record<string, Record<string, unknown>> = {};

const tableConfigurationSlice = createSlice({
  name: 'tableConfiguration',
  initialState,
  reducers: {
    setTableConfiguration(state, action: PayloadAction<{ name: string; data: Record<string, unknown> }>) {
      state[action.payload.name] = action.payload.data;
      return state;
    },
    updateTableSetting(state, action: PayloadAction<{ name: string; setting: string; value: unknown }>) {
      if (state[action.payload.name]) {
        state[action.payload.name][action.payload.setting] = action.payload.value;
      }
      return state;
    },
  },
});

export const { setTableConfiguration, updateTableSetting } = tableConfigurationSlice.actions;

export default tableConfigurationSlice.reducer;
