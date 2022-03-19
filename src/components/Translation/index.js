// @ts-nocheck
import React, { useEffect, useState } from "react";
import TagsBox from "./TagsBox";
import "./Translations.css";

const Translations = () => {
  return (
    <div className="translations-body">
      <p className="translations-title">ترجمہ</p>
      <div className="tags-box-root">
        <TagsBox></TagsBox>
        <TagsBox></TagsBox>
        <TagsBox></TagsBox>
        <TagsBox></TagsBox>
        <TagsBox></TagsBox>
      </div>
    </div>
  );
};

export default Translations;
