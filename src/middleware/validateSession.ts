import { Request, Response, NextFunction } from 'express';

export const validateSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  res.status(401).json({
    success: false,
    message: 'Please login first',
  });
};
