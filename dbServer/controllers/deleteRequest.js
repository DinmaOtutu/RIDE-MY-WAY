import db from '../db';

export default (req, res, next) => {
  if (!+req.params.requestId) {
    return next('route');
  }

  const {
    params: { requestId },
    decoded: { payload: { id: userId } },
  } = req;

  const query = {
    text: `update requests set deleted = true
    where requests.id = $1 
    and requests.user_id = $2 returning *`,
    values: [requestId, userId],
  };
  return db.query(query, (error, response) => {
    if (error) return next(error);
    if (!response.rows.length) {
      const fail = Error(`Failed. Request ${requestId} not found or you do not own it`);
      fail.status = 404;
      return next(fail);
    }
    const deletedRequest = response.rows[0];
    return res.status(200).json({
      deletedRequest,
    });
  });
};
