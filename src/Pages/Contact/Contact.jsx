import React from 'react';
import { assets } from '../../assets/assets.js';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Contact Heading */}
      <div className="contact-heading">
        <p>Contact<span>Us</span></p>
      </div>

      {/* Contact Content */}
      <div className="contact-content">
        <div className="contact-image">
          <img src={assets.contact_image} alt="Contact" />
        </div>

        <div className="contact-info">
          <p>Our Office</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, minima.</p>
          <p>+2344567654</p>
          <p>example@gmail.com</p>
          <p>Careers at TechFixPro</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <button>Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
