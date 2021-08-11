import express from 'express';

import { getProductApi, getProductRatingApi, getProductReviewsApi } from '../controllers/api.js';

const router = express.Router();

router
    // view any particular product as guest
    .get('/:pcode([a-z0-9_-]{6,15})',getProductApi)

    // get product consolidated rating
    .get('/productrating/:pid',getProductRatingApi)

    // get product reviews
    .get('/productreviews/:pid',getProductReviewsApi)

    // get access to dir 'images'
    .use('/images',express.static('images'));
    // eg. http://localhost:5000/images/reviews/72663621[4]_2021-06-26_T11-53-38.801Z.png

export default router;

