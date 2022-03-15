import App from "App";
import React from "react";
import ReactDOM from "react-dom";
import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
  Provider,
} from "react-redux";
import { createStore } from "redux";
import azaafSlice from "state/azaafSlice";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const myStore = createStore(azaafSlice);

ReactDOM.render(
  <Provider store={myStore}>
    <App></App>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
