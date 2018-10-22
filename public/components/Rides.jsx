import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAllRidesAction from '../actions/getRides';
import ViewRidesHeader from './ViewRidesHeader';

class ViewRides extends Component {
  componentWillMount() {
    this.props.getAllRidesAction();
  }

  render() {
    const { allRides } = this.props;
    return (
      <div>
        <div className="user">
          <ViewRidesHeader />
          <div className="main-wrapper" id="has-modal">
            <div className="order-confirmation">
              <div id="one">
                <h2>Current Available Rides</h2>
                <hr />
                <div className="order-summary">

                  {
                  allRides ?
                  (
                    allRides.map(ride => (
                      <div>
                        <h3>
                          {ride.id}.&nbsp; {ride.driver_name} | {ride.city_from} TO { ride.city_to} &nbsp; | ROUTE- {ride.pickup_location}
                          <br />
                          <a href="./user-order-details.html">
                            <button className="btn btn-pri change">
                            View Details
                            </button>
                          </a>
                          {ride.depature_time}
                        </h3>
                      </div>
                    ))
                  )
                  :
                    <p>Loading...</p>
                }
                  <div className="control-btns">
                    <a href="./user-dashboard.html">
                      <button className="btn btn-sec">Back</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allRides: state.ridesReducer.allRides.rides,
});

export default connect(mapStateToProps, { getAllRidesAction })(ViewRides);
