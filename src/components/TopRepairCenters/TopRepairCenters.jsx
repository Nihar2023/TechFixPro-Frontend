import React from 'react'
import { shops } from '../../assets/assets';
import './TopRepairCenters.css'
import { useNavigate } from 'react-router-dom'

function TopRepairCenters() {
  const navigate = useNavigate();

  return (
    <div id="top-repair-centers">
      <h1 className="repair-center-title">Top Repair Centers to Book</h1>
      <p className="repair-center-description">
        Simply browse through our extensive list of trusted repair centers.
      </p>
      <div className="repair-center-list">
        {shops.slice(0, 10).map((item, index) => (
          <div 
            key={index} 
            className="repair-center-card" 
            onClick={() => navigate(`/appointment/${item._id}`)}
          >
            <img src={item.image} alt={item.name} className="repair-center-img" />
            <div className="repair-center-info">
              <div className="repair-center-status">
                <p className="status-dot"></p>
                <p className="status-text">Available</p>
              </div>
              <p className="repair-center-name">{item.name}</p>
              <p className="repair-center-speciality">{item.speciality}</p>
              <p className="repair-center-speciality">{item.address}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="repair-center-btn" onClick={()=>{navigate('/stores');scrollTo(0,0)}}>More</button>
    </div>
  )
}

export default TopRepairCenters;
