import AppError from '../errors/AppError';

const middleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      console.log('message ', message);
      next(new AppError(message, 400));
    }
  };
};

export default middleware;