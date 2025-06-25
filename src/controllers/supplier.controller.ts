import { Request, Response } from 'express';
import Supplier from '../database/models/supplier.model.js';
import { ValidationError, NotFoundError, ConflictError } from '../middleware/errorHandler.js';

export const getAllSuppliers = async (req: Request, res: Response): Promise<void> => {
  const suppliers = await Supplier.find().sort({ createdAt: -1 });
  
  if (suppliers.length === 0) {
    throw new NotFoundError('No suppliers found');
  }
  
  res.status(200).json({
    success: true,
    message: `Returned all suppliers. Total Count: ${suppliers.length}.`,
    data: suppliers,
  });
};

export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
  const supplierId = req.params.supplierId;
  
  if (!supplierId) {
    throw new ValidationError('Supplier ID is required');
  }
  
  const supplier = await Supplier.findOne({ supplierId: supplierId });
  
  if (!supplier) {
    throw new NotFoundError(`No supplier found with ID ${supplierId}`);
  }

  res.status(200).json({
    success: true,
    message: `Located supplier with ID ${supplierId}.`,
    data: supplier,
  });
};

export const createSupplier = async (req: Request, res: Response): Promise<void> => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ValidationError('Request body is required');
  }
  
  const supplier = new Supplier(req.body);
  if (supplier.supplierId) {
    throw new ConflictError('Supplier ID is already in use');
  }

  const savedSupplier = await supplier.save();
  
  res.status(201).json({
    success: true,
    message: 'New supplier created.',
    data: savedSupplier,
  });
};

export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  const supplierId = req.params.supplierId;
  
  if (!supplierId) {
    throw new ValidationError('Supplier ID is required');
  }
  
  const supplier = await Supplier.findOneAndUpdate({ supplierId: supplierId }, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!supplier) {
    throw new NotFoundError(`Could not find supplier with ID ${supplierId}`);
  }
  
  res.status(204).send();
};

export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
  const supplierId = req.params.supplierId;
  
  if (!supplierId) {
    throw new ValidationError('Supplier ID is required');
  }
  
  const supplier = await Supplier.findOneAndDelete({ supplierId: supplierId });
  
  if (!supplier) {
    throw new NotFoundError(`Could not find supplier with ID ${supplierId}`);
  }
  
  res.status(200).json({
    success: true,
    message: `Supplier with ID ${supplierId} was deleted.`,
  });
};
