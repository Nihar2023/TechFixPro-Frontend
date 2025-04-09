import React from "react";
import "./Reviews.css";

const reviews = [
  {
    name: "John Doe",
    review: "TechFixPro provided an amazing service! My phone was repaired quickly and the pickup option was super convenient.",
    rating: 5
  },
  {
    name: "Sarah Lee",
    review: "Highly recommend TechFixPro! The staff was very professional, and I loved the seamless booking process.",
    rating: 4.5
  },
  {
    name: "Michael Smith",
    review: "Great experience! The repair was done on time, and the customer support was extremely helpful.",
    rating: 5
  }
];

const Reviews = () => {
  return (
    <div className="reviews-section">
      <h2 className="reviews-title">What Our Customers Say</h2>
      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <h3 className="review-name">{review.name}</h3>
            <p className="review-text">"{review.review}"</p>
            <p className="review-rating">⭐ {review.rating} / 5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;