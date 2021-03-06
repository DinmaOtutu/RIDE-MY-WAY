import React from 'react';
import { Link } from 'react-router-dom';

const Navbarz = () => (
  <div className="content" id="has-modal">
    <div className="sidenav" id="sidenav">
      <div className="sidenav-content">
        <div className="sidenav-header">
          <div className="close d-none-md">
            <a href="#" aria-hidden="true">&times;</a>
          </div>
          <div className="sidenav-title">
            <h3>
              <a href="../index.html">RIDE-MY-WAY</a>
            </h3>
            <div className="username-circle">
              <p />
            </div>
            <p id="js-user" />
            <span>
              <a href="./index.html?red=2">Logout</a>
            </span>
          </div>
        </div>
        <div className="sidenav-body">
          <Link to="/dashboard" className="offer-item">Dashboard</Link>
          <Link to="/rides" className="offer-item">View Rides</Link>
          <Link to="/confirm-rides" className="offer-item">Confirmations</Link>
          <Link to="/history" className="offer-item active">History</Link>

        </div>
      </div>
    </div>
  </div>
);

export default Navbarz;
