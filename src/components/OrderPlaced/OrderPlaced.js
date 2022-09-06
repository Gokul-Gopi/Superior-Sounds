import React from "react";
import "../OrderPlaced/OrderPlaced.css";
import orderPlacedImage from "../../assets/order-placed.svg";

const OrderPlaced = () => {
  return (
    <div className="order-placed-page">
      <div className="image-container">
        <p>Order placed successfully!</p>
        <img src={orderPlacedImage} alt="order placed" />
      </div>
    </div>
  );
};

export default OrderPlaced;
