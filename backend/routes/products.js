import express from 'express';
// import productsControllers from '../controllers/products';
import { addProductsApi, getProductsApi, updateProductApi, deleteProductApi } from '../controllers/api.js';

const router = express.Router();

router.post('/addProducts',addProductsApi);
router.get('/getProducts',getProductsApi);
router.put('/updateProduct/:pid',updateProductApi);
router.delete('/deleteProduct/:pid',deleteProductApi);

export default router;



