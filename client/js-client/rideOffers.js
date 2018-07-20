const displayLetter = document.querySelector('.username-circle p');
    const offersWrapper = document.getElementById('one');

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;

  // attach first letter of first name
  displayLetter.textContent = (
    user.firstname.slice(0, 1)
  )
    .toUpperCase() + displayLetter.textContent;

  const route = '/api/v1/rides';
  const processGetOffers = () => {
    const token = localStorage.getItem('token');
    const headers = new Headers({
      'x-access-token': token,
    });

    fetch(route, {
      method: 'GET',
      headers,
    })
      .then(res => Promise.all([res.json(), res]))
      .then(([data, res]) => {
        if (!res.ok) {
          // add error handling here
          return alert(JSON.stringify(data));
        }
        if (!data.rides.length) {
          // no rides
          offersWrapper.innerHTML = `
            <h2>No Available Ride Offers At The Moment</h2>
            <hr>
            ${offersWrapper.innerHTML}
          `;
          return offersWrapper.removeChild(offersWrapper.querySelector('progress'));
        }

        offersWrapper.innerHTML = `
            <h2>Current Available Rides</h2>
            <hr>
            ${offersWrapper.innerHTML}`;

        offersWrapper.removeChild(offersWrapper.querySelector('progress'));

        return data.rides.forEach((ride, index) => {
          const localeTime = common.toLocaleDateString({
            date: ride.departure_date,
            time: ride.departure_time,
          });

          /* eslint-disable no-nested-ternary */
          const actionButton = `
          <button 
          ${
  +userId === +ride.user_id
    ? common.isFrozen(ride)
      ? 'class="btn btn-pri change" disabled style="background-color:#848b85;border:1px #848b85;color:#585656;cursor:default;">remove'
      : 'class="btn btn-pri change" style="background-color:#cd6a52;border:#cd6a52;">remove'
    : 'class="btn btn-pri change">select'
}</button>
          `;

          offersWrapper.querySelector('#js-order-summary').innerHTML += `
            <div>
            <h3>${index + 1}.&nbsp;${ride.driver_name} | ${ride.city_from} TO ${ride.city_to} &nbsp; | PICKUP- ${ride.pickup_location}<BR>
              &nbsp; &nbsp;<a href=""#""> <br>
              ${+userId === +ride.user_id && common.isFrozen(ride) ? '' : `<a href="./user-order-details.html${+userId === +ride.user_id && !common.isFrozen(ride) ? `?remove=true&id=${ride.id}` : ''}">`}
              ${actionButton}</a>&nbsp; 
              &nbsp;${localeTime}
            </h3>
            </div>
            ${index + 1 === data.rides.length ? '' : '<hr>'}
            `;
        });
      })
      .catch(error => common.errorHandler(error));
  };

  window.addEventListener('load', processGetOffers);


