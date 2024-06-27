import React from "react";
import style from "./FormLayout.module.css";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
export default function FormLayout() {
  return (
    <section
      className={
        style.forms +
        " bg-dark  d-flex justify-content-center align-items-center vh-100"
      }
    >
      <div className={style.layer}>
        <Outlet />
      </div>
      <Footer/>
    </section>
  );
}
