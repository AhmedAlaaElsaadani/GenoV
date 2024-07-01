import React from "react";
import style from "./Hero.module.css";
import { Link } from "react-router-dom";
export default function Hero() {
  const changeNavbarStyle = () => {
    
    document.getElementById("ourServices").classList.add("selectedNavElement");
    document.getElementById("home").classList.remove("selectedNavElement");
  }
  return (
    <section className={style.Hero}>
      <div className={style.layer}>
        <h1>Unleashing Discovery: PPI Analysis Redefined </h1>
        <p>
          Explore the Dynamic Realm of Protein-Protein Interaction with
          Cutting-Edge Tools
        </p>
        <Link
         to="/OurServices"
          className={style.button}
          onClick={changeNavbarStyle}
        
        >
          Try it now
        </Link>
      </div>
    </section>
  );
}
