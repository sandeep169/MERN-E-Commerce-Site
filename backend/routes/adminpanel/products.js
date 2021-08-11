import express from 'express';

import { getProductsApi, addProductApi, updateProductApi, deleteProductsApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';
import { uploadConfig } from '../../utils/imageUploading.js';

const router = express.Router();

const uploadFields = [ { name: 'product_images', maxCount: 5 } ];

router.get('/',getProductsApi);
router.post('/addproduct',uploadConfig.fields(uploadFields),validateDataUtility,addProductApi);
router.put('/updateproduct/:pid',uploadConfig.fields(uploadFields),validateDataUtility,updateProductApi);
router.delete('/deleteproducts',deleteProductsApi);

export default router;

