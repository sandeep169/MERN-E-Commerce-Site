import express from 'express';
import { getCartProductsApi, editCartProductApi, deleteCartProductsApi } from '../../controllers/api.js';

const router = express.Router();

router.get('/',getCartProductsApi);
// router.post('/:pid',addProductToCartApi);
router.put('/editproduct/:uid',editCartProductApi);
router.delete('/:uid',deleteCartProductsApi);

export default router;

