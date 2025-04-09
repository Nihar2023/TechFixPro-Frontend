import React, { useContext } from 'react'
import { specialityData } from '../../assets/assets'
import './SpecialityMenu.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { DeviceContext } from '../../Context/deviceContext'

function SpecialityMenu() {
  const navigate=useNavigate()
  // const {deviceData,setDeviceData}=useContext(DeviceContext)
  return (
    <div id="speciality">
      <h1 className="speciality-title">Select device to repair</h1>
      <p className="speciality-description">
        Discover expert repair centers by speciality and book your appointment with ease or use pickup option to doorstep service.
      </p>
      <div className="speciality-grid">
        {specialityData.map((item, index) => (
          <Link onClick={(e)=>{e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: "smooth" });navigate('/issue')}}key={index} className="speciality-card">
            <img src={item.image} alt={item.speciality} className="speciality-img" />
            <p className="speciality-name">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu


