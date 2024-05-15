import * as Joi from 'joi';

export const roleValidation = Joi.object({
  name: Joi.string().required(),
});
