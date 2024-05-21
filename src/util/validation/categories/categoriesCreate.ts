import Joi = require('joi');

export const categoriesValidation = Joi.object({
  name: Joi.string().required(),
  product_id: Joi.number().required(),
  parent_id: Joi.number(),
});
