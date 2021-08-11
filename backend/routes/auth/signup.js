import express from 'express';

import { addUserApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

export default router.post('/', validateDataUtility,addUserApi);

