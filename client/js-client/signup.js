const signupForm = document.getElementById('js-signup');
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
  };

  fetch(route, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  })
    .then(res => Promise.all([res.json(), res]))
    .then(([data, res]) => {
      if (!res.ok) {
        return alert(JSON.stringify(data));
      }
      common.allow();
      return common.store({
        token: data.token, user: data.user,
      });
    })
    .catch(error => common.errorHandler(error));
};

signupForm.addEventListener('submit', processSignup);

