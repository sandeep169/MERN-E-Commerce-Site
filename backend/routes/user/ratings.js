import express from 'express';
import { getProductRatingApi, addRatingToProductApi, editUserRatingApi, deleteUserRatingApi } from '../../controllers/api.js';

const router = express.Router();

router.get('/',getProductRatingApi);       // ratings stored with reviews
router.post('/:rid',addRatingToProductApi);
router.put('/editrating/:rid',editUserRatingApi);
router.delete('/:rid',deleteUserRatingApi);

export default router;

