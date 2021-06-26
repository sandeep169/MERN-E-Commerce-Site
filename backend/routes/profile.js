import express from 'express';

import { getProfileApi, updateProfileApi, deleteProfileApi } from '../controllers/api.js';
import { validateDataUtility } from '../utils/validation/data.js';

const router = express.Router();

router.get('/',getProfileApi);
router.put('/updateprofile/:uid',validateDataUtility,updateProfileApi);
router.delete('/:uid',deleteProfileApi);

export default router;

