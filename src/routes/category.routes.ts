

import express from 'express';
import { validateRequest, validateParams } from '../middleware/validateData.js';
import { validateSession } from '../middleware/validateSession.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { categoryValidationSchema, categoryIdValidationSchema } from '../validation/category.validation.js';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js';

const router = express.Router();

// Since all routes are protected, we always validate the session
router.use(validateSession);

// GET all categories
router.get('/', asyncHandler(getAllCategories));

// GET category BY ID
router.get('/:categoryId',
  validateParams(categoryIdValidationSchema),
  asyncHandler(getCategoryById)
);

// POST create new category
router.post('/',
  validateRequest(categoryValidationSchema),
  asyncHandler(createCategory)
);

// PUT update category
router.put('/:categoryId',
  validateParams(categoryIdValidationSchema),
  validateRequest(categoryValidationSchema),
  asyncHandler(updateCategory)
);

// DELETE delete category BY ID
router.delete('/:categoryId',
  validateParams(categoryIdValidationSchema),
  asyncHandler(deleteCategory)
);

export default router;