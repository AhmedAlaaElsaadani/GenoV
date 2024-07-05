import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import ApiManager from "../../Utilies/ApiManager";
import Spinner from "../../miniComponent/Spinner/Spinner";
import logo from "../../assets/Images/Logo.png";

import * as Yup from "yup";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const token = location.state?.token;

  const validationSchema = Yup.object({
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

  const handleResetPassword = async (values) => {
    setLoading(true);
    setErrorMessage("");
    setMessage("");
    try {
      const { data } = await ApiManager.resetPassword(
        email,
        values.password,
        token
      );
      if (data.code && data.code === 200) {
        setMessage(data.message);
        setTimeout(() => {
          navigate("/accounts/Login");
        }, 2000);
      } else {
        setErrorMessage(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      let { data } = error.response;
      if (data.code) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage("Something went wrong");
      }
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: handleResetPassword,
  });
  if (token)
    return (
        <>
          <div className="col-md-6">
            <Link to="/">
              <img src={logo} className="my-3" alt="Logo" />
            </Link>
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            {message && <div className="text-success">{message}</div>}
            <form onSubmit={formik.handleSubmit} className="w-75">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type="password"
                  id="password"
                  placeholder="Enter your new password"
                  className="form-control"
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your new password"
                  className="form-control"
                />
                {formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                  <div className="text-danger">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <button type="submit" className="form-button" disabled={loading}>
                {loading ? <Spinner /> : "Reset Password"}
              </button>
            </form>
          </div>
          <div
            className="bg-warning col-md-6"
          >
            <h2>Reset Password</h2>
            <h3>Enter your new password</h3>
            <p>
              Geno<span>V</span>
            </p>
            <Link to="/" className="btn linkNav btn-outline-light">
              Home
            </Link>
          </div>
        </>
    );
  else return <Navigate to="/" />;
}
