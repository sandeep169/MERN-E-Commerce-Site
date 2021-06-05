import express from 'express';
import { getAdminProfileApi, updateAdminProfileApi, deleteAdminProfileApi } from '../../controllers/api.js';
import usersRoute from './users.js';
import productsRoute from './products.js';

const router = express.Router();

// My profile
router.get('/',getAdminProfileApi);
router.put('/:aid',updateAdminProfileApi);
router.delete('/:aid',deleteAdminProfileApi);

// Operations on all users
router.use('/users',usersRoute);
// router.get('/users',getUsersApi);
// router.post('/adduser',addUserApi);
// router.put('/updateuser/:uid',updateUserApi);
// router.delete('/:uid',deleteUsersApi);

// Operations on all products
router.use('/products',productsRoute);

export default router;

