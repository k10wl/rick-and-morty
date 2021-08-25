import { createSlice } from "@reduxjs/toolkit";

const characters = createSlice({
  name: "charactersFilter",
  initialState: {
    characters: {
      species: [],
      status: [],
      gender: [],
    },
    planets: {
      type: [],
      dimension: [],
    },
  },
  reducers: {
    addCharactersFilter: (state, action) => ({
      ...state,
      characters: {
        ...state.characters,
        [action.payload.filter]: action.payload.data,
      },
    }),
    addPlanetsFilter: (state, action) => ({
      ...state,
      planets: {
        ...state.planets,
        [action.payload.filter]: action.payload.data,
      },
    }),
  },
});

export default characters;

export const { addCharactersFilter, addPlanetsFilter } = characters.actions;
