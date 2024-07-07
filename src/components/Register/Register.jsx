import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../assets/Images/Logo.png";
import Spinner from "../../miniComponent/Spinner/Spinner";
import { authContext } from "../../Context/authContext";
import ApiManager from "../../Utilies/ApiManager";
import { motion } from "framer-motion";

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
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/,
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
  let { setToken } = useContext(authContext);

  let sendUserData = async (values) => {
    let user = values;
    setLoading(true);
    try {
      let { data } = await ApiManager.register(user);
      if (data.token) {
        //success
        setSuccessMessage("User registered successfully");
        setErrorMessage("");
        setToken(data.token);
        setTimeout(() => {
          navigator("/accounts/emailConfirmation");
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
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        }}
        className=" col-md-7"
      >
        <Link to="/">
          <img src={logo} className="my-3" alt="Logo" />
        </Link>
        {errorMessage ? (
          <div className="text-danger">{errorMessage}</div>
        ) : null}
        {successMessage ? (
          <div className="text-success">{successMessage} </div>
        ) : null}
        <form
          action=""
          onSubmit={myFormik.handleSubmit}
          className=" container w-100"
        >
          <div className="row w-100 h-100">
            <div className="mb-3  col-xl-6">
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
            <div className="mb-3  col-xl-6">
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

            <div className="mb-3  col-xl-6">
              <label htmlFor="email" className="form-label">
                Phone Number
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
            <div className="mb-3  col-xl-6">
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
            <div className="mb-3  col-xl-6">
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
            <div className="mb-3  col-xl-6">
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
            <button disabled={loading} type="submit" className="form-button">
              {loading ? <Spinner /> : "Submit Message"}
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: 20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, delay: 0.3 },
          },
        }}
        className="bg-warning col-md-5 "
      >
        <h2>Sign UP</h2>
        <h3> Welcome to join us in </h3>
        <p>
          Geno<span>V</span>
        </p>
        <div className="w-100 d-flex justify-content-center gap-3">
          <Link to="/accounts/Login" className="btn linkNav btn-light">
            Login
          </Link>
          <Link to="/Home" className="btn linkNav btn-outline-light">
            Home
          </Link>
        </div>
      </motion.div>
    </>
  );
}
