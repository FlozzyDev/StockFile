import { Router } from 'express';
import oauthRoutes from '../auth/oauth/routes/oauth.routes.js';

const router = Router();

// Auth routes (no authentication required)
router.use('/auth', oauthRoutes);

export default router;