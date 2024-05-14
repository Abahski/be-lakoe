import Joi from 'joi';

export const bankValidation = Joi.object({
  bank: Joi.string().required(),
  account_number: Joi.string().required(),
  account_name: Joi.string().required(),
  store_id: Joi.string().optional(),
});
