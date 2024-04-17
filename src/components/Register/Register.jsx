import React from 'react'
import style from './Register.module.css'
import { Link } from 'react-router-dom'
export default function Register() {
  return (
    <div
    className={
      "w-50 container  "+style.Register} 
  >
    <div className={"row bg-dark shadow rounded-5  overflow-hidden  text-white "+style.Login}
    >
      <div className=" p-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
        <img src="../Images/Logo.png" className="my-3" alt="Logo" />
        <form action="" className='w-75'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
            />
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
        <Link to='/forms/Login' className='btn linkNav btn-primary'>Login</Link>
        <Link to='/Home' className='btn linkNav btn-primary'>Home</Link>


        </div>
   
      </div>
    </div>
  </div>
  )
}
