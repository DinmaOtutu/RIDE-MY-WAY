import React from 'react';
import toggler from '../assets/css/images/toggler.png';
import notification from '../assets/css/images/notification.png';

const Header = () => (
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
          <form>
            <input type="text" name="search" value="Search for rides..." className="searchbar"onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'Search a rides...';}" required="" />
            &nbsp;&nbsp;
          </form>
          <a href="#" id="dropdown-toggler" className="link">
            <img src={notification} alt="notification bell" id="dropdown-img" />
          </a>
          <div className="dropdown-content driver-dropdown-content" id="dropdown-content">
            <a href="#" className="read">User just made a ride request</a>
            <a href="#">User just made a ride request</a>
            <a href="#" className="read">User declined an order</a>
            <a href="#">User just made a ride request</a>
            <a href="#">user accepted a ride request</a>
          </div>
        </div>
      </div>
    </div>
  </div>

);

export default Header;
