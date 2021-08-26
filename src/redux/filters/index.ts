import { createSlice } from "@reduxjs/toolkit";

export type ApiFilterType = {
  characters: {
    [key: string]: string[];
    species: string[];
    status: string[];
    gender: string[];
  };
  locations: {
    [key: string]: string[];
    type: string[];
    dimension: string[];
  };
};

const initialState: ApiFilterType = {
  characters: {
    species: [],
    status: [],
    gender: [],
  },
  locations: {
    type: [],
    dimension: [],
  },
};

const characters = createSlice({
  name: "apiFilter",
  initialState,
  reducers: {
    addFilter: (state, action) => ({
      ...state,
      [action.payload.filter]: action.payload.data,
    }),
  },
});

export default characters;

export const { addFilter } = characters.actions;
