import Joi from 'joi';

export const locationValidationSchema = Joi.object({
  locationId: Joi.number().required(),
  name: Joi.string().required().min(2).max(100),
  description: Joi.string().optional().allow(null, ''),
});

export const locationIdValidationSchema = Joi.object({
  locationId: Joi.number().required(),
});
