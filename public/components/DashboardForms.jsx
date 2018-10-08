import React, { Component } from 'react';
import { connect } from 'react-redux';
import createRideAction from '../actions/createRideAction';


// eslint-disable-next-line react/prefer-stateless-function

class DashBoardForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createRideDetails: {
        stateFrom: '',
        stateTo: '',
        departureTime: '',
        departureDate: '',
        price: '',
        pickupLocation: '',
        cityTo: '',
        cityFrom: '',
      },
      loading: false,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChange(e) {
    this.setState({
      createRideDetails:
         { ...this.state.createRideDetails, [e.target.name]: e.target.value },
    });
  }

  onSubmit(errors) {
    errors.preventDefault();
    // if (Object.keys(errors).length === 0) {
    this.submit(this.state.createRideDetails);
    // }
  }
  submit(createRideDetails) {
    this.setState({ loading: true });
    this.props.createRideAction(createRideDetails);
    // this.props.createRideAction(createRideDetails).then(() => {
    //   if (Object.keys(this.props.rides).length) {
    //   } else if (Object.keys(this.props.error).length) {
    //     this.setState({ errors: this.props.error });
    //   }
    // });
    // this.setState({ loading: false })
    // this.props.histroy.push('/');
  }


  render() {
    const { createRideDetails, errors } = this.state;
    return (
      <div className="dashboardForms">
        <form id="js-ride">
          <div className="form-input">
            <label htmlFor="statefrom"> State From</label>
            <input type="text" id="statefrom" name="stateFrom" value={createRideDetails.stateFrom} onChange={this.onChange} />
          </div>

          <div className="form-input">
            <label htmlFor="stateto"> State To</label>
            <input type="text" required id="stateto" name="stateTo" value={createRideDetails.stateTo} onChange={this.onChange} />
          </div>

          <div className="form-input">
            <label htmlFor="departuretime">Departure Time</label>
            <input type="time" required id="departuretime" name="departureTime" value={createRideDetails.departureTime} onChange={this.onChange} />
          </div>

          <div className="form-input">
            <label htmlFor="departuredate"> Departure Date</label>
            <input type="date" required id="departuredate" value={createRideDetails.departureDate} onChange={this.onChange} name="departureDate" />
          </div>

          <div className="form-input">
            <label htmlFor="price"> Price</label>
            <input type="number" min="1" step="any" maxLength="20" required id="price" name="price" value={createRideDetails.price} onChange={this.onChange} />
          </div>

          <div className="form-input">
            <label htmlFor="pickup"> Pickup Location</label>
            <input type="text" required id="pickup" name="pickupLocation" value={createRideDetails.pickupLocation} onChange={this.onChange} />
          </div>

          <div className="form-input">
            <label htmlFor="cityto"> City To</label>
            <input type="text" required id="cityto" name="cityTo" value={createRideDetails.cityTo} onChange={this.onChange} />
          </div>

          <div className="form-input">
            <label htmlFor="cityfrom"> City From</label>
            <input type="text" required id="cityfrom" name="cityFrom" value={createRideDetails.cityFrom} onChange={this.onChange} />
          </div>


          <div className="form-input">
            {/* <!-- <a href="./dashboard.html"  class="offer-item"> --> */}
            <button onClick={this.onSubmit} className="btn btn-pri" id="myBtn">Create</button>
          </div>
          {/* <!-- </a> -->
                   <!-- The Modal --> */}
          <div id="myModal" className="modal">

            {/* <!-- Modal content --> */}
            <div className="modal-header">
              <div className="modal-content">
                <div className="modal-body">
                  <span className="close">&times;</span>
                </div>
              </div>
              <div className="modal-footer" />


            </div>
          </div>

        </form>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  rides: state.ridesReducer.rides,
  error: state.ridesReducer.error,
});
export default connect(mapStateToProps, { createRideAction })(DashBoardForms);
