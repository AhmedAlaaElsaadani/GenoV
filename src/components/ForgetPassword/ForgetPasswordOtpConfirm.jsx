import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import Spinner from "../../miniComponent/Spinner/Spinner";
import logo from "../../assets/Images/Logo.png";
import ApiManager from "../../Utilies/ApiManager";
import { motion } from "framer-motion";

export default function ForgetPasswordOtpConfirm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(90); // 1.5 minutes
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendOtpAgain = async () => {
    try {
      let { data } = await ApiManager.forgotPasswordSendOtpToEmail(email);
      if (data.code && data.code === 200) {
        setMessage(data.message);
        setErrorMessage("");
      }
      console.log("OTP sent");
    } catch (error) {
      console.error("Error sending OTP:", error);
      let { data } = error.response;
      if (data.code && data.code === 400) {
        setErrorMessage(data.message);
        setMessage("");
      }
    }
  };

  const resendOtp = async () => {
    setCanResend(false);
    setCountdown(90); // Reset the countdown
    await sendOtpAgain();
  };

  const sendOtp = async (values) => {
    const otp = values.otp.join("");

    setLoading(true);
    try {
      const { data } = await ApiManager.confirmOtpForResetPassword(otp, email);
      if (data.code && data.code === 200) {
        setMessage("OTP verified successfully");
        setErrorMessage("");
        navigate("/accounts/reset-password", {
          state: { email, token: data.token },
        });
      } else {
        setErrorMessage(data.message);
        setMessage("");
      }
      setLoading(false);
    } catch (error) {
      console.error("There was an error verifying the OTP!", error);
      let { data } = error.response;
      setLoading(false);
      setErrorMessage(data.message);
      setMessage("");
    }
  };

  const myFormik = useFormik({
    initialValues: { otp: ["", "", "", "", "", ""] },
    onSubmit: sendOtp,
    validate: (values) => {
      const errors = {};
      if (values.otp.some((val) => val === "")) {
        errors.otp = "All fields are required";
      }
      return errors;
    },
  });

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const otp = [...myFormik.values.otp];
      otp[index] = value;
      myFormik.setFieldValue("otp", otp);
      if (value && index < 5) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      const otpArray = pasteData.split("");
      myFormik.setFieldValue("otp", otpArray);
      otpRefs.current[5].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !myFormik.values.otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };
  if (email) {
    return (
      <>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className=" col-md-6"
        >
          <Link to="/">
            <img src={logo} className="my-3" alt="Logo" />
          </Link>
          {message && <div className="text-success">{message}</div>}
          {errorMessage && <div className="text-danger">{errorMessage}</div>}

          <form onSubmit={myFormik.handleSubmit} className="w-75">
            <div
              className="mb-3 d-flex justify-content-between"
              onPaste={handlePaste}
            >
              {myFormik.values.otp.map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  id={`otp-${index}`}
                  type="text"
                  className="form-control text-center mx-1"
                  maxLength="1"
                  onChange={(e) => handleChange(e, index)}
                  onBlur={myFormik.handleBlur}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  value={myFormik.values.otp[index]}
                />
              ))}
            </div>
            {myFormik.errors.otp && myFormik.touched.otp && (
              <div className="text-danger">{myFormik.errors.otp}</div>
            )}
            <button disabled={loading} type="submit" className="form-button">
              {loading ? <Spinner /> : "Submit OTP"}
            </button>
          </form>
          <div className="mt-3">
            {canResend ? (
              <button onClick={resendOtp} className="btn btn-secondary">
                Resend OTP
              </button>
            ) : (
              <span>Please wait {countdown} seconds to resend</span>
            )}
          </div>
        </motion.div>
        <motion.div
          initialValuesinitial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.5, delay: 0.3 },
            },
          }}
          className="bg-warning  col-md-6"
        >
          <h2>Support</h2>
          <h3>Welcome to Support of</h3>
          <p>
            Geno<span>V</span>
          </p>
          <Link to="/" className="btn btn-outline-light">
            Return Back To Home
          </Link>
        </motion.div>
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}
