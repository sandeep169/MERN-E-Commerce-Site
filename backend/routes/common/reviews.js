import express from 'express';

import { addReviewToProductApi, editUserReviewApi, deleteUserReviewApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';
import { uploadConfig } from '../../utils/imageUploading.js';

const router = express.Router();

const uploadFields = [ { name: 'review_images', maxCount: 5 } ];

router.post('/addreview/:pid',uploadConfig.fields(uploadFields),validateDataUtility,addReviewToProductApi);
router.put('/editreview/:rid',uploadConfig.fields(uploadFields),validateDataUtility,editUserReviewApi);   // edit my review
router.delete('/deletereview/:rid',deleteUserReviewApi);   // delete my review

export default router;

