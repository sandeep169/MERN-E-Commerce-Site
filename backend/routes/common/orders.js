import express from 'express';

import { getOrdersApi, placeOrderApi } from '../../controllers/api.js';

const router = express.Router();

router.get('/',getOrdersApi);
router.post('/placeorder',placeOrderApi);

export default router;

