import React from 'react'
import {assets} from '../../assets/assets.js'
import './Header.css'
import { useNavigate } from 'react-router-dom'
function Header() {
  const navigate=useNavigate();
  return (
    <div className="header">
      {/* Left Section */}
      <div className="header-left">
        <div className="header-title">
          <p>
            Fast, Reliable, and Convenient Electronic Repairs at Your Doorstep!
          </p>
        </div>
        <button onClick={()=>navigate('/issue')} className="book-appointment">
          Report Issue<img src={assets.arrow_icon} alt="Arrow Icon" />
        </button>
      </div>

      {/* Right Section */}
      <div className="header-right">
        <img src={assets.header_img} alt="Header" />
      </div>
    </div>
  )
}

export default Header
