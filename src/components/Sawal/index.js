import { bastHurfi } from "engines/azaaf";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { performKhalis, performBast, setSawalStr } from "state/azaafSlice";
import "./Sawal.css";
import { TextField } from "ui-neumorphism";
const Sawal = (props) => {
  // @ts-ignore
  const { isKhalis } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <TextField
      width={1500}
      height={70}
      style={{ marginTop: 20, marginRight: 0 }}
      inputStyles={{
        fontFamily: "noori-kashida",
        fontSize: "40px",
      }}
      onChange={(e) => {
        dispatch(setSawalStr(e.value.replace(/\s/g, "")));
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
