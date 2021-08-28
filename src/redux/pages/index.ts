import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, Episode, Location } from "../../types";

type Payload = {
  category: string;
  pageData: Character[] | Location[] | Episode[];
};

export type PagesStateType = {
  [k: string]: any;
  characters: Character[];
  locations: Location[];
  episodes: Episode[];
};

const initialState: PagesStateType = {
  characters: [],
  locations: [],
  episodes: [],
};

const pages = createSlice({
  name: "pages",
  initialState,
  reducers: {
    // @ts-ignore
    storePages: (state, action: PayloadAction<Payload>) => ({
      ...state,
      [action.payload.category]: action.payload.pageData,
    }),
  },
});

export default pages;

export const { storePages } = pages.actions;
