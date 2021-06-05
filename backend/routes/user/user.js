import express from 'express';
import { getUserProfileApi, updateUserProfileApi, deleteUserProfileApi } from '../../controllers/api.js';
// {, ordersApi, returnsApi}
import cartRoute from './cart.js';
import reviewsRoute from './reviews.js';
import ratingsRoute from './ratings.js';
// import ordersRoute from './orders';
// import returnsRoute from './returns';

const router = express.Router();

// My profile
router.get('/',getUserProfileApi);
router.put('/:uid',updateUserProfileApi);
router.delete('/:uid',deleteUserProfileApi);

// router.get('/orders',ordersApi);
// router.get('/returns',returnsApi);

// Operations on my cart
router.use('/cart',cartRoute);

// Operations on my reviews
router.use('/reviews',reviewsRoute);

// Operations on my ratings
router.use('/ratings',ratingsRoute);

export default router;

