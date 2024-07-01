import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useLocation } from "react-router-dom";
import { authContext } from "../../Context/authContext";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import logo from "../../assets/Images/Logo.png";
import logoWhite from "../../assets/Images/Logo White.png";
import ApiManager from "../../Utilies/ApiManager";

const Navbar = () => {
  const [navbarCollapse, setNavbarCollapse] = useState();
  const [scrolled, setScrolled] = useState(true);
  const location = useLocation();
  const [HomeFlag, setHomeFlag] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);
  let { isRegistered, setToken, token, user } = useContext(authContext);
  // logout function
  const logOut = async () => {
    localStorage.removeItem("token");
    let { data } = await ApiManager.logOut(token);
    setToken(null);
  };
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
              src={scrolled && HomeFlag ? logo : logoWhite}
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
                  id="home"
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
                  id="ourServices"
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
              {isRegistered ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active position-relative"
                      aria_current="profile"
                      to="./"
                      onClick={() => setProfileUpdate(!profileUpdate)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                      </svg>
                      {console.log(user, " ", user?.emailConfirmed)}
                      {user?.emailConfirmed ||
                      user?.emailConfirmed == undefined ? null : (
                        <span className="position-absolute end-0 bottom-0 translate-middle p-2 bg-danger border border-light rounded-circle">
                          <span className="visually-hidden">New alerts</span>
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria_current="logOut"
                      onClick={(e) => logOut()}
                      to="./"
                    >
                      log Out
                    </Link>
                  </li>
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {profileUpdate && (
        <UpdateProfile
          profileUpdate={profileUpdate}
          setProfileUpdate={setProfileUpdate}
        />
      )}
    </>
  );
};

export default Navbar;
