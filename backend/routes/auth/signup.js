import express from 'express';
import { addUserApi } from '../../controllers/api.js';

const router = express.Router();

export default router.post('/',addUserApi);
