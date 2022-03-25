// @ts-nocheck
import Satar from "components/Satar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIfTranslationExist,
  putExistingToLast,
  reviver,
} from "../../engines/azaaf";
import cheerio from "cheerio";
import {
  performMS1,
  performMS2,
  performQeemat,
  updateTranslations,
  resetTranslations,
} from "state/azaafSlice";
import Select from "react-select";
import "./Mustehsila.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chip, Card } from "ui-neumorphism";

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

  const getDataFromUrl = (wordx, index) => {
    if (!checkIfTranslationExist(wordx, translations)) {
      axios
        .get(`http://localhost:8010/proxy` + `?search=` + wordx)
        .then((res) => {
          const $ = cheerio.load(res.data);
          const data = $(".para");
          const translations = data.text().split(" ، ");
          dispatch(
            updateTranslations({
              word: wordx,
              translation: translations,
              index: index,
            })
          );
        })
        .catch((error) => {
          notify(error);
        });
    } else {
      const swappedTranslations = putExistingToLast(wordx, translations);
      dispatch(resetTranslations(swappedTranslations));
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
        {results[0].length > 0 ? (
          results.map((wordsArr, keyArr) => {
            return (
              <Card
                key={JSON.stringify(keyArr)}
                width={300}
                minWidth={300}
                minHeight={250}
                height={250}
                style={{
                  marginLeft: "10px",
                  padding: "10px",
                  overflowY: "scroll",
                }}
              >
                {wordsArr.map((word, keyWord) => {
                  return (
                    <Chip
                      key={JSON.stringify(keyWord)}
                      style={{
                        fontFamily: "noori",
                        fontSize: "30px",
                        marginLeft: "10px",
                        marginBottom: "10px",
                        height: "auto",
                        width: "auto",
                      }}
                      action={<p>{word.value}</p>}
                      onAction={(action) => {
                        getDataFromUrl(action.target.innerText, keyArr);
                      }}
                    ></Chip>
                  );
                })}
              </Card>
            );
          })
        ) : (
          <div style={{ height: "250px" }}></div>
        )}
      </div>
    </div>
  );
};

export default Mustehsila;
