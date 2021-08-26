import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [],
  locations: [],
  episodes: [],
};

const pages = createSlice({
  name: "pages",
  initialState,
  reducers: {
    storePages: (state, action) => ({
      ...state,
      [action.payload.category]: [
        // @ts-ignore
        ...state[action.payload.category],
        action.payload.pageData,
      ],
    }),
  },
});

export default pages;

export const { storePages } = pages.actions;
