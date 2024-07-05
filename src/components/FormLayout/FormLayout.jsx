import React from "react";
import style from "./FormLayout.module.css";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
export default function FormLayout() {
  return (
    <section className={style.forms}>
      <div className={style.layer}>
        <div className={"container  " + style.card}>
          <div className={"row "}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
