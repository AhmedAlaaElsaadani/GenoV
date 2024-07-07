import React, { useEffect, useRef, useState } from "react";
import CommonBackground from "../CommonBackgroundLayer/CommonBackground.jsx";
import style from "./PreCalc.module.css";
import ApiManager from "../../Utilies/ApiManager.js";
import PopDetails from "../PopDetails/PopDetails.jsx";
import { useFormik } from "formik";
export default function PreCalc() {
  const [proteinArray, setProteinArray] = useState(null);
  const [isPopDetailsOpen, setIsPopDetailsOpen] = useState(false);
  const [chosenProteinIndex, setChosenProteinIndex] = useState(null);
  const [proteinId, setProteinId] = useState(null);
  const [chainId, setChainId] = useState(null);
  const chainInput = useRef(null);

  // get data from api
  const getData = async () => {
    try {
      let { data } = await ApiManager.getPreCalc("");
      setProteinArray(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  // open details pop up
  const openDetails = (index) => {
    setIsPopDetailsOpen(true);
    setChosenProteinIndex(index);
  };
  // get data on component mount
  useEffect(() => {
    getData();
  }, []);
  // search using Api
  const search = async () => {
    setProteinArray(null);
    try {
      let { data } = await ApiManager.getPreCalc(
        `ChainId=${chainId == null ? "" : chainId}&PId=${
          proteinId == null ? "" : proteinId
        }`
      );
      setProteinArray(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const formObject = useFormik({
    initialValues: {
      proteinId: "",
      chainId: "",
    },
    onSubmit: (values) => {
      search();
    },
  });
  return (
    <CommonBackground>
      <section className={style.PreCalc + " mt-3 w-100 pb-5 position-relative"}>
        <div className={"container rounded-5 overflow-auto p-2  " + style.bg}>
          <form onSubmit={formObject.handleSubmit} className="row my-4 ">
            <div className="col-sm-12 m-auto position-relative d-flex">
              <div
                className={
                  "position-relative inputs-group  m-auto " +
                  style.searchContainer
                }
              >
                <input
                  type="text"
                  className={style["search-input"]}
                  onChange={(e) => {
                    setProteinId(e.target.value);
                    chainInput.current.value = "";
                  }}
                  onBlur={(e) => {
                    setProteinId(e.target.value);
                    chainInput.current.value = "";
                  }}
                  placeholder="Search by Protein Id"
                />
                <button
                  className="btn btn-outline-warning ms-2 text-white position-absolute top-100 start-100 translate-middle-y"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search  "
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-12 test position-relative">
              <div
                className={
                  "position-relative inputs-group  m-auto " +
                  style.searchContainer
                }
              >
                <input
                  type="text"
                  className={style["search-input"]}
                  onChange={(e) => setChainId(e.target.value)}
                  onBlur={(e) => setChainId(e.target.value)}
                  placeholder="Search by Chain Id"
                  ref={chainInput}
                />

              </div>
            </div>
          </form>
          <div className="row">
            <div className={"col-12 p-0  " + style["table-container"]}>
              <table className="table-responsive">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Protein Id</th>
                    <th>chain Id</th>
                    <th>No. Binding Sites</th>
                    <th>No. amino acides</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {proteinArray ? (
                    proteinArray.length > 0 ? (
                      proteinArray.map((protein, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{protein.pdbId}</td>
                          <td>{protein.chainId}</td>
                          <td>{protein.bindingSites.length}</td>
                          <td>{protein.noAminoAcids}</td>
                          <td>
                            <button
                              className={"form-button " + style.buttonDetails}
                              onClick={() => openDetails(index)}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Data Found
                        </td>
                      </tr>
                    )
                  ) : (
                    // loading tabel  palceholder bootstrap
                    Array(8)
                      .fill(0)
                      .map((_, index) => (
                        <tr key={index} className=" placeholder-glow">
                          <td>{index + 1}</td>
                          <td>
                            <span className="placeholder col-12"></span>
                          </td>
                          <td>
                            <span className="placeholder col-12"></span>
                          </td>
                          <td>
                            <span className="placeholder col-12"></span>
                          </td>
                          <td>
                            <span className="placeholder col-12"></span>
                          </td>
                          <td>
                            <span className="placeholder col-12 bg-warning"></span>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isPopDetailsOpen && (
          <PopDetails
            setIsPopDetailsOpen={setIsPopDetailsOpen}
            protein={proteinArray[chosenProteinIndex]}
          />
        )}
      </section>
    </CommonBackground>
  );
}
