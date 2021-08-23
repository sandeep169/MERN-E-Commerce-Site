import express from 'express';
import { getUsersApi, addUserApi, updateUserApi, deleteUsersApi } from '../../controllers/api.js';

const router = express.Router();

router.get('/',getUsersApi);
router.post('/adduser',addUserApi);
router.put('/updateuser/:uid',updateUserApi);
router.delete('/:uid',deleteUsersApi);

export default router;

