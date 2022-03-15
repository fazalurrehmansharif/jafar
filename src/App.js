import Mustehsila from "components/Mustehsila";
import React from "react";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const loadingMesg = "Calculating please wait";

  // @ts-ignore
  const { loading } = useSelector((state) => state);

  return (
    <LoadingOverlay active={loading} spinner text={loadingMesg}>
      <div className="App">
        <Mustehsila></Mustehsila>
      </div>
    </LoadingOverlay>
  );
}

export default App;
