
const signupForm = document.getElementById('js-signup');
const email = document.getElementById('email');
const password = document.getElementById('password');
const firstname = document.getElementById('firstname');

const route = '/api/v1/auth/signup';

const processSignup = (evt) => {
  evt.preventDefault();
  const headers = new Headers({
    'content-type': 'application/json',
  });

  const body = {
    email: signupForm.email.value,
    phone: signupForm.number.value,
    password: signupForm.password.value,
    firstname: signupForm.firstname.value,
    lastname: signupForm.lastname.value,
    city: signupForm.city.value,
    state: signupForm.state.value,
    carModel: signupForm.carmodel.value,
    carMake: signupForm.carmake.value,
  };

  fetch(route, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
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

        notif.textContent = data.message;
        switch (true) {
          case res.status === 409:
            email.focus();
            break;
          case res.status === 422 && !!data.errors.email:
            email.focus();
            email.style.setProperty('background', '#fa2e2e73');
            password.removeAttribute('style');
            notif.textContent = 'Please enter a valid Email address';
            break;
          case res.status === 422 && !!data.errors.passwordType:
            password.focus();
            password.style.setProperty('background', '#fa2e2e73');
            email.removeAttribute('style');
            notif.textContent = 'Password should comprise letters and numbers and have min length of 8';
            break;
          default:
            firstname.focus();
            notif.textContent = 'Required fields cannot be empty strings';
            email.removeAttribute('style');
            password.removeAttribute('style');
        }

        notifDiv.innerHTML = '';
        notifDiv.appendChild(notif);

        const parentDiv = document.getElementById('one');
        const oldNotif = parentDiv.querySelector('#notif-div');
        if (oldNotif) parentDiv.removeChild(oldNotif);
        return parentDiv.prepend(notifDiv);
      }
      Common.allow();
      return Common.store({
        token: data.token, user: data.user,
      });
    })
    .catch(error => Common.errorHandler(error));
};

signupForm.addEventListener('submit', processSignup);

