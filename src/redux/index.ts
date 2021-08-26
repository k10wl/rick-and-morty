import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filters from "./filters";
import pages from "./pages";

const reducer = combineReducers({
  filters: filters.reducer,
  pages: pages.reducer,
});

export default configureStore({
  reducer,
});
