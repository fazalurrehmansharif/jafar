import Hurf from "components/Hurf";
import Sawal from "components/Sawal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Satar.css";

const Satar = (props) => {
  const { isSawal, satarName, huruf } = props;
  // @ts-ignore

  if (isSawal) {
    return (
      <div className="satar">
        <div className="satar-name">یا علیم</div>
        <Sawal></Sawal>
      </div>
    );
  } else if (huruf) {
    let hurufboxes = huruf.map((hurf, position) => {
      return <Hurf key={position} letter={hurf}></Hurf>;
    });

    return (
      <div className="satar">
        <div className="satar-name">{satarName}</div>
        <div className="satar-body">{hurufboxes}</div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Satar;
