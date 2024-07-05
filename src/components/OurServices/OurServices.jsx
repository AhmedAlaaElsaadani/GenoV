import React from "react";
import CommonBackground from "../CommonBackgroundLayer/CommonBackground";
import MoleculeViewer from "../3dModalViewer/MoleculeViewer";
import style from "./OurServices.module.css";
import ChartView from "../ChartViewer/ChartView";
export default function OurServices() {
  const modelData = `
  ATOM      1  N   ASP A   1      38.928  46.332  10.889  1.00  0.00           N  
  ATOM      2  CA  ASP A   1      39.292  47.723  10.476  1.00  0.00           C  
  ATOM      3  C   ASP A   1      40.791  47.921  10.306  1.00  0.00           C  
  ATOM      4  O   ASP A   1      41.041  48.805   9.478  1.00  0.00           O  
  ATOM      5  CB  ASP A   1      38.495  48.722  11.354  1.00  0.00           C  
  ATOM      6  CG  ASP A   1      37.077  48.264  11.703  1.00  0.00           C  
  ATOM      7  OD1 ASP A   1      36.145  48.098  10.902  1.00  0.00           O  
  ATOM      8  OD2 ASP A   1      36.937  48.093  12.932  1.00  0.00           O  
  TER       9      ASP A   1                                                      
  END
  `;
  
  
  const labels = ['P', 'A', 'A', 'K', 'S', 'I', 'V', 'T', 'L', 'D', 'V', 'K', 'P', 'W', 'D','P', 'A', 'A', 'K', 'S', 'I', 'V', 'T', 'L', 'D', 'V', 'K', 'P', 'W', 'D','P', 'A', 'A', 'K', 'S', 'I', 'V', 'T', 'L', 'D', 'V', 'K', 'P', 'W', 'D'];
  const data = [0.28473333, 0.25680953, 0.3012256 , 0.2831465 , 0.21460417, 0.33297437, 0.24852641, 0.22674814, 0.15924256, 0.13744381, 0.22817993, 0.21480155, 0.08752055, 0.29654038, 0.24576497,0.28473333, 0.25680953, 0.3012256 , 0.2831465 , 0.21460417, 0.33297437, 0.24852641, 0.22674814, 0.15924256, 0.13744381, 0.22817993, 0.21480155, 0.08752055, 0.29654038, 0.24576497,0.28473333, 0.25680953, 0.3012256 , 0.2831465 , 0.21460417, 0.33297437, 0.24852641, 0.22674814, 0.15924256, 0.13744381, 0.22817993, 0.21480155, 0.08752055, 0.29654038, 0.24576497];
  const bindingSites = [1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];
  return (
    <CommonBackground>
      <section className={style.OurServices + " container "}>
        <div className="row">
      <ChartView labels={labels} data={data} bindingSites={bindingSites} />

        <div className="col-sm-12 my-5">
            <MoleculeViewer modelData={modelData} />
        </div>
        </div>

      </section>
    </CommonBackground>
  );
}
