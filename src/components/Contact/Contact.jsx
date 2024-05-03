import React from 'react'
import style from './Contact.module.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
export default function Contact() {
  const myFormik=useFormik(
    {
      initialValues: {
        name: '',
        email: '',
        message: ''
      },
      onSubmit: values => {
        console.log(values)
      },
      validate: values => {
        const errors = {}
        if (!values.name) {
          errors.name = 'Required'
        } else if (values.name.length < 3) {
          errors.name = 'Must be 3 characters or more'
        }
        if (!values.email) {
          errors.email = 'Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }
        if (!values.message) {
          errors.message = 'Required'
        } else if (values.message.length < 10) {
          errors.message = 'Must be 10 characters or more'
        }
        return errors
    }
    }
  )
  return (
    <div
    className=
      "w-50 container  "
  >
    <div className={"row bg-dark shadow rounded-5  overflow-hidden  text-white "+style.Contact}
    >
      <div className=" p-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
        <img src="../Images/Logo.png" className="my-3" alt="Logo" />
        <form onSubmit={myFormik.handleSubmit} action="" className='w-75'>
           {/* Contact us */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Name
                </label>
                <input
                onChange={myFormik.handleChange}
                value={myFormik.values.name}
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                />
                {myFormik.errors.name ? <div className="text-danger">{myFormik.errors.name}</div> : null}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                Email
                </label>
                <input
                onChange={myFormik.handleChange}
                value={myFormik.values.email}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                />
                {myFormik.errors.email ? <div className="text-danger">{myFormik.errors.email}</div> : null}
            </div>
            <div className="mb-3">
                <label htmlFor="message" className="form-label">
                Message
                </label>
                <textarea
                className="form-control"
                onChange={myFormik.handleChange}
                value={myFormik.values.message}
                id="message"
                placeholder="Enter your message"
                />
                {myFormik.errors.message ? <div className="text-danger">{myFormik.errors.message}</div> : null}
            </div>
          <button type="submit">
            Send Message
          </button>
        </form>
      </div>

      <div
        className="bg-warning d-flex justify-content-center align-items-center gap-3 flex-column col-md-6 "
        style={{ borderRadius: "150px 0 0 150px" }}
      >
        <h2>Support</h2>
        <h3> Welcome to Support of </h3>
        <p>Geno<span>V</span></p>
        <Link to="/" className='btn btn-outline-light'> return Back To home</Link>
   
      </div>
    </div>
  </div>
  )
}
