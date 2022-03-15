import { createSlice } from "@reduxjs/toolkit";
// @ts-ignore
import { khalis, muakharSadar, qeemat } from "engines/azaaf";

export const azaafSlice = createSlice({
  name: "azaaf",
  initialState: {
    loading: false,
    huruf: [],
    qeemat: [],
    muakharSadar1: [],
    muakharSadar2: [],
  },
  reducers: {
    setLoading(state, action) {
      state.loading = !state.loading;
    },
    performKhalis(state, action) {
      state.huruf = khalis(action.payload);
    },
    performQeemat(state, action) {
      state.qeemat = qeemat(action.payload);
    },
    performMS1(state, action) {
      state.muakharSadar1 = muakharSadar(action.payload);
    },
    performMS2(state, action) {
      state.muakharSadar2 = muakharSadar(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
// @ts-ignore
export const {
  performKhalis,
  performQeemat,
  performMS1,
  performMS2,
  setLoading,
} = azaafSlice.actions;

export default azaafSlice.reducer;
