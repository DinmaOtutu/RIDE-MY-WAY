export default {
  notNull(...datas) {
    const notNull = Error('Validation error');
    notNull.errors = [];
    return (req, res, next) => {
      datas.forEach((data) => {
        if (req.body[data] == null) {
          notNull.errors.push(`'${data}' please fill up all forms`);
        }
      });
      if (notNull.errors.length) {
        next(notNull);
        notNull.errors.splice(0);
        return;
      }
      next();
    };
  },
};

