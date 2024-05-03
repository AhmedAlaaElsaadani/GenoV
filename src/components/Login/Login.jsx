import React from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

export default function Login() {
  /**
   * validate input take values object and return errors object after
   * checking if the email and password are valid or not
   * @param {object} values
   * @returns {object} errors
   */
  let validateInputs = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (
      values.password.length < 8 &&
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)
    ) {
      errors.password =
        "Password must be 8 characters long and contain at least one letter and one number";
    }
    return errors;
  };
  const myFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: validateInputs,
  });
  return (
    <div className="w-50 container  ">
      <div
        className={
          "row bg-dark shadow rounded-5  overflow-hidden  text-white " +
          style.Login
        }
      >
        <div className=" p-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
          <img src="../Images/Logo.png" className="my-3" alt="Logo" />
          <form action="" onSubmit={myFormik.handleSubmit} className="w-75">
            <div className="mb-1">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                onChange={myFormik.handleChange}
                value={myFormik.values.email}
                type="email"
                id="email"
                placeholder="Enter your email"
              />
              {myFormik.errors.email ? (
                <div className="text-danger">{myFormik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-1">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={myFormik.handleChange}
                value={myFormik.values.password}
                type="password"
                id="password"
                placeholder="Enter your password"
              />
              {myFormik.errors.password ? (
                <div className="text-danger">{myFormik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>

        <div
          className="bg-warning  col-md-6 flex-column  d-flex justify-content-center gap-2 align-items-center"
          style={{ borderRadius: "150px 0 0 150px" }}
        >
          <h2>Sign In</h2>
          <h3>Welcome back Researcher</h3>
          <p>
            Geno<span>V</span>
          </p>
          <div className="w-100 d-flex justify-content-center gap-3">
            <Link to="/forms/Register" className="btn linkNav btn-light">
              Register Now{" "}
            </Link>
            <Link to="/" className="btn linkNav btn-outline-light">
              Home{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
