export default (req, res, next) => {
  req.body.errors = {
    notEmpty: [],
    email: [],
    notEmptyString: [],
    stringType: [],
    dateType: [],
    passwordType: [],
  };

  class Validator {
    static email() {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        return true;
      }
      return req.body.errors.email.push(`'${req.body.email}' not a valid email`);
    }

    static notEmpty(...keys) {
      let notEmpty = true;
      keys.forEach((key) => {
        if (req.body[key] == null) {
          notEmpty = false;
          req.body.errors.notEmpty.push(`'${key}' cannot be null`);
        }
      });
      return notEmpty;
    }

    static notEmptyString(...keys) {
      let notEmptyString = true;
      keys.forEach((key) => {
        if (!req.body[key] || !req.body[key].trim || !req.body[key].trim().length) {
          notEmptyString = false;
          req.body.errors.notEmptyString.push(`'${req.body.key}' ${key} is an empty string or not a string`);
        }
      });
      return notEmptyString;
    }

    static type(dataType) {
      const types = {
        string: (str) => {
          if (typeof str !== 'string') return req.body.errors.stringType.push(`${str} not a string`);
          return true;
        },
        date: (dateString) => {
          if (new Date(dateString) === 'Invalid Date' || isNaN(new Date(dateString))) {
            return req.body.errors.dateType.push(`'${dateString}' is not a valid dateString`);
          }
          return true;
        },
        password: (pwd) => {
          if (types.string(pwd) && Validator.notEmptyString(pwd)) {
            // min 8 characters, one letter, one number
            if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pwd)) {
              return true;
            }
            return req.body.errors.passwordType.push(`'${pwd}' should be minimun 8 characters and contain at least one number and one letter`);
          }
          return false;
        },
      };
      return types[dataType];
    }

    static end(next2) {
      const error = Error('Validation error');
      if (
        Object.keys(req.body.errors)
          .reduce((accum, curr) => accum + req.body.errors[curr].length, 0)
      ) {
        error.errors = req.body.errors;
        // remove empty error arrays
        Object.keys(error.errors).forEach((key) => {
          if (!error.errors[key].length) {
            delete error.errors[key];
          }
        });
        throw error;
      }
      return next2();
    }
  }

  req.validateBody = (bodyParam, ...rest) => (rest.includes('type')
    ? Validator[bodyParam](...rest)
    : Validator[bodyParam]);
  req.sendErrors = next2 => Validator.end(next2);
  next();
};
