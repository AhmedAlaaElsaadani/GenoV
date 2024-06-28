import React, { useState } from "react";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../../assets/Images/Logo.png"

export default function Register() {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    userName: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
    phoneNumber: Yup.string()
      .length(11, "Must be 11 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(
        8,
        "Password must be 8 characters long and contain at least one letter and one number"
      )
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be 8 characters long and contain at least one letter and one number"
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must be the same")
      .required("Required"),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  let navigator = useNavigate();


  let sendUserData = async (values) => {
    const myHeaders = {
      "Content-Type": "application/json",
    };
    let user = values;
    setLoading(true);
    try {
      console.log(user);
      let { data } = await axios.post(
        "https://genov.izitechs.com/accounts/register",
        user,
        {
          headers: myHeaders,
        }
      );
      console.log(data);
      if (data.token) {
        //success
        setSuccessMessage("User registered successfully");
        setErrorMessage("");
        setTimeout(() => {
          navigator("/forms/Login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.code === 401) {
        setErrorMessage(error.response.data.message);
      } else if (error.response.data.code === 400) {
        setErrorMessage(error.response.data.errors[0]);
      } else {
        setErrorMessage("Something went wrong");
      }
      setLoading(false);
    }
  };
  const myFormik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      phoneNumber: "",
      gender: "M",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: sendUserData,
    validationSchema: validationSchema,
  });
  return (
    <div className="w-50 container  ">
      <div
        className={
          "row bg-dark shadow rounded-5  overflow-hidden  text-white " +
          style.Register
        }
      >
        <div className=" p-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
          <img src={logo} className="my-3" alt="Logo" />
          {(errorMessage) ? (
            <div className="text-danger">{errorMessage}</div>
          ) : null}
          {successMessage ? (
            <div className="text-success">{successMessage} </div>
          ) : null}
          <form action="" onSubmit={myFormik.handleSubmit} className="w-75">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                value={myFormik.values.name}
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
              />
              {myFormik.errors.name && myFormik.touched.name ? (
                <div className="text-danger">{myFormik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                User Name
              </label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                value={myFormik.values.userName}
                type="text"
                className="form-control"
                id="userName"
                placeholder="Enter your userName"
              />
              {myFormik.errors.userName && myFormik.touched.userName ? (
                <div className="text-danger">{myFormik.errors.userName}</div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                phone Number
              </label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                value={myFormik.values.phoneNumber}
                type="tel"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter your phone Number"
              />
              {myFormik.errors.phoneNumber && myFormik.touched.phoneNumber ? (
                <div className="text-danger">{myFormik.errors.phoneNumber}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                value={myFormik.values.email}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
              {myFormik.errors.email && myFormik.touched.email ? (
                <div className="text-danger">{myFormik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                value={myFormik.values.password}
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
              {myFormik.errors.password && myFormik.touched.password ? (
                <div className="text-danger">{myFormik.errors.password}</div>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                onBlur={myFormik.handleBlur}
                onChange={myFormik.handleChange}
                value={myFormik.values.confirmPassword}
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
              {myFormik.errors.confirmPassword &&
              myFormik.touched.confirmPassword ? (
                <div className="text-danger">
                  {myFormik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <button disabled={loading} type="submit">{loading? (<svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className={"bi bi-arrow-counterclockwise " + style.spinner}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                </svg>
              ) : (
                "Submit Message"
              )}</button>
          </form>
        </div>

        <div
          className="bg-warning d-flex justify-content-center align-items-center gap-3 flex-column col-md-6 "
          style={{ borderRadius: "150px 0 0 150px" }}
        >
          <h2>Sign UP</h2>
          <h3> Welcome to join us in </h3>
          <p>
            Geno<span>V</span>
          </p>
          <div className="w-100 d-flex justify-content-center gap-3">
            <Link to="/forms/Login" className="btn linkNav btn-light">
              Login
            </Link>
            <Link to="/Home" className="btn linkNav btn-outline-light">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
