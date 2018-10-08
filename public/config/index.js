export default {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://ride-my-way-cars.herokuapp.com' : 'http://localhost:8000',
};
