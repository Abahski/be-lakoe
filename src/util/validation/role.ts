const Joi = require('joi');

export const roleValidation = Joi.object({
  name: Joi.string().required(),
});
