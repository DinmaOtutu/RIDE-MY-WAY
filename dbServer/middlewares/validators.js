export default {
  notNull(...datas) {
    const notNull = Error('Validation error');
    notNull.errors = [];
    return (req, res, next) => {
      datas.forEach((data) => {
        console.log(req.body[data]);
        if (req.body[data] == null) {
          notNull.errors.push(`'${data}' cannot be null`);
        }
      });
      return notNull.errors.length
        ? next(notNull)
        : next();
    };
  },
};

