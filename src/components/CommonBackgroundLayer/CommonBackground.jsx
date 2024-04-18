import React from "react";
import style from "./CommonBackground.module.css";
export default function CommonBackground({ children }) {
  return (
    <section className={style.CommonBackground}>
      <div className={style.layer}>{children}</div>
    </section>
  );
}
