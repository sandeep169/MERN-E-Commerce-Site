import express from 'express';

import { getCartProductsApi, addProductToCartApi, editCartProductApi, deleteCartProductApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

router.get('/',getCartProductsApi);
router.post('/addproducttocart/:pid',validateDataUtility,addProductToCartApi);
router.put('/editcartproduct/:pcid',validateDataUtility,editCartProductApi);
router.delete('/deletecartproduct/:pcid',deleteCartProductApi);

export default router;

