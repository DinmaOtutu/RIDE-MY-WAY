import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from './InlineError';
import { login } from '../actions/auth';


// eslint-disable-next-line react/prefer-stateless-function

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDetails: {
        email: '',
        password: '',
      },
      loading: false,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e) {
    this.setState({
      loginDetails:
       { ...this.state.loginDetails, [e.target.name]: e.target.value },
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const errors = this.validate(this.state.loginDetails);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.submit(this.state.loginDetails);
    }
  }
  validate(loginDetails) {
    const errors = {};
    if (!Validator.isEmail(loginDetails.email)) errors.email = 'invalid email';
    if (!loginDetails.password) errors.password = 'Enter your password';
    return errors;
  }
  submit(loginDetails) {
    this.setState({ loading: true });
    this.props.login(loginDetails).then(() => {
      if (Object.keys(this.props.user).length) {
        this.props.history.push('/dashboard');
      } else if (Object.keys(this.props.error).length) {
        this.setState({ errors: this.props.error });
      }
    });
    // this.setState({ loading: false })
    // this.props.histroy.push('/');
  }
  // submit = loginDetails => this.props.login(loginDetails)
  // .then(() => this.props.histroy.push('/'))

  render() {
    const { loginDetails, errors } = this.state;
    return (
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
            <div className="content" id="one" >
              {errors.message && <InlineError text={errors.message} />}
              <form onSubmit={this.onSubmit} id="js-login">
                <div className="form-input">
                  <label htmlFor="login-email">Email Address</label>
                  <input
                    type="email"
                    required
                    id="login-email"
                    name="email"
                    value={loginDetails.email}
                    onChange={this.onChange}
                  />
                  {errors.email && <InlineError text={errors.email} />}
                </div>

                <div className="form-input">
                  <label htmlFor="login-password">Password</label>
                  <input
                    type="password"
                    required
                    id="login-password"
                    name="password"
                    value={loginDetails.password}
                    onChange={this.onChange}
                  />
                  {errors.password && <InlineError text={errors.password} />}
                </div>

                <button onClick={this.onSubmit}className="btn btn-pri btn-block" type="submit" id="submit">{ this.state.loading ? 'Signing In...' : 'SIGN IN'}</button>
              </form>

              <p className="form-extra-info text-center"> Don&apos;t have an account, signup &nbsp;
                <Link to="/signup">here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  error: state.userReducer.error,
});
export default connect(mapStateToProps, { login })(Login);
