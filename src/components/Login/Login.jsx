import React from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div
      className=
        "w-50 container  " 
    >
      <div className={"row bg-dark shadow rounded-5  overflow-hidden  text-white "+style.Login}
      >
        <div className=" p-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
          <img src="../Images/Logo.png" className="my-3" alt="Logo" />
          <form action="" className="w-75">
            <div className="mb-1">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="password" className="form-label" >
                Password
              </label>
              <input type="password"  id="password" placeholder="Enter your password"/>
            </div>
            <button type="submit"  >
              Submit
            </button>
          </form>
        </div>

        <div
          className="bg-warning  col-md-6 flex-column  d-flex justify-content-center gap-2 align-items-center"
          style={{ borderRadius: "150px 0 0 150px" }}
        >
            <h2>Sign In</h2>
            <h3>
              Welcome back Researcher 
            </h3>
            <p>Geno<span>V</span></p>
            <div className="w-100 d-flex justify-content-center gap-3">
            <Link to="/forms/Register" className="btn linkNav btn-primary">
              Register Now </Link>
            <Link to="/" className="btn linkNav btn-primary">
              Home </Link>
          
            </div>
          
        </div>
      </div>
    </div>
  );
}
