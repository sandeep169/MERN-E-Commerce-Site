import express from 'express';

import { getUsersApi, addUserApi, updateUserApi, deleteUsersApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

router.get('/',getUsersApi);
router.post('/adduser',validateDataUtility,addUserApi);
router.put('/updateuser/:uid',validateDataUtility,updateUserApi);
router.delete('/:uid',deleteUsersApi);

export default router;

