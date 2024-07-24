import React, { useContext, useEffect, useRef } from "react";
import style from "./PopDetails.module.css";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/authContext";

export default function PopDetails({ setIsPopDetailsOpen, protein }) {
  const popupRef = useRef(null);
  const { isRegistered } = useContext(authContext);

  // Close the popup when the user presses the escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPopDetailsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle clicks on the overlay layer to close the popup
  const closePopUp = (e) => {
    if (e.target.classList.contains(style.layer)) {
      setIsPopDetailsOpen(false);
    }
  };

  // Change the navbar style when the user clicks on the more details button
  const changeNavbarStyle = () => {
    document.getElementById("ourServices").classList.add("selectedNavElement");
    document.getElementById("PreCalc").classList.remove("selectedNavElement");
    document.getElementById("History")?.classList?.remove("selectedNavElement");
  };

  // Convert table data to CSV and trigger download
  const downloadCSV = () => {
    const rows = [["Acid Name", "Position", "Ratio", "Binding"]]; // Table headers

    protein?.bindingSites?.forEach((item) => {
      rows.push([
        item.aminoAcidName,
        item.position,
        item.ratio,
        item.isBindingSite ? "Yes" : "No",
      ]);
    });

    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach((rowArray) => {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "protein_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={style.layer} onClick={closePopUp}>
      <div className={style.PopDetails} ref={popupRef}>
        <h3>Protein ID: {protein.pdbId}</h3>
        <div className={style["table-container"]}>
          <table className="table-responsive">
            <thead>
              <tr>
                <th>Acid Name</th>
                <th>Position</th>
                <th>Ratio</th>
                <th>Binding</th>
              </tr>
            </thead>
            <tbody>
              {protein?.bindingSites?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.aminoAcidName}</td>
                    <td>{item.position}</td>
                    <td>{item.ratio}</td>
                    <td
                      className={
                        item.isBindingSite ? "bg-success" : "bg-danger"
                      }
                    ></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {isRegistered ? (
          <Link
            to="/ourServices"
            onClick={changeNavbarStyle}
            state={{
              proteinId: protein.pdbId,
              chainId: protein.chainId,
            }}
            className={style["link"]}
          >
            More Details
          </Link>
        ) : (
          <Link to="/accounts/login" className={style["link"]}>
            More Details
          </Link>
        )}
        {/* Add the Download CSV button */}
        <button onClick={downloadCSV} className={style["download-button"]}>
          Download as CSV
        </button>
      </div>
      <button
        className={style["close-button"]}
        onClick={() => setIsPopDetailsOpen(false)}
      >
        X
      </button>
    </div>
  );
}
