import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import ApiManager from "../../Utilies/ApiManager";
import Spinner from "../../miniComponent/Spinner/Spinner";
import logo from "../../assets/Images/Logo.png";

export default function ForgetPasswordSendEmail() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const handleForgotPassword = async (values) => {
    setLoading(true);
    setErrorMessage("");
    setMessage("");
    try {
      const { data } = await ApiManager.forgotPasswordSendOtpToEmail(
        values.email
      );
      if (data.code && data.code === 200) {
        setMessage(data.message);
        setTimeout(() => {
          // sendEmail with your navigate
          navigate("/accounts/otp-confirm", { state: { email: values.email } });
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      let { data } = error.response;
      if (data.code && data.code === 400) {
        setErrorMessage(data.message);
      }
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validate,
    onSubmit: handleForgotPassword,
  });

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
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="form-control"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
          </div>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? <Spinner /> : "Send OTP"}
          </button>
        </form>
      </div>
      <div className="bg-warning col-md-6 ">
        <h2>Forgot Password</h2>
        <h3>Recover your account</h3>
        <p>
          Geno<span>V</span>
        </p>
        <div className="w-100 d-flex justify-content-center gap-3">
          <Link to="/accounts/Login" className="btn linkNav btn-light">
            Login
          </Link>
          <Link to="/" className="btn linkNav btn-outline-light">
            Home
          </Link>
        </div>
      </div>
    </>
  );
}
