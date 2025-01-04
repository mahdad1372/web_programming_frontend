import React, { useRef } from "react";
const footer = () => {

  return (
    <div className="container-fluid footer">
    <div className="row">
      <div className="col-lg-3 text-center">
        <p className="title_footer">
          Menu
        </p>
        <p>Deals</p>
        <p>Food</p>
        <p>Beverages</p>
        <p>HouseHold</p>
        <p>Personal Care</p>
        <p>My Orders</p>
      </div>
      <div className="col-lg-3 text-center">
        <p className="title_footer">
          Categories
        </p>
        <p>Vegetables</p>
        <p>Bakery</p>
        <p>Wine</p>
        <p>Dairy & Eggs</p>
        <p>Meat & Poultry</p>
        <p>Soft Drinks</p>
        <p>Cleaning Supplies</p>
        <p>Cereal & Snacks</p>
      </div>
      <div className="col-lg-3 text-center">
        <p className="title_footer">
          Info
        </p>
        <p>FAQ</p>
        <p>About us</p>
        <p>Customer Support</p>
        <p>Locations</p>
      </div>
      <div className="col-lg-3 text-center">
        <p className="title_footer">
          My choises
        </p>
        <p>Favorites</p>
        <p>My Orders</p>
      </div>
    </div>

  </div>
  );
};

export default footer;