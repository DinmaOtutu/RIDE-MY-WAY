import React from 'react';
import NavBar from './NavBar';
import DashBoardForms from './DashboardForms';
import toggler from '../assets/css/images/toggler.png';
import notification from '../assets/css/images/notification.png';

const Dashboard = () => (
  <div>
    <div className="driver">
      <div className="header">
        <div className="navbar">
          <div className="offer-control d-none-md">
            <a href="#sidenav" className="d-none-md">
              <img src={toggler} alt="toggler" />
            </a>
          </div>
          <div className="page-title d-flex-md">
            <div className="date" id="js-welcome" />
          </div>
          <div className="navlinks driver-nav">
            <div className="dropdown notification">
              <a href="#" id="dropdown-toggler" className="link">
                <img src={notification} alt="notification bell" id="dropdown-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="content" id="has-modal">
        <NavBar />
        <div className="content-wrapper ridez offer-ridez">
          <div className="date d-none-md" />
          <div className="selectdate-div d-flex-md">
            <input type="date" id="selectdate" />
          </div>
          <div className="top">
            <h2 id="offer-modal-btn">
          Make a Ride Offer
            </h2>
          </div>
          <div className="page-heading">

            <hr className="w-90" />
          </div><br /><br />
          <div className="main-wrapper auth-wrapper">
            <div className="auth">
              <div className="content">
                <div className="offer-create">

                  <DashBoardForms />
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      {/* <Footer /> */}
      {/* <div className="modal" id="notif-modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="close">
              <a href="#" aria-hidden="true" id="modal-close-icon">&times;</a>
            </div>
          </div>

        </div>
      </div> */}
    </div>
  </div>
);

export default Dashboard;
