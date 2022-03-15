import { configureStore } from "@reduxjs/toolkit";
import azaafReducer from "./azaafSlice";

export default configureStore({
  reducer: { azaaf: azaafReducer },
});
