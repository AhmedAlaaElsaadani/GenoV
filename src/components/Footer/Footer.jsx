import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer >
        <ul className='d-flex justify-content-center  gap-5 list-unstyled'>
            <li><Link to="/">Terms</Link></li>
            <li><Link to="/">Privacy</Link></li>
            <li><Link to="/forms/Contact"  className='selectedFooter'>Contact Geno<span>V</span> support</Link></li>
            <li><Link to="/Docs">Docs</Link></li>
        </ul>
     </footer>
  )
}
