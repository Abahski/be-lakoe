import Joi = require('joi');

const isValidImageExtension = (value: string) => {
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const ext = value.split('.').pop();

  return ext && allowedExtensions.includes(ext);
};

export const productValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required().max(3000),
  attachments: Joi.string()
    .custom((value: string, helpers) => {
      if (!isValidImageExtension(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'Image extension validation')
    .messages({
      'any.invalid':
        'Invalid image format. Only JPG, JPEG, PNG, or GIF formats are allowed',
    }),
  is_active: Joi.boolean().required(),
  minimum_order: Joi.number().required(),
  size: Joi.string().required(),
  store_id: Joi.number().required(),
});
