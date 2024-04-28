import React from "react";
import style from "./About.module.css";
import CommonBackground from "../CommonBackgroundLayer/CommonBackground.jsx";
export default function About() {
  return (
    <CommonBackground>
    <section className={style.About}>
        <div className="container g-2">
          <div className="row ">
            <div className={"col-md-6 "}>
              <div className={style.bgText}>
              <p>
                Understanding how proteins interact with each other at specific
                sites is crucial for deciphering cellular functions. However,
                experimental methods for identifying these interaction sites are
                resource-intensive and time-consuming. This has driven extensive
                research into developing computational prediction tools. While
                structure-based approaches offer superior accuracy, their
                applicability is limited due to the vast imbalance between
                available protein sequences and structures. The ideal tool would
                combine the high accuracy of structure-based methods with the
                broader applicability of sequence-based methods. Our tool
                provides a solution for the problem as our model`s accuracy
                surpasses state-of-the-art sequence models utilizing structure
                information and evolutionary features.
              </p>
              </div>
            </div>
            <div className=" col-md-6">
              <img src="Images/About.png" className="w-100 h-100" alt="cartoon scientist Image " />
            </div>
          </div>
      </div>
    </section>
    </CommonBackground>
  );
}
