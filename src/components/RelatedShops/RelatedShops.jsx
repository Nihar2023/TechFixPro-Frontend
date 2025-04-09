import React, { useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './RelatedShops.css'
function RelatedShops({speciality,shopid}) {
    const navigate=useNavigate()
    const {shops}=useContext(AppContext);
    const [relShops,setRelShops]=useState([]);
    useEffect(()=>{
        if(shops.length>0 && speciality)
        {
            const shopsData=shops.filter((item)=>item.speciality===speciality && item._id!==shopid);
            setRelShops(shopsData);    
        }
    },[shops,speciality,shopid])
  return (
    <div id="top-doctors" style={{marginTop:'20px'}}>
    <h1 className="top-doctors-title">Related Shops to Book Appointment</h1>
    {/* <p className="top-doctors-description">
      Simply browse through our extensive list of trusted doctors.
    </p> */}
    <div className="doctors-list" >
      {relShops.slice(0, 5).map((item, index) => (
        <div key={index} className="doctor-card" onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} >
          <img src={item.image} alt={item.name} className="doctor-img" />
          <div className="doctor-info">
            <div className="doctor-status">
              <p className="status-dot"></p>
              <p className="status-text">Available</p>
            </div>
            <p className="doctor-name">{item.name}</p>
            <p className="doctor-speciality">{item.speciality}</p>
          </div>
        </div>
      ))}
    </div>
    <button className="repair-center-btn" onClick={()=>{navigate('/stores');scrollTo(0,0)}}>More</button>
  </div>
  )
}

export default RelatedShops
