// import multer from 'multer';
// const upload = multer({ dest: '../../images/products'});
// const upload = multer({ dest: 'uploads/'});

import productModel from '../../models/product.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getProductsController = tryCatchUtility(async (req, res) => {
    const products = await productModel.find();
    if(!products.length) throw new generateErrUtility('no product found',404);
    res.status(200).send(products);
});

export const addProductController = tryCatchUtility(async (req, res) => {
    // res.send(req.body);
    // upload.single('product_images');
    // console.log('body',req.body,'\nfile',req.file,'\nfiles',req.files);
    // if(req.files === '') res.status(201).send('null');
    // else res.status(201).send('not null');
    
   // creating object of data of product
    const newProduct = {};
    for(let ele in req.body) {
        if(ele === 'code') {
            const existingCode = await productModel.findOne({ code: req.body.code });
            // console.log(existingCode);
            if(existingCode) throw new generateErrUtility('product code already exists',409);
            // newProduct[ele] = req.body[ele];
        }
        if(ele === 'product_sizes' || ele === 'product_colors') {
            newProduct[ele] = req.body[ele].split(',');
            continue;
        }
        // else if(ele === 'product_images') {
        //     req.body[ele].every(img_path => newProduct[ele].push(img_path));
        //     // newProduct[ele].push = req.file.path;
        //     // continue;
        // }
        newProduct[ele] = req.body[ele];
    }
    // console.log(req.files === NaN);
    // const x = req.files;
    // console.log(x.path,typeof x.path);
    // req.file[ele].every(img_path => newProduct[ele].push(img_path));
    // newProduct.product_images = [];
    // newProduct.product_images.push(req.file.path);
    // const char = '\';
    // newProduct.product_images = req.file.path.replace(/\/\//g, '/');
    if(typeof req.files.product_images !== 'undefined') {
        // newProduct.product_images = req.file.path.replace(/\\/g,'/');
        // newProduct.product_images = req.files.product_images[0].path.replace(/\\/g,'/');
        newProduct.product_images = [];
        req.files.product_images.forEach(img => newProduct.product_images.push(img.path.replace(/\\/g,'/')));
    }
    // newProduct.product_images = (req.file.destination + '/' + req.file.filename).replace('./','');
    // console.log('newProduct',newProduct);
    // console.log(req);

    // saving newly created object into db
    const response = await productModel.create(newProduct);
    // console.log(response);
    if(!response) throw new generateErrUtility('something went wrong...\nPlease try again later!',500);
    res.status(201).send(response);
    // res.sendStatus(201);
});

export const updateProductController = tryCatchUtility(async (req, res) => {
    const id = req.params.pid;
    const response = await productModel.findByIdAndUpdate(id).exec();
    if(!response) throw new generateErrUtility('something went wrong...\nPlease try again later!',500);
    res.send('Product updated successfully!');
});

export const deleteProductsController = tryCatchUtility(async (req, res) => {
    const id = req.params.pid;
    const response = await productModel.findByIdAndRemove(id).exec();
    if(!response) throw new generateErrUtility('unable to delete',501);
    res.send('Product deleted successfully..');
});

