import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import Spinner from "../../miniComponent/Spinner/Spinner";
import logo from "../../assets/Images/Logo.png";
import style from "./ForgetPassword.module.css";
import ApiManager from "../../Utilies/ApiManager";

export default function ForgetPasswordOtpConfirm() {
  const [responseFlag, setResponseFlag] = useState(false);
  const [resMessage, setResMessage] = useState(null);
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

  const resendOtp = async () => {
    setCanResend(false);
    setCountdown(90); // Reset the countdown
    await sendInitialOtp();
  };

  const sendOtp = async (values) => {
    const otp = values.otp.join("");

    setResponseFlag(true);
    try {
      const response = await ApiManager.otpConfirm({ otp, email });
      const res = response.data;
      if (res.success) {
        setResMessage({ flag: true, message: res.message });
        navigate("/reset-password", { state: { email } });
      } else {
        setResMessage({
          flag: false,
          message: "Invalid OTP, please try again.",
        });
      }
      setResponseFlag(false);
    } catch (error) {
      console.error("There was an error verifying the OTP!", error);
      setResponseFlag(false);
      setResMessage({
        flag: false,
        message: "Something went wrong, please try again later.",
      });
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

  return (
    <div className="w-50 container">
      <div
        className={
          "row bg-dark shadow rounded-5 overflow-hidden text-white " +
          style.ForgetPassword
        }
      >
        <div className="p-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
          <Link to="/">
            <img src={logo} className="my-3" alt="Logo" />
          </Link>
          {resMessage && (
            <div className={resMessage.flag ? style.success : style.error}>
              {resMessage.message}
            </div>
          )}
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
            <button
              disabled={responseFlag}
              type="submit"
              className="form-button"
            >
              {responseFlag ? <Spinner /> : "Submit OTP"}
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
        </div>
        <div
          className="bg-warning d-flex justify-content-center align-items-center gap-3 flex-column col-md-6"
          style={{ borderRadius: "150px 0 0 150px" }}
        >
          <h2>Support</h2>
          <h3>Welcome to Support of</h3>
          <p>
            Geno<span>V</span>
          </p>
          <Link to="/" className="btn btn-outline-light">
            Return Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
