import Mustehsila from "components/Mustehsila";
import { findWords2 } from "engines/azaaf";
import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
// @ts-ignore
import { setLoading, setChunkLength, setResults } from "state/azaafSlice";
import "./App.css";

function App() {
  const loadingMesg = "Calculating please wait";

  // @ts-ignore
  const { loading, chunkLength, muakharSadar2 } = useSelector((state) => state);
  // @ts-ignore
  const dispatch = useDispatch();

  const chunkOptions = [
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
  ];

  return (
    <LoadingOverlay active={loading} spinner text={loadingMesg}>
      <div className="App">
        <nav>
          <p className="title">مستحصلہ جفر اضعاف</p>
          <div className="options-container">
            <p className="chunk-title">الفاظ کا چنائو</p>
            <Select
              id="chunk-selector"
              className="react-select"
              options={chunkOptions}
              defaultValue={{ label: chunkLength, value: chunkLength }}
              onChange={(e) => {
                dispatch(setChunkLength(e.value));
              }}
            />
          </div>
          <div className="options-container">
            <button
              className="jawab-button" // @ts-ignore
              onClick={(e) => {
                dispatch(setLoading());
                findWords2(muakharSadar2, chunkLength, (result) => {
                  dispatch(setResults(result));
                  dispatch(setLoading());
                });
              }}
            >
              جواب
            </button>
          </div>
        </nav>
        <Mustehsila></Mustehsila>
      </div>
      <div className="translations-container"></div>
    </LoadingOverlay>
  );
}

export default App;
