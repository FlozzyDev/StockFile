

import Joi from 'joi';

export const categoryValidationSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  description: Joi.string().optional().allow(null, '')
});

export const categoryIdValidationSchema = Joi.object({
  categoryId: Joi.number().required()
});