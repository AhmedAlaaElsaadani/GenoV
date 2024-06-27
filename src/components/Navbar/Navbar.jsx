import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useLocation } from "react-router-dom";
import { authContext } from "../../Context/authContext";
const Navbar = () => {
  const [navbarCollapse, setNavbarCollapse] = useState();
  const [scrolled, setScrolled] = useState(true);
  const location = useLocation();
  const [HomeFlag, setHomeFlag] = useState(false);
  let {isRegistered}=useContext(authContext);

  // specify style for nav item when refresh page
  const specifyStyleForNav = () => {
    document.querySelectorAll(".nav-link").forEach((element) => {
      if (window.location.href.includes(element.getAttribute("aria_current"))) {
        document.querySelectorAll(".nav-link").forEach((element) => {
          element.classList.remove("selectedNavElement");
        });
        element.classList.add("selectedNavElement");
      }
    });
  };
  // change color of nav item when click on it
  const changeStyleClassFotNavItem = (e) => {
    e.target.classList.add("selectedNavElement");
    document.querySelectorAll(".nav-link").forEach((element) => {
      if (element !== e.target) {
        element.classList.remove("selectedNavElement");
      }
    });
    hideNavbar();
  };
  const hideNavbar = () => {
    navbarCollapse.hide();
  };

  // handle change between background in navbar
  const handleScroll = () => {
    if (window.innerWidth > 1024) {
      let isScrolled;
      isScrolled = window.scrollY == 0;
      setScrolled(isScrolled);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    // specify style for nav item when refresh page
    specifyStyleForNav();
    // Manually collapse the navbar when a link is clicked
    setNavbarCollapse(
      new bootstrap.Collapse(
        document.getElementById("navbarSupportedContent"),
        {
          toggle: false, // Set to false to manually control the collapse state
        }
      )
    );
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // handle scroll event to change background of navbar
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setHomeFlag(
        location.pathname[1] === undefined || location.pathname[1] === "H"
      );
    }
  }, [location.pathname]);

  return (
    <>
      <nav
        id="navBarMain"
        className={
          "navbar font navbar-expand-lg  position-fixed px-4 pt-1  top-0  z-3 w-100 " +
          (scrolled && HomeFlag
            ? "homeNavbarTransparent"
            : "backgroundMainNavbar")
        }
        data-bs-theme="light"
      >
        <div
          className="container-fluid mx-3 d-flex justify-content-between 
                "
        >
          <Link className="navbar-brand py-3 px-2 rounded-3" to="/">
            <img
              src={
                scrolled && HomeFlag
                  ? "Images/Logo.png"
                  : "Images/Logo White.png"
              }
              style={{ width: "125px" }}
              alt="logo website "
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse listsNavLinks fs-5"
            id="navbarSupportedContent"
          >
            <div />
            <ul className="navbar-nav gap-3 gap-lg-3  d-flex justify-content-between mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link
                  className="nav-link active selectedNavElement"
                  onClick={(e) => changeStyleClassFotNavItem(e)}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  className="nav-link active"
                  aria_current="About"
                  onClick={(e) => changeStyleClassFotNavItem(e)}
                  to="/About"
                >
                  About
                </Link>
              </li>

              <li className="nav-item ">
                <Link
                  className="nav-link active"
                  aria_current="Docs"
                  onClick={(e) => changeStyleClassFotNavItem(e)}
                  to="/Docs"
                >
                  Docs
                </Link>
              </li>

              <li className="nav-item ">
                <Link
                  className="nav-link active"
                  aria_current="PreCalc"
                  onClick={(e) => changeStyleClassFotNavItem(e)}
                  to="/PreCalc"
                >
                  Pre-Calcp
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  className="nav-link active"
                  aria_current="OurServices"
                  onClick={(e) => changeStyleClassFotNavItem(e)}
                  to="/OurServices"
                >
                  Our Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria_current="Contact"
                  onClick={(e) => changeStyleClassFotNavItem(e)}
                  to="forms/Contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav gap-3 gap-lg-3  d-flex justify-content-between mb-2 mb-lg-0">
              {
                isRegistered?
                <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria_current="Login"
                  to="./"
                >
                  log Out
                </Link>
              </li>
              :<>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria_current="Login"
                  onClick={(e) => changeStyleClassFotNavItem(e)}
                  to="/forms/Login"
                  >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria_current="Register"
                  onClick={(e) => changeStyleClassFotNavItem(e)}
                  to="/forms/Register"
                >
                  Register
                </Link>
              </li>
              </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
