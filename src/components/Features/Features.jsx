import React from "react";
import { FaTools, FaTruckPickup, FaStore, FaComments, FaMoneyBill, FaChartLine } from "react-icons/fa";
import "./Features.css";

const features = [
  {
    icon: <FaTools className="feature-icon" />, 
    title: "Report Device Issues",
    description: "Describe problems with your device and select the related problems "
  },
  {
    icon: <FaChartLine className="feature-icon" />, 
    title: "Find Repair Shops by Specialty",
    description: "Locate nearby repair stores based on expertise, ratings, and estimated repair costs."
  },
  {
    icon: <FaTruckPickup className="feature-icon" />, 
    title: "Pickup & Delivery Service",
    description: "Get your device picked up, repaired, and delivered back safely with real-time tracking."
  },
  {
    icon: <FaStore className="feature-icon" />, 
    title: "Visit Store Option",
    description: "Choose to visit nearby repair shops with estimated wait times."
  },
  {
    icon: <FaComments className="feature-icon" />, 
    title: "Chat & Call Support",
    description: "Communicate directly with repair experts and get real-time updates."
  },
  {
    icon: <FaMoneyBill className="feature-icon" />, 
    title: "Flexible Payment Options",
    description: "Pay online or with cash after repair completion. Secure transactions ensured."
  }
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <h2 className="features-title">Why Choose TechFixPro?</h2>
        <p className="features-subtitle">We provide a seamless and efficient repair experience for your electronic devices.</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-container">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;