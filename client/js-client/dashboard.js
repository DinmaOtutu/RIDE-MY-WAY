// display user name
const welcome = document.getElementById('js-welcome');
const displayName = document.getElementById('js-user');
const displayLetter = document.querySelector('.username-circle p');

const user = JSON.parse(localStorage.getItem('user'));

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
const alertModal = document.getElementById('myModal');
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
        return alert(JSON.stringify(data));
      }
      alertModal.style.setProperty('display', 'block');
      rideForm.reset();
      return setTimeout(
        () => alertModal.style.setProperty('display', 'none'),
        3000,
      );
    })
    .catch(error => common.errorHandler(error));
};
rideForm.addEventListener('submit', processNewRide);
