import React from "react";
import { motion } from "framer-motion";
import style from "./Docs.module.css";
import CommonBackground from "../CommonBackgroundLayer/CommonBackground.jsx";
import DocsImage from "../../assets/Images/Docs.png";

export default function Docs() {
  return (
    <CommonBackground>
      <section className={style.Docs}>
        <div className="container g-2">
          <div className="row">
            <motion.div
              className={style.image + " col-lg-6"}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={DocsImage}
                className="w-100 h-100"
                alt="cartoon scientist Image"
              />
            </motion.div>
            <motion.div
              className={"col-lg-6 " + style.text}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className={style.bgText}>
                <p>
                  Proteins are complex bio-molecules, carry diverse cellular
                  processes like metabolism, DNA replication, and immunity. To
                  achieve these functions, they must interact with other
                  molecules, one of these interactions are protein-protein
                  interactions (PPIs).
                  <br />
                  <br />
                  Accurate identification of these interaction sites, where
                  proteins exactly connect with each other is essential for
                  understanding protein function and developing new drugs, such
                  as antibiotics. Traditionally, experimental methods like
                  affinity purification and two-hybrid screening have been used,
                  but these are resource-intensive and time-consuming.
                  Therefore, developing accurate computational tools for
                  predicting protein binding sites is vital. The recent success
                  of artificial intelligence in solving various biological
                  problems in genomics and proteomics suggests its potential for
                  handling this problem.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </CommonBackground>
  );
}
