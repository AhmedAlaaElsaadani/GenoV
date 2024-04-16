import React from "react";
import style from "./FormLayout.module.css";
import { Outlet } from "react-router-dom";
export default function FormLayout() {
  return (
    <section
      className={
        style.forms +
        " bg-dark vh-100 d-flex justify-content-center align-items-center vh-100"
      }
    >
      <div className={style.layer}>
<Outlet/>
      </div>
    </section>
  );
}
