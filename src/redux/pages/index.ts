import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, Episode, Location } from "../../types";

type Payload = {
  category: string;
  pageData: Character[][] | Location[][] | Episode[][];
};

type InitialStateType = {
  [k: string]: any;
  characters: Character[][];
  locations: Location[][];
  episodes: Episode[][];
};

const initialState: InitialStateType = {
  characters: [],
  locations: [],
  episodes: [],
};

const pages = createSlice({
  name: "pages",
  initialState,
  reducers: {
    storePages: (state, action: PayloadAction<Payload>) => ({
      ...state,
      [action.payload.category]: [
        ...state[action.payload.category],
        action.payload.pageData,
      ],
    }),
  },
});

export default pages;

export const { storePages } = pages.actions;
