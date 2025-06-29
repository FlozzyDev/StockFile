import express from 'express';
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/location.controller.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRequest, validateParams } from '../middleware/validateData.js';
import { locationValidationSchema, locationIdValidationSchema } from '../validation/location.validation.js';
import { validateSession } from '../middleware/validateSession.js';

const router = express.Router();

router.use(validateSession);

router.get('/', asyncHandler(getAllLocations));

router.get('/:locationId', validateParams(locationIdValidationSchema), asyncHandler(getLocationById));

router.post('/', validateRequest(locationValidationSchema), asyncHandler(createLocation));

router.put('/:locationId',
  validateParams(locationIdValidationSchema),
  validateRequest(locationValidationSchema),
  asyncHandler(updateLocation)
);

router.delete('/:locationId',
  validateParams(locationIdValidationSchema),
  asyncHandler(deleteLocation)
);

export default router;
