import React, { useContext, useState } from "react";
import style from "./UpdateProfile.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../../miniComponent/Spinner/Spinner";
import { authContext } from "../../Context/authContext";
import { Link } from "react-router-dom";
import ApiManager from "../../Utilies/ApiManager";

export default function UpdateProfile({ setProfileUpdate, profileUpdate }) {
  let { setToken, token, setUser, user } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateProfile = async (values) => {
    let user = {
      Name: values.name,
      PhoneNumber: values.phoneNumber,
      Gender: "M",
      email: values.emailConfirmed ? null : values.email,
      userName: values.userName,
    };
    setLoading(true);
    try {
      let { data } = await ApiManager.updateProfile(user, token);
      if (!data.token) {
        //error
        setErrorMessage(data.errors[0]);
      } else {
        //success
        setLoading(false);
        setUser({ ...values, phone: values?.phoneNumber });
        setSuccessMessage(data.message);
        setToken(data.token);
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
    setLoading(false);
  };

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
  });
  const myFormik = useFormik({
    initialValues: { ...user, phoneNumber: user?.phone },
    validationSchema: validationSchema,
    onSubmit: updateProfile,
  });
  return (
    <section className={style.updateProfile}>
      <button
        className="btn btn-danger mb-3 text-white rounded-circle"
        onClick={() => setProfileUpdate(!profileUpdate)}
      >
        X
      </button>
      <div className={"rounded-5 p-3 " + style.formLayer}>
        <form action="" onSubmit={myFormik.handleSubmit} className="w-100">
          <h3 className="text-center text-warning">Update Profile</h3>
          {errorMessage ? (
            <div className="text-danger">{errorMessage}</div>
          ) : null}
          {successMessage ? (
            <div className="text-success">{successMessage}</div>
          ) : null}
          <div className="mb-3 ">
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
          <div className="mb-3 ">
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

          <div className="mb-3 ">
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
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onBlur={myFormik.handleBlur}
              onChange={myFormik.handleChange}
              value={myFormik.values.email}
              type="email"
              className={
                "form-control " +
                (myFormik.values.emailConfirmed ? "bg-secondary" : "")
              }
              id="email"
              placeholder="Enter your email"
              disabled={myFormik.values.emailConfirmed}
            />
            {myFormik.errors.email && myFormik.touched.email ? (
              <div className="text-danger">{myFormik.errors.email}</div>
            ) : null}
          </div>
          <button disabled={loading} type="submit" className="form-button">
            {loading ? <Spinner /> : "Update"}
          </button>
          {myFormik.values.emailConfirmed ? null : (
            <div
              className={
                "w-100  mt-2 d-flex flex-column " + style.validateMessage
              }
            >
              you need to validate your email
              <Link to={"/accounts/emailConfirmation"}>Validate Email</Link>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
