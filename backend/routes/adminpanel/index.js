import express from 'express';

import { getAdminPanelApi } from '../../controllers/api.js';
import usersRoute from './users.js';
import productsRoute from './products.js';

const router = express.Router();

// admin-panel
router.get('/',getAdminPanelApi);

// Website home for 'admin'
// router.get(['/', '/home'],getAdminHomeApi);
// router.get('/',getAdminHomeApi);

// Operations on all users
router.use('/users',usersRoute);
// router.get('/users',getUsersApi);
// router.post('/adduser',addUserApi);
// router.put('/updateuser/:uid',updateUserApi);
// router.delete('/:uid',deleteUsersApi);

// Operations on all products
router.use('/products',productsRoute);

export default router;

