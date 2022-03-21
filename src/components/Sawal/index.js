import { bastHurfi } from "engines/azaaf";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { performKhalis, performBast, setSawalStr } from "state/azaafSlice";
import "./Sawal.css";
const Sawal = (props) => {
  // @ts-ignore
  const { isKhalis } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      className="sawal-body"
      onChange={(e) => {
        dispatch(setSawalStr(e.target.value.replace(/\s/g, "")));
        if (isKhalis) {
          dispatch(performKhalis());
        } else {
          dispatch(performBast());
        }
      }}
    />
  );
};

export default Sawal;
