import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { authContext } from "../../Context/authContext";
import logo from "../../assets/Images/Logo.png";
import Spinner from "../../miniComponent/Spinner/Spinner";
import ApiManager from "../../Utilies/ApiManager";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMes, setSuccessMes] = useState("");
  const [loading, setLoading] = useState(false);
  let { setToken } = useContext(authContext);
  let navigator = useNavigate();
  /**
   * validate input take values object and return errors object after
   * checking if the email and password are valid or not
   * @param {object} values
   * @returns {object} errors
   */
  let validateInputs = (values) => {
    const errors = {};
    if (!values.emailOrPhone) {
      errors.emailOrPhone = "Required";
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

  let logInUser = async (values) => {
    const user = {
      EMAILORPHONE: values.emailOrPhone,
      PASSWORD: values.password,
      Rememberme: values.rememberMe ? 1 : 0,
    };
    setLoading(true);
    try {
      console.log(user);
      let { data } = await ApiManager.logIn(user);
      if (data.token) {
        //success
        setToken(data.token);
        setErrorMessage("");
        setSuccessMes("Welcome Back");
        localStorage.setItem("token", data.token);

        setTimeout(() => {
          navigator("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.code === 401) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong");
      }
      setLoading(false);
    }
  };
  const myFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: logInUser,
    validate: validateInputs,
  });
  return (
    <>
      <div className=" col-md-6 ">
        <Link to="/">
          <img src={logo} className="my-3" alt="Logo" />
        </Link>
        {errorMessage ? (
          <div className="text-danger">{errorMessage}</div>
        ) : null}
        {successMes ? <div className="text-success">{successMes}</div> : null}
        <form action="" onSubmit={myFormik.handleSubmit}>
          <div className="mb-1">
            <label htmlFor="email" className="form-label">
              Email address or Phone number
            </label>
            <input
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
              value={myFormik.values.emailOrPhone}
              type="text"
              id="emailOrPhone"
              placeholder="Enter your email"
            />
            {myFormik.errors.emailOrPhone && myFormik.touched.emailOrPhone ? (
              <div className="text-danger">{myFormik.errors.emailOrPhone}</div>
            ) : null}
          </div>
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
              value={myFormik.values.password}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
            {myFormik.errors.password && myFormik.touched.password ? (
              <div className="text-danger">{myFormik.errors.password}</div>
            ) : null}
          </div>

          <div className="mb-1 d-flex justify-content-between">
            <label htmlFor="rememberMe" className="form-label">
              Remember me
            </label>
            <input
              type="checkbox"
              value={myFormik.values.rememberMe}
              checked={myFormik.values.rememberMe}
              onChange={myFormik.handleChange}
              id="rememberMe"
              className={"form-check form-check-input  "}
            />
          </div>
          <button disabled={loading} type="submit" className="form-button">
            {loading ? <Spinner /> : "Submit Message"}
          </button>
          <div className="w-100 d-flex justify-content-center mt-1  ">
            <Link to="/accounts/ForgetPasswordSendEmail" className="text-light">
              forget your password?
            </Link>
          </div>
        </form>
      </div>

      <div className="bg-warning  col-md-6">
        <h2>Sign In</h2>
        <h3>Welcome back Researcher</h3>
        <p>
          Geno<span>V</span>
        </p>
        <div className="w-100 d-flex justify-content-center gap-3">
          <Link to="/accounts/Register" className="btn linkNav btn-light">
            Register Now{" "}
          </Link>
          <Link to="/" className="btn linkNav btn-outline-light">
            Home{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
