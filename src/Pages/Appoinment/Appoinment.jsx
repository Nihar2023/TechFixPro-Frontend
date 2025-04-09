import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { AppContext } from '../../Context/AppContext';
import { DeviceContext } from '../../Context/deviceContext';
import { CartContext } from '../../Context/CartContext';
import { UserContext } from '../../Context/UserContext';

import { assets } from '../../assets/assets';
import RelatedShops from '../../components/RelatedShops/RelatedShops';

import './Appoinment.css';

const Appoinment = () => {
  const navigate = useNavigate();
  const { shopid } = useParams();

  const { userData } = useContext(UserContext);
  const { shops } = useContext(AppContext);
  const { deviceData, setDeviceData } = useContext(DeviceContext);
  // const { addToCart } = useContext(CartContext);

  const [shopInfo, setShopInfo] = useState(null);
  const [shopSlots, setShopSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Fetch shop info based on shopid
  const fetchInfo = () => {
    const shop = shops.find((shop) => shop._id === shopid);
    if (shop) {
      setShopInfo(shop);
    } else {
      toast.error('Shop not found');
      navigate('/');
    }
  };

  // Generate time slots for the next 7 days
  const getAvailableSlots = () => {
    const today = new Date();
    const slots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      const startTime = new Date(currentDate);
      const currentHour = today.getHours();

      if (i === 0) {
        startTime.setHours(currentHour >= 10 ? currentHour + 1 : 10, 0, 0, 0);
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      let slotTime = new Date(startTime);

      while (slotTime < endTime) {
        timeSlots.push({
          datetime: new Date(slotTime),
          time: slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        slotTime = new Date(slotTime.getTime() + 30 * 60000); // Add 30 minutes
      }

      if (timeSlots.length > 0) {
        slots.push(timeSlots);
      }
    }

    setShopSlots(slots);
  };

  const handleBookAppointment = async () => {
    const { store } = deviceData;

    if (!store.storeName || !store.appointment_day || !store.appointment_time) {
      toast.error('Please select the booking date and time');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/user/add-to-cart`, {
        ...deviceData,
        userEmail: userData.email,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.success);
      navigate('/cartItems');

      setDeviceData({
        device: '',
        model: '',
        company: '',
        issues: [],
        description: '',
        address: '',
        date: '',
        mobileNo: '',
        serviceType: '',
        store: {
          storeName: '',
          appointment_day: '',
          appointment_time: '',
        },
      });

    } catch (err) {
      toast.error('Failed to submit. Try again.');
    }
  };

  useEffect(() => {
    if (shops && shops.length > 0) {
      fetchInfo();
    }
  }, [shopid, shops]);

  useEffect(() => {
    if (shopInfo) {
      getAvailableSlots();

      // Set storeName in deviceData
      setDeviceData((prevState) => ({
        ...prevState,
        store: {
          ...prevState.store,
          storeName: shopInfo.name,
        },
      }));
    }
  }, [shopInfo]);

  if (!shopInfo) return <div className="appointment-container">Loading...</div>;

  return (
    <div className="appointment-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Shop Info */}
      <div className="shop-details">
        <div className="shop-image">
          <img src={shopInfo.image} alt="Shop" />
        </div>
        <div className="shop-info">
          <p className="shop-name">
            {shopInfo.name} <img src={assets.verified_icon} alt="Verified" className="verified-icon" />
          </p>
          <div className="shop-speciality">
            <p>Speciality: {shopInfo.speciality}</p>
            <button className="experience-btn">{shopInfo.experience} years</button>
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="booking-slots">
        <p className="slots-title">Booking Slots</p>

        <div className="slots-days">
          {shopSlots.length > 0 ? (
            shopSlots.map((daySlots, index) => {
              const date = daySlots[0].datetime;
              const dayName = daysOfWeek[date.getDay()];
              const dayDate = date.getDate();

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setDeviceData((prevState) => ({
                      ...prevState,
                      store: {
                        ...prevState.store,
                        appointment_day: dayName,
                      },
                    }));
                  }}
                  className={`slot-day ${slotIndex === index ? 'active' : ''}`}
                >
                  <p>{dayName}</p>
                  <p>{dayDate}</p>
                </div>
              );
            })
          ) : (
            <p>No available slots</p>
          )}
        </div>

        <div className="slots-times">
          {shopSlots[slotIndex]?.length > 0 ? (
            shopSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  setSlotTime(item.time);
                  setDeviceData((prevState) => ({
                    ...prevState,
                    store: {
                      ...prevState.store,
                      appointment_time: item.time,
                    },
                  }));
                }}
                className={`slot-time ${slotTime === item.time ? 'selected' : ''}`}
              >
                {item.time.toLowerCase()}
              </p>
            ))
          ) : (
            <p>No time slots available for this day</p>
          )}
        </div>

        <button className="book-appointment-btn" onClick={handleBookAppointment}>
          Book Appointment
        </button>
      </div>

      {/* Related Shops */}
      <RelatedShops shopid={shopid} speciality={shopInfo.speciality} />
    </div>
  );
};

export default Appoinment;
