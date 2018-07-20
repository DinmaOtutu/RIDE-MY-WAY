class common {
  static store({
    token, user,
  }) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  static errorHandler(error) {
    alert(error.message);
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
    return common.formatDate({ date, time })
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
    const date = common.formatDate({ date: departureDate, time: departureTime });
    const interval = 6 * 3600 * 1000;
    if (date.valueOf() - Date.now() <= interval) return true;
    return false;
  }
}
