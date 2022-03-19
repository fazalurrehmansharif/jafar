// @ts-nocheck
import React, { useEffect, useState } from "react";
import TagsBox from "./TagsBox";
import "./Translations.css";
import { useSelector } from "react-redux";
import { getOnSameIndex } from "engines/azaaf";
const Translations = () => {
  const { translations } = useSelector((state) => state);

  return (
    <div className="translations-body">
      <p className="translations-title">ترجمہ</p>
      <div className="tags-box-root">
        {getOnSameIndex(translations).map((value, index) => {
          return <TagsBox key={index} values={value}></TagsBox>;
        })}
      </div>
    </div>
  );
};

export default Translations;