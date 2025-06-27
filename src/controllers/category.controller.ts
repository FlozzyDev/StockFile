

import { Request, Response } from 'express';
import Category from '../database/models/category.model.js';
import { ValidationError, NotFoundError, ConflictError } from '../middleware/errorHandler.js';

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  const categories = await Category.find().sort({ createdAt: -1 });

  if (categories.length === 0) {
    throw new NotFoundError('No categories found');
  }

  res.status(200).json({
    success: true,
    message: `Returned all categories. Total Count: ${categories.length}.`,
    data: categories,
  });
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const categoryId = req.params.categoryId;

  if (!categoryId) {
    throw new ValidationError('Category ID is required');
  }

  const category = await Category.findOne({ categoryId: categoryId });

  if (!category) {
    throw new NotFoundError(`No category found with ID ${categoryId}`);
  }

  res.status(200).json({
    success: true,
    message: `Located category with ID ${categoryId}.`,
    data: category,
  });
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ValidationError('Request body is required');
  }

  const category = new Category(req.body);
  if (category.categoryId) {
    throw new ConflictError('Category ID is already in use');
  }

  const savedCategory = await category.save();

  res.status(201).json({
    success: true,
    message: 'New category created.',
    data: savedCategory,
  });
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = req.params.categoryId;

  if (!categoryId) {
    throw new ValidationError('Category ID is required');
  }

  const category = await Category.findOneAndUpdate({ categoryId: categoryId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new NotFoundError(`Could not find category with ID ${categoryId}`);
  }

  res.status(204).send();
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = req.params.categoryId;

  if (!categoryId) {
    throw new ValidationError('Category ID is required');
  }

  const category = await Category.findOneAndDelete({ categoryId: categoryId });

  if (!category) {
    throw new NotFoundError(`Could not find category with ID ${categoryId}`);
  }

  res.status(200).json({
    success: true,
    message: `Category with ID ${categoryId} was deleted.`,
  });
};