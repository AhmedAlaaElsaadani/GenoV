import React from "react";
import Error from "../../assets/Images/Error.png";
import style from "./Error.module.css";
import { Link } from "react-router-dom";

export default function ErrorComp() {
  return (
    <div className={style.Error}>
      <div className={style.layer}>
        <img
          src={Error}
          alt="errorImage"
          
        />
      <Link to="/" className={style["link"]}>
        Back to Home
      </Link>
      </div>
    </div>
  );
}
