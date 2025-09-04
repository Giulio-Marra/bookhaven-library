import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import menuReducer from "./reducers/menuReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
