import React, { useContext, useEffect, useRef } from "react";
import style from "./PopDetails.module.css";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/authContext";
export default function PopDetails({ setIsPopDetailsOpen, protein }) {
  const popupRef = useRef(null);
  const{isRegistered}=useContext(authContext);

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
// change the navbar style when the user clicks on the more details button
const changeNavbarStyle = () => {
  document
    .getElementById("ourServices")
    .classList.add("selectedNavElement");
  document.getElementById("PreCalc").classList.remove("selectedNavElement");
};
  return (
    <div className={style.layer} onClick={closePopUp}>
      {" "}
      <div className={style.PopDetails} ref={popupRef}>
        <h3>Protein ID: {protein.pdbId}</h3>
        <div className={style["table-container"]}>
          <table className="table-responsive">
            <thead>
              <tr>
                <th>Acid Name</th>
                <th>Position</th>
                <th>Ratio</th>
              </tr>
            </thead>
            <tbody>
              {protein?.bindingSites?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.aminoAcidName}</td>
                    <td>{item.position}</td>
                    <td>{item.ratio}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {
            isRegistered ? (
              <Link to="/ourServices" onClick={changeNavbarStyle} state={{
                proteinId: protein.pdbId,
                chainId: protein.chainId,
              }}  className={style["link"]}>
                More Details
              </Link>
            ) : (
              <Link to="/accounts/login" className={style["link"]}>
                More Details
              </Link>
            )
        }
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
