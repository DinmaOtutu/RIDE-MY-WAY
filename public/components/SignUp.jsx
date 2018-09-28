import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => (
  <div className="signup">
    <div className="header unauth">
      <div className="navbar">
        <div className="page-title">
          <h3>
            <a href="./index.html">Ride-My-Way</a>
          </h3>
        </div>
      </div>
    </div>
    <div className="main-wrapper auth-wrapper">
      <div className="auth">
        <div className="title">
          <h2>YOUR COMFORT? OUR PRIORITY</h2>
          <hr className="w-75" />
        </div>

        <div className="content" id="one">
          <form id="js-signup" method="POST">
            <div className="form-input">
              <label htmlFor="email">Email Address</label>
              <input type="email" required id="email" name="email" value="" />
            </div>

            <div className="form-input">
              <label htmlFor="firstname">First Name</label>
              <input type="text" required id="firstname" name="firstname" value="" />
            </div>

            <div className="form-input">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" required id="lastname" name="lastname" value="" />
            </div>

            <div className="form-input">
              <label htmlFor="city">City</label>
              <input type="text" required id="city" name="city" value="" />
            </div>

            <div className="form-input">
              <label htmlFor="state">State</label>
              <input type="text" required id="state" name="state" value="" />
            </div>

            <div className="form-input">
              <label htmlFor="number">Phone Number</label>
              <input type="tel" required id="number" name="number" value="" />
            </div>

            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input type="password" required id="password" name="password" value="" />
            </div>

            <button className="btn btn-pri btn-block" type="submit">SIGN UP</button>
          </form>
          <p className="form-extra-info text-center">Already have an account, login &nbsp;
            <Link to="/login">here</Link>
          </p>

        </div>
      </div>
    </div>
  </div>

);

export default SignUp;
