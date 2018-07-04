export default (db, callback) => {
  const query = {
    text: `Create table IF NOT EXISTS cars(
        id SERIAL PRIMARY KEY not null,
        model VARCHAR,
        make VARCHAR
      )`,
  };

  db.query(query, (error) => {
    if (error) throw error;
    if (callback) callback();
  });
};

