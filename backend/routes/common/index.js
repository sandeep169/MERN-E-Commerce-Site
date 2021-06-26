import express from 'express';

// import { getUserHomeApi, getUserProfileApi, updateUserProfileApi, deleteUserProfileApi } from '../../controllers/api.js';
// {, ordersApi, returnsApi}
import cartRoute from './cart.js';
import reviewsRoute from './reviews.js';
import ratingsRoute from './ratings.js';
import otherRoute from './other.js';
// import ordersRoute from './orders';
// import returnsRoute from './returns';
// import profileRoute from '../profile.js';

const router = express.Router();

// Website home for 'user'
// router.get(['/', '/home'],getUserHomeApi);
// router.get('/',getUserHomeApi);

// My profile
// router.get('/profile',getUserProfileApi);
// router.put('/profile/:uid',updateUserProfileApi);
// router.delete('/profile/:uid',deleteUserProfileApi);
// router.use('/profile',validateTokenUtility,profileRoute);

// router.get('/orders',ordersApi);
// router.get('/returns',returnsApi);

// Operations on my cart
router.use('/cart',cartRoute);

// Operations on my reviews
router.use('/reviews',reviewsRoute);

// Operations on my ratings
router.use('/ratings',ratingsRoute);

// some other fns
router.use('/other',otherRoute);

export default router;

