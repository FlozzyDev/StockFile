import express from 'express';
import oauthRoutes from '../auth/oauth/routes/oauth.routes.js';
import itemRoutes from './item.routes.js';
import supplierRoutes from './supplier.routes.js';

const router = express.Router();

// Public routes
router.use('/auth', oauthRoutes);

// Protected routes
router.use('/items', itemRoutes);
router.use('/suppliers', supplierRoutes);

export default router;