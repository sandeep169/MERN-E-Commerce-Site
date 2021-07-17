import express from 'express';

import { getProductRatingApi, addRatingToProductApi, editUserRatingApi, deleteUserRatingApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

router.get('/:pid',getProductRatingApi);       // ratings stored with reviews
router.post('/:pid',validateDataUtility,addRatingToProductApi);
router.put('/editrating/:rid',validateDataUtility,editUserRatingApi);   // edit my rating
router.delete('/:rid',deleteUserRatingApi);   // delete my rating

export default router;

