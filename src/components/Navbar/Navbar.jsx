import React, { useEffect, useState, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { toast } from 'react-toastify';
import { UserContext } from '../../Context/UserContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const timeoutRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(false); // Local token state
  const [user, setUser] = useState(null);    // Local user state

  // Sync with localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserData(parsedUser); // optional if you're using context state
      setToken(true);
    } else {
      setUser(null);
      setToken(false);
    }
  }, []);

  const handleLogout = () => {
    setUserData({ name: "", email: "", mobile: "", address: "" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToken(false);
    setUser(null);
    navigate('/login');
    toast.success("Logged out successfully!");
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowMenu(false);
    }, 150);
  };

  return (
    <div className="navbar">
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>TechFixPro</h1>

      {/* Navigation Links */}
      <ul className="nav-list">
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/service" className="nav-item">Service</NavLink>
        <NavLink to="/cartItems" className="nav-item">My Repairs</NavLink>
        <NavLink to="/contact" className="nav-item">Contact</NavLink>
      </ul>

      {/* Profile Section */}
      {token && user ? (
        <div
          className="profile-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={assets.profile_pic} alt="Profile" className="profile-pic" />

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="menu">
              <ul>
                <li onClick={() => navigate('/my-profile')}>My Profile</li>
                <li onClick={() => navigate('/cartItems')}>My Repairs</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => navigate('/login')} className="create-account-btn">
          Create Account
        </button>
      )}
    </div>
  );
};

export default Navbar;
