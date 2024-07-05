import React, { useEffect, useState } from "react";
import CommonBackground from "../CommonBackgroundLayer/CommonBackground.jsx";
import style from "./PreCalc.module.css";
import ApiManager from "../../Utilies/ApiManager.js";
import PopDetails from "../PopDetails/PopDetails.jsx";
export default function PreCalc() {
  const [proteinArray, setProteinArray] = useState(null);
  const [isPopDetailsOpen, setIsPopDetailsOpen] = useState(false);
  const [chosenProteinIndex, setChosenProteinIndex] = useState(null);

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
  // search by protein id or chain id
  const handleOnChange=async(e)=>{
    let value=e.target.value;
    let searchResult=null;
    if (value.length<4) {
      let {data}=await ApiManager.getPreCalc(`ChainId=${value}&`)
      console.log("chainId");
      searchResult=data.data;
    }
    else{
      let {data}=await ApiManager.getPreCalc(`Pid=${value}&`)
      searchResult=data.data;
    }

    setProteinArray(searchResult);
    

  }
  return (
    <CommonBackground>
      <section className={style.PreCalc + " mt-3 w-100 pb-5 position-relative"}>
        <div className={"container rounded-5 overflow-auto  " + style.bg}>
          <div className="row my-4 ">
            <div className="col-12 test position-relative">
              <div className={"position-relative inputs-group  m-auto "+style.searchContainer}>
                <input
                  type="text"
                  className={style["search-input"]}
                  onChange={(e)=>handleOnChange(e)}
                  onBlur={(e)=>handleOnChange(e)}
                  placeholder="Search by Protein Id"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search text-white position-absolute top-50 end-0 translate-middle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </div>
            </div>
          </div>
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
                  {proteinArray
                    ? (
                      proteinArray.length > 0 ?(
                      proteinArray.map((protein, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{protein.pdbId}</td>
                          <td>{protein.chainId}</td>
                          <td>{protein.bindingSites.length}</td>
                          <td>{protein.noAminoAcids}</td>
                          <td>
                            <button
                              className={"form-button "+style.buttonDetails}
                              onClick={() =>
                                openDetails(index)
                              }
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      )
                    )
                    : // loading tabel  palceholder bootstrap
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
                        ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isPopDetailsOpen && (
          <PopDetails setIsPopDetailsOpen={setIsPopDetailsOpen} protein={proteinArray[chosenProteinIndex]} />
        )}
      </section>
    </CommonBackground>
  );
}
