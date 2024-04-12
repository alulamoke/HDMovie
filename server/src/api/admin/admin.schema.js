const Joi = require('joi');

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

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
      .regex(new RegExp(passwordRules))
      .required()
      .error(() => `password is not valid, it must be at least 6 characters.`),
  }),
  login: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .error(() => `email address is not valid.`),
    password: Joi.string()
      .min(6)
      .required()
      .error(() => `password must be at least 6 characters.`),
  }),
};
