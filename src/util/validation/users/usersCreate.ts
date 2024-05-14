import Joi = require('joi');

export const userValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().max(10).min(2),
});
