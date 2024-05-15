import * as Joi from 'joi';

export const storeValidation = Joi.object({
  name: Joi.string().required(),
  slogan: Joi.string().required(),
  description: Joi.string().required(),
  domain: Joi.string().required(),
  logo_attachment: Joi.string().required(),
  banner_attachment: Joi.string().required(),
});
