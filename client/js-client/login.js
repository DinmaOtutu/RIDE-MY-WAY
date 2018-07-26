const email = document.getElementById('login-email');
const password = document.getElementById('login-password');
const loginForm = document.getElementById('js-login');
const route = '/api/v1/auth/login';

const processLogin = (evt) => {
  evt.preventDefault();
  const headers = new Headers({
    'content-type': 'application/json',
  });
  const body = {
    email: email.value,
    password: password.value,
  };
  fetch(route, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  })
    .then(res => Promise.all([res.json(), res]))
    .then(([data]) => {
      if (data.user) {
        // logged in successfully, redirect
        Common.allow();
        evt.target.removeEventListener(evt.type, processLogin);
        return Common.store({
          token: data.token,
          user: data.user,
        });
      }
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

      if (data.message.includes('email')) {
        email.focus();
        email.style.setProperty('background', '#fa2e2e73');
        password.style.setProperty('background', 'initial');
      }

      if (data.message.includes('password')) {
        password.focus();
        password.style.setProperty('background', '#fa2e2e73');
        email.style.setProperty('background', 'initial');
      }

      if (data.message.includes('Validation error')) {
        notif.textContent = 'Email or Password format incorrect';
        email.style.setProperty('background', 'initial');
        password.style.setProperty('background', 'initial');
      }

      notifDiv.innerHTML = '';
      notifDiv.appendChild(notif);

      const parentDiv = document.getElementById('one');
      const oldNotif = parentDiv.querySelector('#notif-div');
      if (oldNotif) parentDiv.removeChild(oldNotif);
      return parentDiv.prepend(notifDiv);
    })
    .catch((error) => {
      // no network or some other reason
      Common.errorHandler(error);
    });
};
loginForm.addEventListener('submit', processLogin);
