import express from 'express';
import { getProductReviewsApi, addReviewToProductApi, editUserReviewApi, deleteUserReviewApi } from '../../controllers/api.js';

const router = express.Router();

router.get('/',getProductReviewsApi);
router.post('/:uid',addReviewToProductApi);
router.put('/editreview/:uid',editUserReviewApi);
router.delete('/:uid',deleteUserReviewApi);

export default router;

