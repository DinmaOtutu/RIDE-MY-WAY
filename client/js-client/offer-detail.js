const displayLetter = document.querySelector('.username-circle p');
const displayFirstName = document.querySelector('p.hide');
const user = JSON.parse(window.localStorage.getItem('user'));
const rideId = new URL(window.location.href).searchParams.get('id');

// attach first letter of first name
displayLetter.textContent = (
  user.firstname.slice(0, 1)
)
  .toUpperCase() + displayLetter.textContent;

if (displayFirstName) {
  displayFirstName.textContent = user.firstname;
}

const route = `/api/v1/rides/${rideId}`;
const headers = new Headers({
  'x-access-token': window.localStorage.getItem('token'),
});
fetch(route, {
  method: 'GET',
  headers,
})
  .then(res => Promise.all([res.json(), res]))
  .then(async ([data, res]) => {
    if (!res.ok) {
      // add error status handling here
      alert(JSON.stringify(data));
    } else {
      // does a request exist for this ride?
      const exists = await requestRide(data.ride.id, true)();
      const order = document.getElementById('js-order-confirmation');
      order.innerHTML = `
        <div>
        <h2>Ride Details</h2>
        <h3>Please ensure to be at the pick up location five minutes before departure time.
        </h3>
        </div>
        <hr>
        <div class="order-summary">
          <div class="control-btns">
            <h3> &nbsp;Driver Name: &nbsp; ${data.ride.driver_name} <br><br>&nbsp;Car Model: &nbsp;Toyota Corolla &nbsp;
            <br><br>&nbsp;Car Model: &nbsp;${data.ride.car_model} &nbsp;
            <br><br>&nbsp;Car Make: &nbsp;${data.ride.car_make} &nbsp;
            <br><br>&nbsp;Pick Up Point:  &nbsp;${data.ride.pickup_location} &nbsp;
            <br><br>&nbsp;Price:  &nbsp;${data.ride.price} &nbsp;
            <br><br>&nbsp;Schedule: &nbsp;${
  common.toLocaleDateString({
    date: data.ride.departure_date,
    time: data.ride.departure_time,
  })} &nbsp;
            <br><br>&nbsp;City - from: &nbsp;${data.ride.city_from} &nbsp;
            <br><br>&nbsp;City - to: &nbsp;${data.ride.city_to} &nbsp;
            <br><br>&nbsp;State - from: &nbsp;${data.ride.state_from} &nbsp;
            <br><br>&nbsp;State - to: &nbsp;${data.ride.state_to} &nbsp;
            &nbsp; &nbsp;  
            </h3>
          </div>
          <hr>
          <div class="control-btns">
            <a href="./rides-confirmation.html">
              <button class="btn btn-pri">back</button>
            </a>
            <button class="btn btn-pri" ${exists ? 'id = "cancel" style="background-color:#cd6a52;border:#cd6a52;">Cancel' : 'id = "confirm">Confirm'}</button>
            <div id="myModal1" class="modal">
              <div class="modal-header">
              <div class="modal-content">
              <span class="close">&times;</span>
              <h3> Thank you, a request has been created and a notification will be sent to you!</h3>
              </div>
            </div>
          </div>    
        </div>
        </div>
          `;
      try {
        document.getElementById('confirm')
          .addEventListener('click', requestRide(rideId));
        document.getElementById('cancel')
          .addEventListener('click', requestRide(rideId, null, true));
      } catch (error) {
        console.log(error);
      }
    }
  });
