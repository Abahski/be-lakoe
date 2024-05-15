import * as Joi from 'joi';

export const bankValidation = Joi.object({
  bank: Joi.string().optional(),
  account_number: Joi.string().optional(),
  account_name: Joi.string().optional(),
  store_id: Joi.string().optional(),
});
