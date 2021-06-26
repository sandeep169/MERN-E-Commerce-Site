import express from 'express';

import { getCartProductsApi, editCartProductApi, deleteCartProductApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';

const router = express.Router();

router.get('/',getCartProductsApi);
// router.post('/:pid',addProductToCartApi);
router.put('/editproduct/:cpid',validateDataUtility,editCartProductApi);
router.delete('/:cpid',deleteCartProductApi);

export default router;

