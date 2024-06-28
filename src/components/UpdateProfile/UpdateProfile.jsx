import React, { useState } from "react";
import style from "./UpdateProfile.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UpdateProfile() {
  const [loading, setLoading] = useState(false);
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
    initialValues: {
      name: "Abdulrhman Mezar New",
      phoneNumber: "01100000011",
      Gender: "M",
      email: "abdu.mezar@gmail.com",
      userName: "abdu.mezar",
    },
    validationSchema:validationSchema,
  });
  return (
    <section className={style.popLayer}>
      <div className="bg-white w-25 rounded-5 d-flex justify-content-center align-items-center p-3">
        <form action="" onSubmit={myFormik.handleSubmit} className="w-100">
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
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
            {myFormik.errors.email && myFormik.touched.email ? (
              <div className="text-danger">{myFormik.errors.email}</div>
            ) : null}
          </div>
          <button disabled={loading} type="submit">
            {loading ? "...." : "Sign Up"}
          </button>
        </form>
      </div>
    </section>
  );
}
