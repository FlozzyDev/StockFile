import Joi from 'joi';

export const supplierValidationSchema = Joi.object({
  name: Joi.string().required().min(2).max(100), // REQUIRED -----------
  website: Joi.string().optional().allow(null, ''),
  address: Joi.boolean().optional().default(false),
  addressLine1: Joi.string().optional().allow(null, ''),
  addressLine2: Joi.string().optional().allow(null, ''),
  city: Joi.string().optional().allow(null, ''),
  state: Joi.string().optional().allow(null, ''),
  zip: Joi.string().optional().allow(null, ''),
  country: Joi.string().optional().allow(null, ''),
  email: Joi.string().email().optional().allow(null, ''),
  phone: Joi.string().optional().allow(null, '')
});

export const supplierIdValidationSchema = Joi.object({
  supplierId: Joi.number().required()
});
