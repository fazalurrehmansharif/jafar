// @ts-nocheck
import React, { useEffect, useState } from "react";
import "./Translations.css";
const TagsBox = (props) => {
  const { values } = props;
  return (
    <div className="tags-box-container">
      <p className="tags-box-title">{values.word}</p>
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
