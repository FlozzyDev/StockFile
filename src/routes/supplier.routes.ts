import express from 'express';
import { validateRequest, validateParams } from '../middleware/validateData.js';
import { validateSession } from '../middleware/validateSession.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { supplierValidationSchema, supplierIdValidationSchema } from '../validation/supplier.validation.js';
import {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from '../controllers/supplier.controller.js';

const router = express.Router();

// Since all routes are protected, we always validate the session
router.use(validateSession);

// GET all suppliers
router.get('/', asyncHandler(getAllSuppliers));

// GET supplier BY ID
router.get('/:supplierId', 
  validateParams(supplierIdValidationSchema),
  asyncHandler(getSupplierById)
);

// POST create new supplier
router.post('/',
  validateRequest(supplierValidationSchema),
  asyncHandler(createSupplier)
);

// PUT update supplier
router.put('/:supplierId',
  validateParams(supplierIdValidationSchema),
  validateRequest(supplierValidationSchema),
  asyncHandler(updateSupplier)
);

// DELETE delete supplier BY ID
router.delete('/:supplierId',
  validateParams(supplierIdValidationSchema),
  asyncHandler(deleteSupplier)
);

export default router;
