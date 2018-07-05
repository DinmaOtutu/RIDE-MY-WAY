export default (db, callback) => {
  const citextExt = {
    text: 'create extension IF NOT EXISTS citext',
  };

  const query = {
    text: `Create table IF NOT EXISTS users(
        id SERIAL PRIMARY KEY not null,
        email CITEXT not null unique,
        firstname VARCHAR not null,
        lastname VARCHAR not null,
        phone VARCHAR not null,
        password VARCHAR not null,
        city VARCHAR not null,
        state VARCHAR not null,
        car_id INT references cars(id) on update cascade on delete set null
      )`,
  };

  db.connect((error, client, done) => {
    if (error) throw error;
    client.query(citextExt, (error2) => {
      if (error2) throw error2;
      client.query(query, (error3) => {
        done();
        if (error3) throw error3;
        if (callback) callback();
      });
    });
  });
};

