const Joi = require('joi');

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

module.exports.user_rule = {
  signup: Joi.object().keys({
    fullname: Joi.string()
      .required()
      .error(() => `fullname is required.`),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .error(() => `username is not valid, it must be at least 3 characters.`),
    email: Joi.string()
      .email()
      .required()
      .error(() => `email address is not valid.`),
    phone: Joi.string()
      .min(10)
      .regex(new RegExp(phoneRegExp))
      .required()
      .error(() => `phone number is not valid.`),
    plan: Joi.string(),
    paymentStatus: Joi.object().keys({
      amount: Joi.string(),
      status: Joi.string(),
    }),
    password: Joi.string()
      .regex(new RegExp(passwordRules))
      .required()
      .error(() => `password is not valid, it must be at least 6 characters.`),
  }),

  login: Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .error(() => `username is not valid, it must be at least 3 characters.`),
    password: Joi.string()
      .regex(new RegExp('^[a-zA-Z0-9]{6,32}$'))
      .required()
      .error(() => `password is not valid, it must be at least 6 characters.`),
  }),

  updateUser: Joi.object().keys({
    fullname: Joi.string()
      .required()
      .error(() => `fullname is required.`),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .error(() => `username is not valid, it must be at least 3 characters.`),
    email: Joi.string()
      .email()
      .required()
      .error(() => `email address is not valid.`),
    phone: Joi.number()
      .min(10)
      .max(10)
      .required()
      .error(() => `phone number is not valid.`),
  }),
};
