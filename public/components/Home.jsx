import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <React.Fragment>
      <div className="header homepage">
        <div className="navbar unauth-navbar">
          <div className="page-title">
            <h3>
              <a href="/">RIDE-MY-WAY</a>
            </h3>
          </div>
        </div>
      </div>
      <div className="main-wrapper home">
        <div className="landing">
          <h1>Best Carpooling services! <br />Join Us Today </h1>
          <div className="control-btns">
            <Link to="/login">
              <button className="btn btn-pri inline">SIGN IN</button>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
