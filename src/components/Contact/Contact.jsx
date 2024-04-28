import React from 'react'
import style from './Contact.module.css'
import { Link } from 'react-router-dom'
export default function Contact() {
  return (
    <div
    className=
      "w-50 container  "
  >
    <div className={"row bg-dark shadow rounded-5  overflow-hidden  text-white "+style.Contact}
    >
      <div className=" p-5 col-md-6 d-flex flex-column justify-content-center align-items-center">
        <img src="../Images/Logo.png" className="my-3" alt="Logo" />
        <form action="" className='w-75'>
           {/* Contact us */}
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
                <label htmlFor="message" className="form-label">
                Message
                </label>
                <textarea
                className="form-control"
                id="message"
                placeholder="Enter your message"
                />
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
