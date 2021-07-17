import express from 'express';

import { addProductToCartApi, getOrdersApi, getReturnsApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

// router.get('/:pcode',getProductApi);
router.post('/addproducttocart/:pid',addProductToCartApi);
router.get('/orders',getOrdersApi);
router.get('/returns',getReturnsApi);

export default router;

