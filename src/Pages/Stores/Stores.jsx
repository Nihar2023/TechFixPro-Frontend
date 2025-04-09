import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import './Stores.css';

const Stores = () => {
  const { speciality } = useParams();
  console.log(speciality);
  const { shops } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(shops.filter((item) => item.speciality === speciality));
    } else {
      setFilterDoc(shops);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [shops, speciality]);

  return (
    <div className="doctors-page">
      {/* Left Section - Specialities */}
      <div className="left-section">
        <p className="heading">Browse through the Repair specialist.</p>
        <div className="specialities">
          <p onClick={() => speciality=='mobile'?navigate('/stores'): navigate('/stores/mobile')} style={{ color: speciality === 'mobile' ? 'blue' : 'black' ,borderBottom: speciality === 'mobile' ? '2px solid blue' : 'none'}}>Mobile Phone Repair</p>
          <p onClick={() => speciality=='laptop'?navigate('/stores'): navigate('/stores/laptop')} style={{ color: speciality === 'laptop' ? 'blue' : 'black' ,borderBottom: speciality === 'laptop' ? '2px solid blue' : 'none'}}>Laptop Repair</p>
         
        </div>
      </div>

      {/* Right Section - Display Cards */}
      <div className="right-section">
        <div className="doctors-list">
          {filterDoc.map((item, index) => (
            <div key={index} className="doctor-card" onClick={() => navigate(`/appointment/${item._id}`)}>
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
      </div>
    </div>
  );
}

export default Stores;
