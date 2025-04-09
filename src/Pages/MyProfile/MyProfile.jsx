import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
const MyProfile = () => {
  // Retrieve and parse user data safely
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const {userData,setUserData}=useContext(UserContext)
  console.log("Retrieved user:", user); // Debugging output
  useEffect(()=>{
    setUserData(user)
  },[])
  return (
    <div className="profile-card">
  <div className="profile-avatar">
    {user?.name?.charAt(0).toUpperCase() || "U"}
  </div>
  <h2>My Profile</h2>
  {user && user.name ? (
    <div className="profile-info">
      <p><strong>Username:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      <p><strong>Address:</strong> {user.address}</p>
    </div>
  ) : (
    <p className="profile-message">No user data found. Please log in.</p>
  )}
</div>

  );
};

export default MyProfile;
