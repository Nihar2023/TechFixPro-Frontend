import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-left">
          <h1>TechFixPro</h1>
          <p className="footer-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet veritatis quo excepturi error quia aliquam?
          </p>
        </div>

        {/* Center Section */}
        <div className="footer-center">
          <p className="footer-title">Company</p>
          <ul className="footer-list">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <p className="footer-title">Get in touch</p>
          <ul className="footer-list">
            <li>+93221112233</li>
            <li>example@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p className="footer-bottom-text">© 2025 TechFixPro. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
