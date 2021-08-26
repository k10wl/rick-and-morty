import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NamesType = any;

const initialState = [] as NamesType;

const names = createSlice({
  name: "names",
  initialState,
  reducers: {
    setNames: (state: CaseReducer<string>, action: PayloadAction<any>) => [
      ...action.payload,
    ],
  },
});

export default names;

export const { setNames } = names.actions;
