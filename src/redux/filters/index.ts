import { createSlice } from "@reduxjs/toolkit";

const characters = createSlice({
  name: "apiFilter",
  initialState: {
    characters: {
      species: [],
      status: [],
      gender: [],
    },
    locations: {
      type: [],
      dimension: [],
    },
  },
  reducers: {
    addFilter: (state, action) => ({
      ...state,
      [action.payload.filter]: action.payload.data,
    }),
  },
});

export default characters;

export const { addFilter } = characters.actions;
