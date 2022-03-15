import Satar from "components/Satar";
import { findWords, findWords2 } from "engines/azaaf";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performMS1, performMS2, performQeemat } from "state/azaafSlice";
import Select from "react-select";
import "./Mustehsila.css";

const Mustehsila = () => {
  // @ts-ignore
  const { huruf, qeemat, muakharSadar1, muakharSadar2 } = useSelector(
    (state) => state
  );
  // @ts-ignore
  var chunkLength = 3;
  const dispatch = useDispatch();

  const [results, setResults] = useState([[]]);

  useEffect(() => {
    dispatch(performQeemat(huruf));
  }, [huruf]);

  useEffect(() => {
    dispatch(performMS1(qeemat));
  }, [qeemat]);

  useEffect(() => {
    dispatch(performMS2(muakharSadar1));
  }, [muakharSadar1]);

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
      <div>
        <button
          // @ts-ignore
          onClick={(e) =>
            // findWords(muakharSadar2, chunkLength, false, (result) => {
            //   setResults([[]]);
            //   setResults(result);
            // })
            findWords2(muakharSadar2, chunkLength, (result) => {
              // setResults([[]]);
              setResults(result);
            })
          }
        >
          FIND ANSWER
        </button>
        <span>|_____|</span>
        <label>Word Split </label>
        <select
          name="chunklength"
          id="chunklength"
          defaultValue={7}
          onChange={(e) => {
            chunkLength = parseInt(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div>
      <div className="result-holder">
        {results.map((value, index) => {
          return (
            <Select className="react-select" options={value} key={index} />
          );
        })}
      </div>
    </div>
  );
};

export default Mustehsila;
