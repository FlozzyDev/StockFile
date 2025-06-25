import express from 'express';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/item.controller.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRequest, validateParams } from '../middleware/validateData.js';
import { itemValidationSchema, itemIdValidationSchema } from '../validation/item.validation.js';
import { validateSession } from '../middleware/validateSession.js';

const router = express.Router();

// Since all routes are protected, we always validate the session
router.use(validateSession);

// GET all items
router.get('/', asyncHandler(getAllItems));

// GET item BY ID
router.get('/:itemId', validateParams(itemIdValidationSchema), asyncHandler(getItemById));

// POST create new item
router.post('/', validateRequest(itemValidationSchema), asyncHandler(createItem));

// PUT update item
router.put(
  '/:itemId',
  validateParams(itemIdValidationSchema),
  validateRequest(itemValidationSchema),
  asyncHandler(updateItem)
);

// DELETE delete item BY ID
router.delete('/:itemId', validateParams(itemIdValidationSchema), asyncHandler(deleteItem));

export default router;
