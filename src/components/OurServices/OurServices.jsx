import React, { useContext, useEffect, useRef, useState } from "react";
import CommonBackground from "../CommonBackgroundLayer/CommonBackground";
import MoleculeViewer from "../3dModalViewer/MoleculeViewer";
import style from "./OurServices.module.css";
import ChartView from "../ChartViewer/ChartView";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../../miniComponent/Spinner/Spinner";
import { useFormik } from "formik";
import ApiManager from "../../Utilies/ApiManager";
import { authContext } from "../../Context/authContext";
export default function OurServices() {
  const [aminoAcidArray, setAminoAcidArray] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isChainSelector, setIsChainSelector] = useState(false);
  const chainSelector = useRef(null);
  const [aminoAcidNames, setAminoAcidNames] = useState(null);
  const [ratios, setRatios] = useState(null);
  const [bindingSites, setBindingSites] = useState(null);
  const [structure, setStructure] = useState(null);

  const [chainId, setChainId] = useState(null);
  let { token, isRegistered } = useContext(authContext);
  function extractData(aminoAcidArray) {
    const aminoAcidNames = [];
    const ratios = [];
    const bindingSites = [];

    aminoAcidArray.forEach((item) => {
      aminoAcidNames.push(item.aminoAcidName);
      ratios.push(parseFloat(item.ratio));
      bindingSites.push(parseInt(item.isBindingSite));
    });
    return { aminoAcidNames, ratios, bindingSites };
  }

  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      const { proteinId, chainId } = location.state;
      formikObject.setFieldValue("searchProtein", proteinId);
      formikObject.setFieldValue("chainId", chainId);
      getChinaData(proteinId);
      useModel(proteinId, chainId);
      // getProteinStruct(proteinId, chainId);
    }
  }, []);

  const search = async (values) => {
    setLoading(true);
    if (!chainId) {
      await getChinaData(values.searchProtein).then((res) => {
        setLoading(false);
      });
    } else {
      await useModel(values.searchProtein, values.chainId).then((res) => {
        setLoading(false);
      });
    }
  };
  const getProteinStruct = async (proteinId, chainId) => {
    try {
      let { data } = await ApiManager.getProteinStruct(proteinId, chainId);
      if (data) {
        setStructure(data["chain_atoms"]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const useModel = async (proteinId, chainId) => {
    try {
      let { data } = await ApiManager.useModel(proteinId, chainId, token);

      if (data && data.bindingSites) {
        console.log(data);
        let dataExtracted = extractData(data.bindingSites);
        setAminoAcidNames(dataExtracted.aminoAcidNames);
        setRatios(dataExtracted.ratios);
        setBindingSites(dataExtracted.bindingSites);
        setAminoAcidArray(data.bindingSites);
        setResponse(data);
        
        if (typeof (response.chainAtoms) == "string") {
          console.log("Hi");
          let chainAtoms = JSON.parse(response.chainAtoms);
          console.log(chainAtoms);
          console.log(chainAtoms["chain_atoms"]);
          setStructure(chainAtoms["chain_atoms"]);

         } //else setStructure(chainAtoms["chain_atoms"]);

        // getProteinStruct(proteinId, chainId);

      }
    } catch (error) {
      let { data } = error.response;
      if (data?.code == 404)
        formikObject.setFieldError(
          "chainId",
          "we are sorry this chain id is not found in our date base we will add it through 24h "
        );
    }
    return true;
  };
  const formikObject = useFormik({
    initialValues: {
      searchProtein: "",
      chainId: "",
    },
    onSubmit: search,
  });
  const getChinaData = async (proteinId) => {
    try {
      let { data } = await ApiManager.getChain(proteinId);
      if (data && data.chainIdentifiersList) {
        // add option in chain selector
        setIsChainSelector(true);
        if (data?.chainIdentifiersList?.length > 0) {
          setChainId(data.chainIdentifiersList[0]);
          if (!location.state) {
            formikObject.setFieldValue("chainId", data.chainIdentifiersList[0]);
          }
        }
        data.chainIdentifiersList.forEach((chain) => {
          // before append check if this option is already exist
          let isExist = false;
          chainSelector.current.childNodes.forEach((child) => {
            if (child.value == chain) {
              isExist = true;
            }
          });
          if (!isExist) {
            let option = document.createElement("option");
            option.value = chain;
            option.text = chain;
            chainSelector.current.appendChild(option);
          }
        });
      }
    } catch (error) {
      let { data } = error.response;
      if (data?.code == 404)
        formikObject.setFieldError("searchProtein", data.message);
    }
    return true;
  };
  // change the navbar style when the user clicks on the PreCalc link
  const changeNavbarStyle = () => {
    document
      .getElementById("ourServices")
      .classList.remove("selectedNavElement");
    document.getElementById("PreCalc").classList.add("selectedNavElement");
  };
  // handle change and blur in the search input to clear the chain selector and set the chain id to null
  const handleChangeAndBlurInSearchInput = () => {
    // clear chainSelector except first option which is the default
    if (isChainSelector) {
      clearChainSelector();
    }
    setIsChainSelector(false);
    setChainId(null);
    formikObject.setFieldValue("chainId", "");
  };
  const clearChainSelector = () => {
    while (chainSelector.current.length > 1) {
      chainSelector.current.removeChild(chainSelector.current.lastChild);
    }
  };
  return (
    <CommonBackground>
      <section className={style.OurServices + " container "}>
        <form
          onSubmit={formikObject.handleSubmit}
          className={"row w-75 " + style["input-container"]}
        >
          <div className="col-sm-12">
            <label htmlFor="searchProtein">
              Please insert PDB ID and chain identifier
            </label>
            <input
              type="text"
              id="searchProtein"
              value={formikObject.values.searchProtein}
              onChange={(e) => {
                handleChangeAndBlurInSearchInput();
                formikObject.handleChange(e);
              }}
              onBlur={formikObject.handleBlur}
              placeholder="Search for a protein"
              aria-label="Search for a protein"
              aria-describedby="button-addon2"
            />
            {formikObject.errors.searchProtein &&
              formikObject.touched.searchProtein && (
                <div className="text-danger text-center">
                  {formikObject.errors.searchProtein}
                </div>
              )}
          </div>
          {
            <div
              className="col-12 text-center"
              style={{ display: isChainSelector ? "block" : "none" }}
            >
              <label htmlFor="options"> Now Choose Chain Id</label>
              <div className={style["selector-container"] + " mt-0"}>
                <select
                  disabled={!isChainSelector}
                  id="options"
                  className={style["selector"]}
                  ref={chainSelector}
                  value={formikObject.values.chainId}
                  onChange={(e) => {
                    formikObject.setFieldValue("chainId", e.target.value);
                    setChainId(e.target.value);
                  }}
                  onBlur={formikObject.handleBlur}
                >
                  <option disabled selected>
                    Choose Chain Id{" "}
                  </option>
                </select>

                {formikObject.errors.chainId &&
                  formikObject.touched.chainId && (
                    <div className="text-danger text-center">
                      {formikObject.errors.chainId}
                    </div>
                  )}
              </div>
            </div>
          }
          <div
            className={"col-12 text-center my-4 " + style["button-container"]}
          >
            {isRegistered ? (
              <button type="submit" disabled={loading} id="button-addon2">
                {loading ? <Spinner /> : "Search"}
              </button>
            ) : (
              <Link to={"/accounts/login"} className={style.link}>
                Search
              </Link>
            )}
            <Link
              to={"/precalc"}
              onClick={changeNavbarStyle}
              className={style.link}
            >
              Pre Calc
            </Link>
          </div>
        </form>
        {aminoAcidArray && (
          <div className="row w-75">
            <div className="col-sm-12 my-5">
              <h3> Protein binding site prediction using local features</h3>
              <p>PDB ID: {response.pdbId}</p>
            </div>
            {structure && (
              <div className="col-sm-12 my-5">
                <MoleculeViewer aminoAcidPdb={structure} />
              </div>
            )}
            {aminoAcidNames && ratios && bindingSites && (
              <div className="col-sm-12 my-5">
                <ChartView
                  labels={aminoAcidNames}
                  data={ratios}
                  bindingSites={bindingSites}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </CommonBackground>
  );
}
