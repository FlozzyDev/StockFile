import { Request, Response } from 'express';
import Item from '../database/models/item.model.js';
import { ValidationError, NotFoundError, ConflictError } from '../middleware/errorHandler.js';
import Category from '../database/models/category.model.js';
import Supplier from '../database/models/supplier.model.js';
import Location from '../database/models/location.model.js';

export const getAllItems = async (req: Request, res: Response): Promise<void> => {
  const items = await Item.find().sort({ createdAt: -1 });
  
  if (items.length === 0) {
    throw new NotFoundError('No items found');
  }
  
  res.status(200).json({
    success: true,
    message: `Fetched all items. Count: ${items.length}.`,
    data: items,
    itemCount: items.length,
  });
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
  const itemId = req.params.itemId;
  
  if (!itemId) {
    throw new ValidationError('Item ID is required');
  }
  
  const item = await Item.findOne({ itemId: itemId });
  
  if (!item) {
    throw new NotFoundError(`No item found with ID ${itemId}`);
  }

  res.status(200).json({
    success: true,
    message: `Item with ID ${itemId} found.`,
    data: item,
  });
};

export const createItem = async (req: Request, res: Response): Promise<void> => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ValidationError('Request body is required');
  }
  
  const item = new Item(req.body);
  if (item.itemId) {
    throw new ConflictError('Item ID is already in use');
  }
  const savedItem = await item.save();

  // if we add a category, make sure it exists
  if (req.body.categoryId) {
    const category = await Category.findOne({ categoryId: req.body.categoryId });
    if (!category) {
      throw new NotFoundError(`Category with ID ${req.body.categoryId} not found`);
    }
  }

  // if we add a supplier, make sure it exists
  if (req.body.supplierId) {
    const supplier = await Supplier.findOne({ supplierId: req.body.supplierId });
    if (!supplier) {
      throw new NotFoundError(`Supplier with ID ${req.body.supplierId} not found`);
    }
  }

  // if we add a location, make sure it exists
  if (req.body.locationId) {
    const location = await Location.findOne({ locationId: req.body.locationId });
    if (!location) {
      throw new NotFoundError(`Location with ID ${req.body.locationId} not found`);
    }
  }
  
  res.status(201).json({
    success: true,
    message: 'New item created successfully.',
    data: savedItem,
  });
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
  const itemId = req.params.itemId;
  
  if (!itemId) {
    throw new ValidationError('Item ID is required');
  }
  // if we update with a category, make sure it exists
  if (req.body.categoryId) {
    const category = await Category.findOne({ categoryId: req.body.categoryId });
    if (!category) {
      throw new NotFoundError(`Category with ID ${req.body.categoryId} not found`);
    }
  }
  // if we update with a supplier, make sure it exists
  if (req.body.supplierId) {
    const supplier = await Supplier.findOne({ supplierId: req.body.supplierId });
    if (!supplier) {
      throw new NotFoundError(`Supplier with ID ${req.body.supplierId} not found`);
    }
  }
  // if we update with a location, make sure it exists
  if (req.body.locationId) {
    const location = await Location.findOne({ locationId: req.body.locationId });
    if (!location) {
      throw new NotFoundError(`Location with ID ${req.body.locationId} not found`);
    }
  }
  
  const item = await Item.findOneAndUpdate({ itemId: itemId }, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!item) {
    throw new NotFoundError(`Could not find item with ID ${itemId}`);
  }
  
  res.status(204).send();
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  const itemId = req.params.itemId;
  
  if (!itemId) {
    throw new ValidationError('Item ID is required');
  }
  
  const item = await Item.findOneAndDelete({ itemId: itemId });
  
  if (!item) {
    throw new NotFoundError(`Could not find item with ID ${itemId}`);
  }
  
  res.status(200).json({
    success: true,
    message: `Item with ID ${itemId} was deleted successfully.`,
  });
};
