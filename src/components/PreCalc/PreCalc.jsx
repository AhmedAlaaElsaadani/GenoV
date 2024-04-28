import React, { useState } from "react";
import CommonBackground from "../CommonBackgroundLayer/CommonBackground.jsx";
import style from "./PreCalc.module.css";
export default function PreCalc() {
  const [proteinArray, setProteinArray] = useState([
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
    {
      proteinId: "1UPQ",
      proteinName: "Crystal structure of the pleckstrin homology ",
      bindingSites: 100,
      aminoAcids: 100,
    },
  ]);
  return (
    <CommonBackground>
      <style>
        {`
            
input::placeholder{
    color: var(--whiteToBlack);
}
            `}
      </style>
      {/* 363636 */}
      <section className={style.PreCalc + " mt-3 w-100 pb-5"}>
        <div className={"container rounded-5 overflow-auto  " + style.bg}>
          <div className="row my-4 ">
            <div className="col-12 test position-relative">
              <div className="position-relative inputs-group  m-auto w-50">
              <input
                type="text"
                className="form-control form-control-lg bg-dark text-white placeholder-lg border border-warning"
                placeholder="Search by Protein Id"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search text-white position-absolute top-50 end-0 translate-middle"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 p-0 ">
              <table className="table-responsive">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Protein Id</th>
                    <th>Protein Name</th>
                    <th>No. Binding Sites</th>
                    <th>No. amino acides</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {proteinArray.map((protein, index) => (
                    <tr>
                      <td>{index}</td>
                      <td>{protein.proteinId}</td>
                      <td>{protein.proteinName}</td>
                      <td>{protein.bindingSites}</td>
                      <td>{protein.aminoAcids}</td>
                      <td>
                        <button className="btn btn-warning text-white">
                          {" "}
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </CommonBackground>
  );
}
