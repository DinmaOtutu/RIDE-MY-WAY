import db from '../db';

export default (req, res, next) => {
  const query = {
    text: `select concat_ws(
        ' ', firstname, lastname
      ) as driver_name, rides.* from rides
      inner join users on rides.user_id = users.id;`,
  };
  db.query(query, (error, response) => {
    if (error) return next(error);
    const rides = response.rows;
    return res.status(200).send({
      rides,
    });
  });
};

