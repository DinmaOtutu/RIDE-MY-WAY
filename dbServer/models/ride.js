export default (db, callback) => {
  const query = {
    text: `Create table IF NOT EXISTS rides(
        id SERIAL PRIMARY KEY not null,
        state_from VARCHAR not null,
        state_to VARCHAR not null,
        city_from VARCHAR not null,
        city_to VARCHAR not null,
        price MONEY not null,
        departure_date DATE not null,
        departure_time TIME not null,
        pickup_location VARCHAR not null,
        user_id INT references users(id) on update cascade on delete set null,
        deleted BOOLEAN default false,
      unique(departure_date, departure_time, user_id)
      )`,
  };

  db.query(query, (error) => {
    if (error) throw error;
    if (callback) callback();
  });
};

