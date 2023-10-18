const Joi = require('joi');

module.exports = joimiddleware = (schema) => (req, res, next) => {
  const { error } = Joi.validate(req.body, schema, { abortEarly: true });

  if (error) {
    const message = error.details[0].message;
    res.status(422).send({ message });
  } else {
    next();
  }
};
