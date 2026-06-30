import { SelectedObj } from '@/interface/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Record<string, SelectedObj> = {}

const defaultObj: SelectedObj = {
  showView: false,
  showForm: false,
  showEdit: false,
  showDelete: false,
  keys: {},
  primaryKeys: {},
  label: '',
  isOpen: false,  
};

interface SetInfoPayload {
  keys?: Record<string, unknown>;
  primaryKeys: Record<string, unknown>;
  label: string;
  objKey: string;
}
interface SetFormPayload {
	keys?: Record<string, unknown>;
	objKey: string;
  }

export interface SetSelectedObjPayload<T = unknown> {
  objKey: string;
  mode: string;
  label: string;
  primaryKeys?: Record<string, unknown>;
  keys?: Record<string, unknown>;
  data?: T;
}

const setInfo = (state: Record<string, SelectedObj>, action: PayloadAction<SetInfoPayload>, viewType: 'showView' | 'showEdit' | 'showDelete'| 'showForm') => {
  state[action.payload.objKey] = {
    ...defaultObj,
    [viewType]: true,
    keys: action.payload.keys || {},
	  primaryKeys: action.payload.primaryKeys,
    label: action.payload.label,
  };
};

const selectedObjSlice = createSlice({
  name: 'selectedObj',
  initialState,
  reducers: {
    updateSelectedObj(_state: Record<string, SelectedObj>, action: PayloadAction<Record<string, SelectedObj>>) {
      return action.payload;
    },
    setForView(state: Record<string, SelectedObj>, action: PayloadAction<SetInfoPayload>) {
      setInfo(state, action, 'showView');
    },
    setForEdit(state: Record<string, SelectedObj>, action: PayloadAction<SetInfoPayload>) {
      setInfo(state, action, 'showEdit');
    },
    setForDelete(state: Record<string, SelectedObj>, action: PayloadAction<SetInfoPayload>) {
      setInfo(state, action, 'showDelete');
    },	
    openNewForm(state: Record<string, SelectedObj>, action: PayloadAction<SetFormPayload>) {
          state[action.payload.objKey] = {
            ...defaultObj,
            showForm: true,
            keys: action.payload.keys || {},
            };
	  },
    resetSelectedObj(state: Record<string, SelectedObj>, action: PayloadAction<string>) {
      delete state[action.payload];
    },
    setSelectedObj(state, action: PayloadAction<SetSelectedObjPayload>) {
      const { objKey, mode, label, primaryKeys, keys, data } = action.payload;

      state[objKey] = {
        ...defaultObj,
        isOpen: true,
        mode,
        primaryKeys: primaryKeys || {},
        label,
        keys: keys || {},
        data,
      };
    },
    clearAllSelectedObj() {
      return initialState;
    },
  },
});

export const {  resetSelectedObj, setForView, setForEdit, setForDelete, openNewForm, updateSelectedObj, setSelectedObj, clearAllSelectedObj } = selectedObjSlice.actions;

export const selectSelectedObjByKey = (state: { selectedObj: Record<string, SelectedObj> }, key: string) =>
  state.selectedObj[key];

export default selectedObjSlice.reducer;