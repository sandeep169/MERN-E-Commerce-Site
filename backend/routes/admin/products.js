import express from 'express';
import { getProductsApi, addProductApi, updateProductApi, deleteProductsApi } from '../../controllers/api.js';
// import { validity } from './login.js';

const router = express.Router();

// if(validity && validity === 'admin'){
    router.get('/',getProductsApi);
    router.post('/addproduct',addProductApi);
    router.put('/updateproduct/:pid',updateProductApi);
    router.delete('/:pid',deleteProductsApi);
// }

// managing cart
// router.post('/addproduct',addProductApi);
// router.delete('/deleteproduct/:pid',deleteProductApi);

// router.get('/:pcode',getProductApi);

export default router;

