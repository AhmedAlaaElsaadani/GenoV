import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import logo from "../../assets/Images/Logo.png";
import Spinner from "../../miniComponent/Spinner/Spinner";
import ApiManager from "../../Utilies/ApiManager";

export default function Contact() {
  const [responseFlag, setResponseFlag] = useState(false);
  const [resMessage, setResMessage] = useState(null);
  const sendMessage = async (values) => {
    let data = JSON.stringify({
      Name: values.name,
      Email: values.email,
      Message: values.message,
    });

    setResponseFlag(true);
    await ApiManager.contactUs(data)
      .then((response) => {
        console.log(response);
        let res = response.data;
        if (res.code && res.code == 200) {
          setResMessage({ flag: true, message: res.message });
        } else {
          setResMessage({
            flag: false,
            message: "Something went wrong, please try again later",
          });
        }

        setResponseFlag(false);
      })
      .catch((error) => {
        console.error("There was an error sending the message!", error);
        setResponseFlag(false);
        setResMessage({
          flag: false,
          message: "Something went wrong, please try again later",
        });
      });
  };

  const myFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: sendMessage,
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      } else if (values.name.length < 3) {
        errors.name = "Must be 3 characters or more";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.message) {
        errors.message = "Required";
      } else if (values.message.length < 10) {
        errors.message = "Must be 10 characters or more";
      }
      return errors;
    },
  });
  return (
    <>
      <div className={" col-md-6"}>
        <Link to="/">
          <img src={logo} className="my-3" alt="Logo" />
        </Link>
        {resMessage != null ? (
          <div
            className={
              "text-center " +
              (resMessage.flag ? "text-success " : "text-danger ")
            }
          >
            {resMessage.message}
          </div>
        ) : (
          ""
        )}
        <form onSubmit={myFormik.handleSubmit} action="" className="w-75">
          {/* Contact us */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
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
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              onChange={myFormik.handleChange}
              onBlur={myFormik.handleBlur}
              value={myFormik.values.message}
              id="message"
              placeholder="Enter your message"
            />
            {myFormik.errors.message && myFormik.touched.message ? (
              <div className="text-danger">{myFormik.errors.message}</div>
            ) : null}
          </div>
          <button disabled={responseFlag} type="submit" className="form-button">
            {responseFlag ? <Spinner /> : "Submit Message"}
          </button>
        </form>
      </div>

      <div className="bg-warning col-md-6 ">
        <h2>Support</h2>
        <h3> Welcome to Support of </h3>
        <p>
          Geno<span>V</span>
        </p>
        <Link to="/" className="btn btn-outline-light">
          return Back To home
        </Link>
      </div>
    </>
  );
}
