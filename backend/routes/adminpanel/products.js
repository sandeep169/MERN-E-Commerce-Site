import express from 'express';

import { getProductsApi, addProductApi, updateProductApi, deleteProductsApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';
import { uploadConfig } from '../../utils/imageUploading.js';

const router = express.Router();

const uploadFields = [
    { name: 'product_images', maxCount: 5 },
    // { name: 'user_images', maxCount: 10 }
];

router.get('/',getProductsApi);
// router.post('/addproduct',upload.single('product_images'),validateDataUtility,addProductApi);
// router.post('/addproduct',upload.array('product_images',5),validateDataUtility,addProductApi);
router.post('/addproduct',uploadConfig.fields(uploadFields),validateDataUtility,addProductApi);
router.put('/updateproduct/:pid',uploadConfig.fields(uploadFields),validateDataUtility,updateProductApi);
router.delete('/deleteproducts',deleteProductsApi);

export default router;

