import Joi from 'joi';

export const itemValidationSchema = Joi.object({
  name: Joi.string().required().min(2).max(100), // REQUIRED -----------
  categoryId: Joi.number().optional().allow(null, ''),
  supplierId: Joi.number().optional().allow(null, ''),
  locationId: Joi.number().optional().allow(null, ''),
  purchaseDate: Joi.date().optional().allow(null),
  quantity: Joi.number().required().min(1).default(1), // REQUIRED -----------
  price: Joi.number().optional().min(0).allow(null),
  imageUrl: Joi.string().optional().allow(null, ''),
  SerialNumber: Joi.string().optional().allow(null, ''),
  warranty: Joi.boolean().optional().default(false),
  expiration: Joi.boolean().optional().default(false),
  expirationDate: Joi.date().optional().allow(null, ''),
  warrantyDate: Joi.date().optional().allow(null, ''),
  notes: Joi.string().optional().allow(null, '')
});

export const itemIdValidationSchema = Joi.object({
  itemId: Joi.number().required()
});
