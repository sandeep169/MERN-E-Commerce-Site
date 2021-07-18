import express from 'express';

import { getReturnsApi, returnProductApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

router.get('/',getReturnsApi);
router.post('/returnproduct/:pcid',validateDataUtility,returnProductApi);

export default router;

