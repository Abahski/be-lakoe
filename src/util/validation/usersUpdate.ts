import Joi = require('joi');

export const userUpdateValidation = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional().max(10).min(2),
});
