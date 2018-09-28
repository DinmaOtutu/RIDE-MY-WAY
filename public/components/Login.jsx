import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => (
  <div className="login">
    <div className="header unauth">
      <div className="navbar">
        <div className="page-title">
          <h3>
            <Link to="/">Ride-My-Way</Link>
          </h3>
        </div>
      </div>
    </div>
    <div className="main-wrapper auth-wrapper">
      <div className="auth">
        <div className="title">
          <h2>Welcome</h2>
          <hr className="w-75" />
        </div>

        <div className="content" id="one">
          <form action="./user-dashboard.html" method="post" id="js-login">
            <div className="form-input">
              <label htmlFor="login-email">Email Address</label>
              <input type="email" required id="login-email" name="email" value="" />
              <p id="eemail" />
            </div>

            <div className="form-input">
              <label htmlFor="login-password">Password</label>
              <input type="password" required id="login-password" name="password" value="" />
              <p id="epassword" />
            </div>

            <button className="btn btn-pri btn-block" type="submit" id="submit">SIGN IN</button>
          </form>

          <p className="form-extra-info text-center"> Don&apos;t have an account, signup &nbsp;
            <Link to="/signup">here</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
