import { createSlice } from "@reduxjs/toolkit";
// @ts-ignore
import { bastHurfi, khalis, muakharSadar, qeemat } from "engines/azaaf";

export const azaafSlice = createSlice({
  name: "azaaf",
  initialState: {
    loading: false,
    isKhalis: false,
    sawalStr: "",
    huruf: [],
    qeemat: [],
    muakharSadar1: [],
    muakharSadar2: [],
    chunkLength: 3,
    results: [[]],
    translations: [],
  },
  reducers: {
    setSawalStr(state, action) {
      state.sawalStr = action.payload;
    },
    setKhalis(state, action) {
      state.isKhalis = !state.isKhalis;
    },
    setLoading(state, action) {
      state.loading = !state.loading;
    },
    performKhalis(state, action) {
      state.huruf = khalis(bastHurfi(state.sawalStr));
    },
    performBast(state, action) {
      state.huruf = bastHurfi(state.sawalStr);
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
    setChunkLength(state, length) {
      state.chunkLength = length.payload;
    },
    setResults(state, results) {
      state.results = results.payload;
    },
    updateTranslations(state, action) {
      state.translations.push(action.payload);
    },
    resetTranslations(state, action) {
      state.translations = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// @ts-ignore
export const {
  setSawalStr,
  setKhalis,
  performBast,
  performKhalis,
  performQeemat,
  performMS1,
  performMS2,
  setLoading,
  setChunkLength,
  setResults,
  updateTranslations,
  resetTranslations,
} = azaafSlice.actions;

export default azaafSlice.reducer;
