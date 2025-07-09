import { Request, Response } from 'express';
import Location from '../database/models/location.model.js';
import { ValidationError, NotFoundError, ConflictError } from '../middleware/errorHandler.js';

export const getAllLocations = async (req: Request, res: Response): Promise<void> => {
  const locations = await Location.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    message: `Fetched all locations. Count: ${locations.length}.`,
    data: locations,
  });
};

export const getLocationById = async (req: Request, res: Response): Promise<void> => {
  const locationId = Number(req.params.locationId);
  if (!locationId) {
    throw new ValidationError('Location ID is required and must be a number');
  }

  const location = await Location.findOne({ locationId });
  if (!location) {
    throw new NotFoundError(`No location found with ID ${locationId}`);
  }

  res.status(200).json({
    success: true,
    message: `Location with ID ${locationId} found.`,
    data: location,
  });
};

export const createLocation = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body; // made some changes - we don't need locationId since we auto-increment it
  if (!name) {
    throw new ValidationError('name is required');
  }

  const newLocation = new Location({ name, description });
  const saved = await newLocation.save();

  res.status(201).json({
    success: true,
    message: 'New location created successfully.',
    data: saved,
  });
};

export const updateLocation = async (req: Request, res: Response): Promise<void> => {
  const locationId = Number(req.params.locationId);
  if (!locationId) {
    throw new ValidationError('Location ID is required');
  }

  const updated = await Location.findOneAndUpdate(
    { locationId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new NotFoundError(`Could not find location with ID ${locationId}`);
  }

  res.status(204).send();
};

export const deleteLocation = async (req: Request, res: Response): Promise<void> => {
  const locationId = Number(req.params.locationId);
  if (!locationId) {
    throw new ValidationError('Location ID is required');
  }

  const deleted = await Location.findOneAndDelete({ locationId });

  if (!deleted) {
    throw new NotFoundError(`Could not find location with ID ${locationId}`);
  }

  res.status(200).json({
    success: true,
    message: `Location with ID ${locationId} was deleted successfully.`,
  });
};
