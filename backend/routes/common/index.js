import express from 'express';

import cartRoute from './cart.js';
import ordersRoute from './orders.js';
import returnsRoute from './returns.js';
import reviewsRoute from './reviews.js';

const router = express.Router();

// Operations on my cart
router.use('/cart',cartRoute);

// My orders
router.use('/orders',ordersRoute);

// My returns
router.use ('/returns',returnsRoute);

// Operations on my reviews
router.use('/reviews',reviewsRoute);

export default router;

