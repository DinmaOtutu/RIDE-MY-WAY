const login = document
  .getElementById('js-login');
login.addEventListener('click', Common.redirect);

// param used by internal pages
const clearStorage = (new URL(location.href))
  .searchParams.get('clear');
if (clearStorage) localStorage.clear();
