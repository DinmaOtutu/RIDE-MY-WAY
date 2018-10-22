import React from 'react';
import NavBarz from './Navs';
import Header from './Header';

const ConfirmRides = () => (
  <div>
    <body className="driver">
      <Header />
    
      <NavBarz />
      <div className="content">
      <div className="content-wrapper dashboard">
        <div className="box-group summary">
          <h2 className="current">
          Confirm Requests
          </h2>
          <hr />
        </div>
        <div className="order-details" id="js-order-details">
          <div>
            <table>
              <thead >
                <th>Order Id</th>
                <th>Name</th>
                <th>Location</th>
                <th>Destination</th>
                <th>Date</th>
                <th>Status</th>
              </thead>
            </table>
          </div>
        </div>
      </div>
      </div>
    </body>
  </div>

);

export default ConfirmRides;
