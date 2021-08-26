import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filters, { ApiFilterType } from "./filters";
import pages, { PagesStateType } from "./pages";

export type DefaultRootState = {
  filters: ApiFilterType;
  pages: PagesStateType;
};

const reducer = combineReducers({
  filters: filters.reducer,
  pages: pages.reducer,
});

export default configureStore({
  reducer,
});
