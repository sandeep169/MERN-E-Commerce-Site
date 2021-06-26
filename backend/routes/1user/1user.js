import express from 'express';
import { getUserHomeApi, getUserProfileApi, updateUserProfileApi, deleteUserProfileApi } from '../../controllers/api.js';
// {, ordersApi, returnsApi}
import cartRoute from './cart.js';
import reviewsRoute from './reviews.js';
import ratingsRoute from './ratings.js';
// import ordersRoute from './orders';
// import returnsRoute from './returns';

const router = express.Router();

// Website home for 'user'
// router.get(['/', '/home'],getUserHomeApi);
router.get('/user',getUserHomeApi);

// My profile
router.get('/profile',getUserProfileApi);
router.put('/profile/:uid',updateUserProfileApi);
router.delete('/profile/:uid',deleteUserProfileApi);

// router.get('/orders',ordersApi);
// router.get('/returns',returnsApi);

// Operations on my cart
router.use('/cart',cartRoute);

// Operations on my reviews
router.use('/reviews',reviewsRoute);

// Operations on my ratings
router.use('/ratings',ratingsRoute);

export default router;

