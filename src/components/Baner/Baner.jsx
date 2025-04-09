import React from 'react'
import { assets } from '../../assets/assets';
import './Baner.css'
import { useNavigate } from 'react-router-dom'

function Baner() {
    const navigate=useNavigate();
  return (
    <div className="baner">
      {/* Left section */}
      <div className="baner-left">
        <div className="baner-text">
          <p className="baner-heading">Book Appointment</p>
          <p className="baner-subheading">with 100+ Trusted Repair Centers</p>
        </div>
        <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className="baner-btn">Create Account</button>
      </div>

      {/* Right section */}
      <div className="baner-right">
        <img src={assets.appointment_img} alt="Appointment" className="baner-img" />
      </div>
    </div>
  )
}

export default Baner
