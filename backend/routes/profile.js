import express from 'express';

import { getProfileApi, updateProfileApi, deleteProfileApi } from '../controllers/api.js';
import { validateDataUtility } from '../utils/validation/data.js';

const router = express.Router();

router.get('/',getProfileApi);
router.put('/updateprofile',validateDataUtility,updateProfileApi);
router.delete('/deleteprofile',deleteProfileApi);

export default router;

