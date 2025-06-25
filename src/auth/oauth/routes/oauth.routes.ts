import { Router } from 'express';
import passport from 'passport';
import { asyncHandler } from '../../../middleware/errorHandler.js';
import { handleGitHubCallback, handleLogout } from '../controller/auth.controller.js';

const router = Router();

router.get('/oauth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/oauth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  asyncHandler(handleGitHubCallback)
);

router.post('/logout', asyncHandler(handleLogout));

export default router; 