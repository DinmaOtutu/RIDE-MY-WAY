const displayLetter = document.querySelector('.username-circle p');
const back = document.getElementById('js-back');
const message = document.getElementById('js-err-message');
const status = document.getElementById('js-err-status');
const name = document.getElementById('js-err-name');

back.addEventListener('click', Common.redirect);

const user = JSON.parse(localStorage.getItem('user'));
const errMessage = sessionStorage.getItem('error');
const errStatus = sessionStorage.getItem('status');
sessionStorage.clear();

status.textContent = `Error ${errStatus || 500}`;

const errName = (() => {
  switch (+errStatus) {
    case 400: return 'Bad Request';
    case 404: return 'Not Found';
    case 401: return 'Not Authorised';
    case 403: return 'Forbidden';
    case 409: return 'Conflict';
    default: return 'Internal Server Error';
  }
})();

name.innerHTML = `
      <em>${errName}</em>
    `;

message.innerHTML = `
    <p>${errMessage}</p>
  `;
// attach first letter of first name
if (user) {
  displayLetter.textContent = (
    user.firstname.slice(0, 1)
  )
    .toUpperCase() + displayLetter.textContent;
}
