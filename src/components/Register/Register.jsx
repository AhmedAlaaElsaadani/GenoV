import React from 'react'
import style from './Register.module.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
export default function Register() {
  const myFormik=useFormik(
    {
      initialValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (!values.password) {
          errors.password = 'Required'
        } else if (values.password.length < 8 && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
          errors.password = 'Password must be 8 characters long and contain at least one letter and one number'
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = 'Required'
        } else if (values.confirmPassword !== values.password) {
          errors.confirmPassword = 'Password must be the same'
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
    <div className={"row bg-dark shadow rounded-5  overflow-hidden  text-white "+style.Register}
    >
      <div className=" p-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
        <img src="../Images/Logo.png" className="my-3" alt="Logo" />
        <form action="" onSubmit={myFormik.handleSubmit} className='w-75'>
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
            {myFormik.errors.name ? <div className='text-danger'>{myFormik.errors.name}</div> : null}
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
            {myFormik.errors.email ? <div className='text-danger'>{myFormik.errors.email}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
            onChange={myFormik.handleChange}
              value={myFormik.values.password}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
            />
            {myFormik.errors.password ? <div className='text-danger'>{myFormik.errors.password}</div> : null}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
            onChange={myFormik.handleChange}
              value={myFormik.values.confirmPassword}
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
            />
            {myFormik.errors.confirmPassword ? <div className='text-danger'>{myFormik.errors.confirmPassword}</div> : null}
          </div>
          <button type="submit">
            Sign Up
          </button>
        </form>
      </div>

      <div
        className="bg-warning d-flex justify-content-center align-items-center gap-3 flex-column col-md-6 "
        style={{ borderRadius: "150px 0 0 150px" }}
      >
        <h2>Sign UP</h2>
        <h3> Welcome to join us in  </h3>
        <p>Geno<span>V</span></p>
        <div className="w-100 d-flex justify-content-center gap-3">
        <Link to='/forms/Login' className='btn linkNav btn-light'>Login</Link>
        <Link to='/Home' className='btn linkNav btn-outline-light'>Home</Link>


        </div>
   
      </div>
    </div>
  </div>
  )
}
