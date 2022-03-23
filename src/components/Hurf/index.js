import React from "react";
import "./Hurf.css";
import { Card, H1, H2, Spacer } from "ui-neumorphism";

const Hurf = (props) => {
  return (
    <Card
      width={55}
      height={55}
      minWidth={55}
      style={{
        margin: 5,
        justifyContent: "center",
        fontFamily: "noori",
        fontSize: 30,
        textAlign: "center",
      }}
    >
      {props.letter}
    </Card>
  );
};

export default Hurf;
