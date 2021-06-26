import express from 'express';
import multer from 'multer';
import path from 'path';

import { getProductsApi, addProductApi, updateProductApi, deleteProductsApi } from '../../controllers/api.js';
import { validateDataUtility } from '../../utils/validation/data.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: './images/products',
    filename: (req, file, cb) => {
        // console.log(path.parse(file.originalname));
        const filePath = path.parse(file.originalname);
        // const chars = {' ': '_', 'T': '_T', ':': '-'};
        const chars = {'T': '_T', ':': '-'};
        // return cb(null, filePath.name + '_' + new Date().toISOString().replace(/:/g,'-').replace(/T/g,'_T') + filePath.ext);
        return cb(null, 
            (filePath.name + '_' + new Date().toISOString().replace(/[:T]/g, m => chars[m]) + filePath.ext).replace(/\s/g, '_')
        );
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/bmp')
        return cb(null,true);
    cb(new generateErrUtility('Allowed only JPG, JPEG, PNG',422),false);
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 512 },   // 512kb
    fileFilter: fileFilter
});

router.get('/',getProductsApi);
router.post('/addproduct',upload.single('product_images'),validateDataUtility,addProductApi);
router.put('/updateproduct/:pid',validateDataUtility,updateProductApi);
router.delete('/:pid',deleteProductsApi);

export default router;

