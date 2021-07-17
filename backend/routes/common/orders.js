import express from 'express';

import { getOrdersApi, placeOrderApi } from '../../controllers/api.js';
// import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

router.get('/',getOrdersApi);
router.post('/placeorder',placeOrderApi);
// router.post('/placeorder',validateDataUtility,placeOrderApi);

export default router;

