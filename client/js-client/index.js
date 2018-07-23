const token = localStorage.getItem('token');
const url = new URL(location.href);
const redirect = url.searchParams.get('red');
if (token) {
  fetch('/api/v1/rides', {
    headers: new Headers({
      'x-access-token': token,
    }),
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data.rides.length)
    .then((isAuth) => {
      if (isAuth && !redirect) {
        location.href = 'user-dashboard.html';
      } else localStorage.clear();
    });
} else {
  localStorage.clear();
}
