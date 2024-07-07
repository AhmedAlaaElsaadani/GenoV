import React from "react";
import style from "./Hero.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Hero() {
  // change the navbar selected element when the user clicks on the button
  const changeNavbarStyle = () => {
    document.getElementById("ourServices").classList.add("selectedNavElement");
    document.getElementById("home").classList.remove("selectedNavElement");
  };
  return (
    <section className={style.Hero}>
      <div className={style.layer}>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Unleashing Discovery: PPI Analysis Redefined{" "}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Explore the Dynamic Realm of Protein-Protein Interaction with
          Cutting-Edge Tools
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
        <Link
          to="/OurServices"
          className={style.mainButton}
          onClick={changeNavbarStyle}
        >
            Try it now
        </Link>
          </motion.div>
      </div>
    </section>
  );
}
