const welcome = document.getElementById('js-welcome');
  const displayName = document.getElementById('js-user');
  const displayLetter = document.querySelector('.username-circle p');
  const modal = document.getElementById('notif-modal');
  const dateInput = document.getElementById('departuredate');
  const timeInput = document.getElementById('departuretime');

  const formatDateToString = (date) => {
    const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

    const MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);

    const yyyy = date.getFullYear();
    return (`${yyyy}-${MM}-${dd}`);
  };

  // one year
  let date = new Date(Date.now() + (1000 * 60 * 60 * 24 * 365));
  const dateMax = formatDateToString(date);
  // today, 8 hours from now
  date = new Date((Date.now() + (1000 * 60 * 60 * 8)));
  const dateMin = formatDateToString(date);
  const timeStr = (new Date(Date.now() + (1000 * 60 * 60 * 8)))
    .toLocaleTimeString(undefined, { hour12: false });
  const timeMin = timeStr.slice(0, timeStr.lastIndexOf(':'));
  dateInput.setAttribute('max', dateMax);
  dateInput.setAttribute('min', dateMin);
  timeInput.setAttribute('min', timeMin);

  const modalHeader = modal.querySelector('.modal-header');

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return Common.errorHandler({
      message: 'Cannot access requested resource',
    }, 401);
  }

  const h2 = document.createElement('h2');
  welcome.appendChild(h2);
  const greeting = document.createTextNode(`Hello, ${user.firstname}`);
  h2.appendChild(greeting);
  h2.style.setProperty('text-transform', 'capitalize');
  displayName.textContent = user.firstname;

  // attach first letter of first name
  displayLetter.textContent = (
    user.firstname.slice(0, 1)
  )
    .toUpperCase() + displayLetter.textContent;

  const rideForm = document.getElementById('js-ride');
  const token = localStorage.getItem('token');
  const processNewRide = (evt) => {
    evt.preventDefault();
    const headers = new Headers({
      'content-type': 'application/json',
      'x-access-token': token,
    });
    const body = {
      cityFrom: rideForm.cityfrom.value,
      cityTo: rideForm.cityto.value,
      stateFrom: rideForm.statefrom.value,
      stateTo: rideForm.stateto.value,
      departureTime: rideForm.departuretime.value,
      price: rideForm.price.value,
      pickupLocation: rideForm.pickup.value,
      departureDate: rideForm.departuredate.value,
    };
    const route = '/api/v1/users/rides';

    fetch(route, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then(res => Promise.all([res.json(), res]))
      .then(([data, res]) => {
        if (!res.ok) {
          const notifDiv = document.createElement('div');
          notifDiv.setAttribute('id', 'notif-div');
          notifDiv.style.setProperty('background', 'hsl(206, 21%, 94%)');
          notifDiv.style.setProperty('color', '#ea0f0f');
          notifDiv.style.setProperty('display', 'flex');
          notifDiv.style.setProperty('font-size', '1.2em');
          notifDiv.style.setProperty('flex-flow', 'row wrap');
          notifDiv.style.setProperty('justify-content', 'center');
          notifDiv.style.setProperty('font-weight', '600');
          notifDiv.style.setProperty('border', '1px solid #c9c3c5');
          notifDiv.style.setProperty('padding', '0 5px');

          const notif = document.createElement('p');
          notif.style.setProperty('margin', 'unset');
          notif.style.setProperty('margin-top', 'auto');
          notif.style.setProperty('margin-bottom', 'auto');

          switch (res.status) {
            case (409):
              rideForm.departuretime.focus();
              rideForm.departuretime.style.setProperty('background', '#fa2e2e73');
              notif.textContent = `${data.message}!.
          At ${
  new Date(data.conflictingRide.departure_date
    .split('T')[0]
    .concat(' ', data.conflictingRide.departure_time))
}`;
              break;

            default: notif.textContent = 'Undefined error in form';
          }

          notifDiv.innerHTML = '';
          notifDiv.appendChild(notif);

          const parentDiv = document.getElementById('js-offer');
          const oldNotif = parentDiv.querySelector('#notif-div');
          if (oldNotif) parentDiv.removeChild(oldNotif);
          return parentDiv.prepend(notifDiv);
        }
        rideForm.reset();
        modalHeader.innerHTML += `<p style='font-size:larger;color:green;'>
        Ride successfully created!
        </p>
        `;
        modal.style.setProperty('display', 'block');
        return setTimeout(() => {
          modalHeader.removeChild(modalHeader.querySelector('p'));
          modal.style.setProperty('display', 'none');
          location.reload();
        }, 2000);
      })
      .catch(error => Common.errorHandler(error));
  };
  rideForm.addEventListener('submit', processNewRide);