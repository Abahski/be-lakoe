import Joi = require('joi');

export const categoriesUpdateValidation = Joi.object({
  name: Joi.string(),
  product_id: Joi.number(),
  children_id: Joi.number(),
  parent_id: Joi.number(),
});
