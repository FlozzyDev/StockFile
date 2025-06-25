import { Request, Response } from 'express';
import { IOAuthUser } from '../types/oauth.types.js';
import { UnauthorizedError } from '../../../middleware/errorHandler.js';


// If user is logged in, return a success message, else error
export const handleGitHubCallback = async (req: Request, res: Response): Promise<void> => {
  const user = req.user as IOAuthUser;
  console.log(user);
  try {
  if (!user) {
    throw new UnauthorizedError('Authentication failed');
  }
  
  res.status(200).json({
    success: true,
    message: 'Successfully authenticated with GitHub',
  });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: ' + (error as Error).message
    });
    console.log(error); 
  }
};

// if user logged in, kill session. If not logged in, return error
export const handleLogout = async (req: Request, res: Response): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    req.logout((err: Error | null) => {

      if (!req.isAuthenticated()) {
        throw new UnauthorizedError('User is not logged in');
      }

      if (err) {
        reject(err);
        return;
      }
      
      res.status(200).json({
        success: true,
        message: 'User logged out successfully',
      });
      resolve();
    });
  });
};
