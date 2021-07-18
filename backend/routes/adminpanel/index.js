import express from 'express';

import { getAdminPanelApi } from '../../controllers/api.js';
import usersRoute from './users.js';
import productsRoute from './products.js';

const router = express.Router();

// admin-panel
router.get('/',getAdminPanelApi);

// Operations on all users
router.use('/users',usersRoute);

// Operations on all products
router.use('/products',productsRoute);

export default router;

