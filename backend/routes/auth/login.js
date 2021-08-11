import express from 'express';

import { verifyLoggerApi } from '../../controllers/api.js';
import { validateUserUtility } from '../../utils/validation/user.js';
import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

export default router.post('/',validateDataUtility,verifyLoggerApi,validateUserUtility);

