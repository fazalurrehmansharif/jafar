// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Card, H4 } from "ui-neumorphism";
import "./Translations.css";
const TagsBox = (props) => {
  const { values } = props;
  return (
    <div className="tags-box-container">
      <Card style={{ width: "98%" }}>
        <H4 style={{ textAlign: "center" }}>{values.word}</H4>
      </Card>
      <div className="tags-container">
        {values.translation.map((value, index) => {
          return (
            <p className="tag" key={index}>
              {value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default TagsBox;
