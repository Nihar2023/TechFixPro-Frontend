import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./cart.css";
import { UserContext } from "../../Context/UserContext.jsx";

function Carts() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const { userData } = useContext(UserContext);

  const fetchData = async () => {
    try {
      if (!userData?.email) return;
      setLoading(true); // ✅ Start loader

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/user/get-cart`, {
        email: userData.email,
      });

      if (!response.data.success) {
        toast.error("Failed to fetch cart items.");
        return;
      }

      setCartItems(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to fetch cart data.");
    } finally {
      setLoading(false); // ✅ Stop loader
    }
  };

  const handleDeleteBtn = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_LINK}/api/user/remove-cart`, {
        data: {
          email: userData.email,
          id: id,
        },
      });

      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setCartItems(res.data.data); // ✅ Update cart state
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting cart item.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [userData?.email]);

  return (
    <div className="cart-container">
      <h2>Cart Items</h2>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading your cart...</p>
        </div>
      ) : cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <h3 className="cart-item-title">
              {item.device} - {item.company} {item.model}
            </h3>

            {Array.isArray(item.issues) && item.issues.length > 0 && (
              <p className="cart-item-detail">
                <strong>Issues:</strong> {item.issues.join(", ")}
              </p>
            )}

            <p className="cart-item-detail">
              <strong>Description:</strong> {item.description}
            </p>

            <p className="cart-item-detail">
              <strong>Service Type:</strong> {item.serviceType}
            </p>

            {item.serviceType === "pickup" && (
              <>
                <p className="cart-item-detail">
                  <strong>Address:</strong> {item.address}
                </p>
                <p className="cart-item-detail">
                  <strong>Pickup Date:</strong>{" "}
                  {new Date(item.date).toDateString()}
                </p>
                <p className="cart-item-detail">
                  <strong>Mobile Number:</strong> {item.mobileNo}
                </p>
              </>
            )}

            {item.serviceType === "visit" && item.store && typeof item.store === "object" && (
              <>
                <h3>Visit to Store</h3>
                <p>{item.store.storeName}</p>
                <p>Appointment Day: {item.store.appointment_day}</p>
                <p>Appointment Time: {item.store.appointment_time}</p>
              </>
            )}

            <button onClick={() => handleDeleteBtn(item.id)} className="cancel-btn">
              Cancel
            </button>
          </div>
        ))
      ) : (
        <p className="empty-cart-message">No items in the cart.</p>
      )}
    </div>
  );
}

export default Carts;
