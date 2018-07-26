const displayLetter = document.querySelector('.username-circle p');
  const displayFirstName = document.querySelector('p.hide');
  const user = JSON.parse(window.localStorage.getItem('user'));
  const rideId = new URL(window.location.href).searchParams.get('id');

  if (!user) {
    return Common.errorHandler({
      message: 'Cannot access requested resource',
    }, 401);
  }

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

  /* eslint-disable no-nested-ternary */
  return fetch(route, {
    method: 'GET',
    headers,
  })
    .then(res => Promise.all([res.json(), res]))
    .then(async ([data, res]) => {
      if (!res.ok) {
        // add error status handling here
        Common.errorHandler(data, res.status);
      } else {
        // does a request exist for this ride?
        const exists = await requestRide(data.ride.id, true)();
        if (exists) {
          if (exists.accepted === true) exists.accepted = '<span class="success">Accepted</span>';
          if (exists.accepted === false) exists.accepted = '<span class="danger">Rejected</span>';
          if (exists.accepted === null) exists.accepted = '<span class="warning">Pending</span>';
        }
        const accepted = exists.accepted || undefined;
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
  Common.toLocaleDateString({
    date: data.ride.departure_date,
    time: data.ride.departure_time,
  })} &nbsp;
            <br><br>&nbsp;City - from: &nbsp;${data.ride.city_from} &nbsp;
            <br><br>&nbsp;City - to: &nbsp;${data.ride.city_to} &nbsp;
            <br><br>&nbsp;State - from: &nbsp;${data.ride.state_from} &nbsp;
            <br><br>&nbsp;State - to: &nbsp;${data.ride.state_to} &nbsp;
            ${exists
    ? `<br><br>&nbsp;Request status: &nbsp;${exists.accepted} &nbsp;`
    : ''}
            &nbsp; &nbsp;  
            </h3>
          </div>
          <hr>
          <div class="control-btns">
            <a href="./rides-confirmation.html">
              <button class="btn btn-pri">back</button>
            </a>
            <button class="btn btn-pri" 
            ${exists
    ? accepted.includes('Pending')
      ? 'id = "cancel" style="background-color:#cd6a52;border:#cd6a52;">Cancel Request'
      : 'class="btn btn-pri" disabled style="background-color:#848b85;border:1px #848b85;color:#585656;cursor:default;">Cancel Request'
    : 'id = "confirm">Confirm'
}</button>
        </div>
        </div>
          `;
        const confirm = document.getElementById('confirm');
        const cancel = document.getElementById('cancel');
        if (confirm) confirm.addEventListener('click', requestRide(rideId));
        if (cancel) cancel.addEventListener('click', requestRide(rideId, null, true));
      }
    });
