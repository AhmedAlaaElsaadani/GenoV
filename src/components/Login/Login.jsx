import React from "react";
import style from "./Login.module.css";

export default function Login() {
  return (
    <div
      className=
        "w-50 container  " 
    >
      <div className={"row bg-dark shadow rounded-5  overflow-hidden  text-white "+style.Login}
      >
        <div className=" p-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
          <img src="Images/Logo.png" className="my-3" alt="Logo" />
          <h2>Sign In</h2>
          <form action="">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" >
                Password
              </label>
              <input type="password" className="form-control" id="password" placeholder="Enter your password"/>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        <div
          className="bg-warning  col-md-6 "
          style={{ borderRadius: "150px 0 0 150px" }}
        >
          
        </div>
      </div>
    </div>
  );
}
