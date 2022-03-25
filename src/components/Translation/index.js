// @ts-nocheck
import React, { useEffect, useState } from "react";
import TagsBox from "./TagsBox";
import "./Translations.css";
import { useSelector } from "react-redux";
import { getOnSameIndex } from "engines/azaaf";
import { Card } from "ui-neumorphism";
const Translations = () => {
  const { translations } = useSelector((state) => state);

  return (
    <div className="translations-body">
      <Card className="tags-box-root">
        {getOnSameIndex(translations).map((value, index) => {
          return <TagsBox key={index} values={value}></TagsBox>;
        })}
      </Card>
    </div>
  );
};

export default Translations;
