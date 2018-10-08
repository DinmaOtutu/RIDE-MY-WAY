import React from 'react';
import { Link } from 'react-router-dom';

const ViewRidesHeader = () => (
  <div className="header">
    <div className="navbar white-navbar">
      <div className="page-title">
        <h3>
          <Link to="/">RIDE-MY-WAY</Link>
        </h3>
      </div>

      <div className="navlinks">
        <div className="dropdown notification">
          <a href="#" id="dropdown-toggler" className="link">
            <img src="./css/images/notification.png" alt="notification bell" id="dropdown-img" />
          </a>

          <div className="dropdown-content driver-dropdown-content" id="dropdown-content">
            <a href="#" className="read">User just made a ride request</a>
            <a href="#">User just made a ride request</a>
            <a href="#" className="read">User declined an order</a>
            <a href="#">User just made a ride request</a>
            <a href="#">user accepted a ride request</a>
          </div>
        </div>

        <div className="user-info">
          <div className="dropdown">
            <a href="#" className="link circle circle-click">
              <div className="username-circle circle-click">
                <p className="circle-click">D&#9663;</p>
              </div>
            </a>
            <div className="dropdown-content profile profile-dropdown-content" id="dropdown-content">
              <a href="./user-offer.html" id="user-offer">offer</a>
              <a href="./user-order-history.html" id="user-order-history">Order History</a>
              <a href="./index.html" id="logout">Logout</a>
            </div>
          </div>

          <p className="hide d-lg">Dinma</p>
        </div>
      </div>
    </div>
  </div>
);

export default ViewRidesHeader;

