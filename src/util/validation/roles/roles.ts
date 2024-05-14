import Joi from 'joi';

export const roleValidation = Joi.object({
  name: Joi.string().required(),
});
