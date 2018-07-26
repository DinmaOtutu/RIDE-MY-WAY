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
const timeMin = (new Date(Date.now() + (1000 * 60 * 60 * 8)))
  .toLocaleTimeString(undefined, { hour12: false });
dateInput.setAttribute('max', dateMax);
dateInput.setAttribute('min', dateMin);
timeInput.setAttribute('min', timeMin);

const modalHeader = modal.querySelector('.modal-header');

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
      rideForm.reset();
      modalHeader.innerHTML += `<p style='font-size:larger;color:green;'>
        Ride successfully created!
        </p>
        `;
      modal.style.setProperty('display', 'block');
      return setTimeout(() => {
        modalHeader.removeChild(modalHeader.querySelector('p'));
        modal.style.setProperty('display', 'none');
      }, 2000);
    })
    .catch(error => common.errorHandler(error));
};
rideForm.addEventListener('submit', processNewRide);
