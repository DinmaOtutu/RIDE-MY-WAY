import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from './InlineError';
import { signup } from '../actions/auth';

// eslint-disable-next-line react/prefer-stateless-function
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupDetails: {
        firstname: '',
        lastname: '',
        email: '',
        city: '',
        state: '',
        phone: '',
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
      signupDetails:
       { ...this.state.signupDetails, [e.target.name]: e.target.value } 
});
  }

  onSubmit(e) {
    e.preventDefault();
    const errors = this.validate(this.state.signupDetails);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.submit(this.state.signupDetails);
    }
  }

  validate(signupDetails) {
    const errors = {};
    if (!Validator.isEmail(signupDetails.email)) errors.email = 'invalid email';
    if (!signupDetails.password) errors.password = 'Enter your password';
    return errors;
  }

  submit(signupDetails) {
    this.setState({ loading: true });
    this.props.signup(signupDetails).then(() => {
      if (Object.keys(this.props.user).length) {
        this.props.history.push('/');
      } else if (Object.keys(this.props.error).length) {
        this.setState({ errors: this.props.error });
      }
    });
  }
  render() {
    const { signupDetails, errors } = this.state;
    return (
      <div className="signup">
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
              <h2>YOUR COMFORT? OUR PRIORITY</h2>
              <hr className="w-75" />
            </div>

            <div className="content" id="one">
              {errors.message && <InlineError text={errors.message} />}
              <form onSubmit={this.submit}id="js-signup" method="POST">
                <div className="form-input">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    required
                    id="email"
                    name="email"
                    value={signupDetails.email}
                    onChange={this.onChange}
                  />
                  {errors.email && <InlineError text={errors.email} />}
                </div>

                <div className="form-input">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    required
                    id="firstname"
                    name="firstname"
                    value={signupDetails.firstname}
                    onChange={this.onChange}
                  />
                  {errors.firstname && <InlineError text={errors.firstname} />}
                </div>

                <div className="form-input">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    required
                    id="lastname"
                    name="lastname"
                    value={signupDetails.lastname}
                    onChange={this.onChange}
                  />
                  {errors.lastname && <InlineError text={errors.lastname} />}
                </div>

                <div className="form-input">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    required
                    id="city"
                    name="city"
                    value={signupDetails.city}
                    onChange={this.onChange}
                  />
                  {errors.city && <InlineError text={errors.city} />}
                </div>

                <div className="form-input">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    required
                    id="state"
                    name="state"
                    value={signupDetails.state}
                    onChange={this.onChange}
                  />
                  {errors.state && <InlineError text={errors.state} />}
                </div>

                <div className="form-input">
                  <label htmlFor="number">Phone Number</label>
                  <input
                    type="number"
                    required
                    id="number"
                    name="phone"
                    value={signupDetails.phone || ''}
                    onChange={this.onChange}
                  />
                  {errors.phone && <InlineError text={errors.phone} />}
                </div>

                <div className="form-input">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    required
                    id="password"
                    name="password"
                    value={signupDetails.password}
                    onChange={this.onChange}
                  />
                  {errors.password && <InlineError text={errors.password} />}
                </div>

                <button onClick={this.onSubmit} className="btn btn-pri btn-block" type="submit">SIGN UP</button>
              </form>
              <p className="form-extra-info text-center">Already have an account, login &nbsp;
                <Link to="/login">here</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  signup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  error: state.userReducer.error,
});

export default connect(mapStateToProps, { signup })(SignUp);
