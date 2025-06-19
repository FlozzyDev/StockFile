import { Router } from 'express';
import passport from 'passport';
import { IOAuthUser } from '../types/oauth.types.js';
const router = Router();

router.get('/oauth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/oauth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user as IOAuthUser;
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Authentication failed',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Successfully authenticated with GitHub',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error during authentication',
        error: (error as Error).message,
      });
    }
  }
);

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error logging out',
        error: err.message,
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User logged out successfully',
    });
  });
});

export default router; 