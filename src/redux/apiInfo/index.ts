import { createSlice } from "@reduxjs/toolkit";

const apiInfo = createSlice({
  name: "apiInfo",
  initialState: {
    characters: {
      pages: 0,
    },
    locations: {
      pages: 0,
    },
  },
  reducers: {
    storePageInfo: (state, action) => ({
      ...state,
      [action.payload.category]: action.payload.count,
    }),
  },
});

export default apiInfo;

export const { storePageInfo } = apiInfo.actions;
