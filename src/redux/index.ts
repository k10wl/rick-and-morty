import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filters from "./filters";

const reducer = combineReducers({
  filters: filters.reducer,
});

export default configureStore({
  reducer,
});
