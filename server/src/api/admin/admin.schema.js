const Joi = require('joi');

module.exports.admin_rule = {
  signup: Joi.object().keys({
    fullname: Joi.string()
      .required()
      .error(() => `fullname is required.`),
    email: Joi.string()
      .email()
      .required()
      .error(() => `email address is not valid.`),
    password: Joi.string()
      .regex(new RegExp('^[a-zA-Z0-9]{6,32}$'))
      .required()
      .error(() => `password is not valid, it must be at least 6 characters.`),
  }),
  login: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .error(() => `email address is not valid.`),
    password: Joi.string()
      .regex(new RegExp('^[a-zA-Z0-9]{6,32}$'))
      .required()
      .error(() => `password is not valid, it must be at least 6 characters.`),
  }),
};
