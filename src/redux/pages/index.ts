import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  category: string;
  page: string;
  pageData: any[];
};

const initialState = {
  characters: {},
  locations: {},
  episodes: {},
};

const pages = createSlice({
  name: "pages",
  initialState,
  reducers: {
    storePages: (state, action: PayloadAction<Payload>) => ({
      ...state,
      [action.payload.category]: {
        ...[action.payload.category],
        [action.payload.page]: action.payload.pageData,
      },
    }),
  },
});

export default pages;

export const { storePages } = pages.actions;
