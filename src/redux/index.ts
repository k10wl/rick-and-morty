import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filters, { ApiFilterType } from "./filters";
import pages, { PagesStateType } from "./pages";
import names, { NamesType } from "./names";

export type DefaultRootState = {
  filters: ApiFilterType;
  pages: PagesStateType;
  names: NamesType;
};

const reducer = combineReducers({
  filters: filters.reducer,
  pages: pages.reducer,
  names: names.reducer,
});

export default configureStore({
  reducer,
});
