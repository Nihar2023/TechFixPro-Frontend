import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppContext.jsx';
import './MyRepairs.css';

const MyRepairs = () => {
  const { shops } = useContext(AppContext);

  return (
    <div className="my-appointments-container">
      <p className="my-appointments-title">My Appointments</p>
      <div>
        {shops.slice(0, 2).map((item, index) => (
          <div key={index} className="appointment-card">
            <div>
              <img src={item.image} alt="" className="doctor-image" />
            </div>
            <div className="appointment-details">
              <p className="doctor-name">{item.name}</p>
              <p className="doctor-speciality">{item.speciality}</p>
              <p className="address">Address:</p>
              <p className="address">{item.address.line1}</p>
              <p className="address">{item.address.line2}</p>
              <p className="date-time">
                <span>Date & Time:</span> 25 July, 2025 | 8:30 PM
              </p>
              <div className="button-container">
                <button className="pay-button">Pay Online</button>
                <button className="cancel-button">Cancel Appointment</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRepairs;
