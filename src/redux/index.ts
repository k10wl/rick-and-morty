import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filters from "./filters";
import apiInfo from "./apiInfo";

const reducer = combineReducers({
  filters: filters.reducer,
  apiInfo: apiInfo.reducer,
});

export default configureStore({
  reducer,
});
