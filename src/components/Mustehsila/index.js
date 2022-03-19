// @ts-nocheck
import Satar from "components/Satar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkIfTranslationExist, reviver } from "../../engines/azaaf";
import cheerio from "cheerio";
import {
  performMS1,
  performMS2,
  performQeemat,
  updateTranslations,
} from "state/azaafSlice";
import Select from "react-select";
import "./Mustehsila.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mustehsila = () => {
  const { huruf, qeemat, muakharSadar1, muakharSadar2, results, translations } =
    useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(performQeemat(huruf));
  }, [huruf]);

  useEffect(() => {
    dispatch(performMS1(qeemat));
  }, [qeemat]);

  useEffect(() => {
    dispatch(performMS2(muakharSadar1));
  }, [muakharSadar1]);

  const notify = (error) => toast(error.message);

  const getDataFromUrl = (wordx) => {
    if (!checkIfTranslationExist(wordx, translations)) {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://udb.gov.pk/result.php?search=` +
            wordx
        )
        .then((res) => {
          const $ = cheerio.load(res.data);
          const data = $(".para");
          const translations = data.text().split(" ، ");
          dispatch(
            updateTranslations({ word: wordx, translation: translations })
          );
        })
        .catch((error) => {
          notify(error);
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
