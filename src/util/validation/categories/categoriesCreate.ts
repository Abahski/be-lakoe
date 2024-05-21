import Joi = require('joi');

export const categoriesValidation = Joi.object({
  name: Joi.string().required(),
  product_id: Joi.number().required(),
  children_category: Joi.number(),
  parent_category: Joi.number(),
});
