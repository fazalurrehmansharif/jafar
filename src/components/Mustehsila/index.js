import Satar from "components/Satar";
import { findWords, findWords2 } from "engines/azaaf";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cheerio from "cheerio";
import {
  performMS1,
  performMS2,
  performQeemat,
  setLoading,
} from "state/azaafSlice";
import Select from "react-select";
import "./Mustehsila.css";
import axios from "axios";

const Mustehsila = () => {
  // @ts-ignore
  const { huruf, qeemat, muakharSadar1, muakharSadar2, results } = useSelector(
    (state) => state
  );
  // @ts-ignore
  const dispatch = useDispatch();

  const translationMap = new Map();

  useEffect(() => {
    dispatch(performQeemat(huruf));
  }, [huruf]);

  useEffect(() => {
    dispatch(performMS1(qeemat));
  }, [qeemat]);

  useEffect(() => {
    dispatch(performMS2(muakharSadar1));
  }, [muakharSadar1]);

  const getDataFromUrl = (word) => {
    if (translationMap.has(word)) {
      console.log(translationMap.get(word));
    } else {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://udb.gov.pk/result.php?search=` +
            word
        )
        .then((res) => {
          const $ = cheerio.load(res.data);
          const data = $(".para");
          const translations = data.text().split(" ، ");
          translationMap.set(word, translations);
          console.log(translations);
        });
    }
  };

  return (
    <div className="mustehsila-body">
      <Satar isSawal={true}></Satar>
      <Satar
        isSawal={false}
        huruf={huruf ? huruf : ""}
        satarName="اساس"
      ></Satar>
      <Satar
        isSawal={false}
        huruf={qeemat ? qeemat : ""}
        satarName="قیمت"
      ></Satar>
      <Satar
        isSawal={false}
        huruf={muakharSadar1 ? muakharSadar1 : ""}
        satarName="موخر صدر "
      ></Satar>
      <Satar
        isSawal={false}
        huruf={muakharSadar2 ? muakharSadar2 : ""}
        satarName="موخر صدر "
      ></Satar>
      <div className="result-holder">
        {results.map((value, index) => {
          return (
            <Select
              className="react-select"
              options={value}
              key={JSON.stringify(value)}
              defaultValue={{ label: "Select Word", value: 0 }}
              onChange={(e) => {
                getDataFromUrl(e.value);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Mustehsila;
