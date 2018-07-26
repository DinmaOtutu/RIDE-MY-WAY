class Common {
  static store({
    token, user,
  }) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  static errorHandler(error, status) {
    location.href = 'error.html';
    sessionStorage.setItem('error', error.stack || error.serverError || error.message);
    if (status) sessionStorage.setItem('status', status);
  }

  static allow() {
    window.location.href = '/user-dashboard.html';
  }

  static auth(token) {
    const headers = new Headers({
      'x-access-token': token,
    });
    // check that token is valid
    return fetch('/api/v1/rides', {
      method: 'GET',
      headers,
    })
      .then(res => res.ok);
  }

  static formatDate({ date, time }) {
    return new Date(`${date.split('T')[0]}T${time}`);
  }

  static toLocaleDateString({
    date, time,
  }) {
    return Common.formatDate({ date, time })
      .toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
  }

  static isFrozen({ departure_time: departureTime, departure_date: departureDate }) {
    // cannot modify 6 hours before stipulated time
    const date = Common.formatDate({ date: departureDate, time: departureTime });
    const interval = 6 * 3600 * 1000;
    if (date.valueOf() - Date.now() <= interval) return true;
    return false;
  }

  static redirect(evt) {
    if (evt) evt.preventDefault();

    const token = localStorage.getItem('token');
    const url = new URL(location.href);
    // param used by external pages eg error pages
    const toRedirect = url.searchParams.get('red');
    if (token) {
      return fetch('/api/v1/rides', {
        headers: new Headers({
          'x-access-token': token,
        }),
        method: 'GET',
      })
        .then(res => res.ok)
        .then((isAuth) => {
          if (isAuth && !toRedirect) {
            location.href = 'user-dashboard.html';
            if (evt) evt.target.removeEventListener(evt.type, redirect);
          } else { localStorage.clear(); }
        });
    }
    location.href = 'login.html';
    return localStorage.clear();
  }
}
