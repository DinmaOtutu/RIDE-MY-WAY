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
    .then(([data, res]) => {
      if (data.user) {
        // logged in successfully, redirect
        common.allow();
        return common.store({
          token: data.token, user: data.user,
        });
      }
      return alert(JSON.stringify(data));
    })
    .catch((error) => {
      // no network or some other reason
      common.errorHandler(error);
    });
};
loginForm.addEventListener('submit', processLogin);

