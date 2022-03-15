import { bastHurfi } from "engines/azaaf";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { performKhalis, performQeemat } from "state/azaafSlice";
import "./Sawal.css";
const Sawal = (props) => {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      className="sawal"
      onChange={(e) => {
        dispatch(performKhalis(bastHurfi(e.target.value)));
      }}
    />
  );
};

export default Sawal;
