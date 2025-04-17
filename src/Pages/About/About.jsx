import React from 'react';
import { assets } from '../../assets/assets.js';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* About Heading */}
      <div className="about-heading">
        <p>About <span>US</span></p>
      </div>

      {/* About Content */}
      <div className="about-content">
        <div className="about-image">
          <img src={assets.about_image} alt="About Us" />
        </div>
        <div className="about-text">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis ipsum tenetur voluptatum animi perferendis soluta placeat ad rerum magnam. Nihil!</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius nobis, quis sit beatae ad reprehenderit magnam perferendis, provident voluptatum, iure consequuntur recusandae culpa.</p>
          <b>Our vision</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, dicta. Ad fuga aut architecto repudiandae!</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="choose-heading">
        <p>Why <span>Choose Us</span></p>
      </div>

      <div className="choose-list">
        <div className="choose-item">
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle</p>
        </div>

        <div className="choose-item">
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area</p>
        </div>

        <div className="choose-item">
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health</p>
        </div>
      </div>
    </div>
  );
};

export default About;
