import express from 'express';

import { getProductReviewsApi, addReviewToProductApi, editUserReviewApi, deleteUserReviewApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

router.get('/:pid',getProductReviewsApi);
router.post('/:pid',validateDataUtility,addReviewToProductApi);
router.put('/editreview/:rid',validateDataUtility,editUserReviewApi);   // edit my review
router.delete('/:rid',deleteUserReviewApi);   // delete my review

export default router;

