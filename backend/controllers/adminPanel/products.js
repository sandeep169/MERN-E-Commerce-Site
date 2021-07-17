// import multer from 'multer';
// const upload = multer({ dest: '../../images/products'});
// const upload = multer({ dest: 'uploads/'});

import productModel from '../../models/product.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getProductsController = tryCatchUtility(async (req, res) => {
    const response = await productModel.find().lean();
    if(!response.length) throw new generateErrUtility('No product found!',404);
    res.status(200).json({ products: response });
});

export const addProductController = tryCatchUtility(async (req, res) => {
    // res.send(req.body);
    // upload.single('product_images');
    // console.log('body',req.body,'\nfile',req.file,'\nfiles',req.files);
    // if(req.files === '') res.status(201).send('null');
    // else res.status(201).send('not null');

    // creating object of data of product
    const existingCode = await productModel.findOne({ code: req.body.code }, { _id: 1 }).lean();
    if(existingCode) throw new generateErrUtility('Product code already exists!',409);

    const newProduct = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

    // if(ele === 'product_sizes' || ele === 'product_colors') {
        newProduct.product_sizes = newProduct.product_sizes.split(',');
        newProduct.product_colors = newProduct.product_colors.split(',');
        // continue;
    // for(let ele in req.body) {
        // if(ele === 'code') {
            // console.log(existingCode);
            // newProduct[ele] = req.body[ele];
        // }
        // }
        // else if(ele === 'product_images') {
        //     req.body[ele].every(img_path => newProduct[ele].push(img_path));
        //     // newProduct[ele].push = req.file.path;
        //     // continue;
        // }
        // newProduct[ele] = req.body[ele];
    // }
    // console.log(req.files, typeof req.files, req.files === undefined, typeof req.files === 'undefined');
    const { product_images } = req.files || {};
    // console.log(product_images,product_images === undefined, typeof product_images === 'undefined');

    // const x = req.files;
    // console.log(x.path,typeof x.path);
    // req.file[ele].every(img_path => newProduct[ele].push(img_path));
    // newProduct.product_images = [];
    // newProduct.product_images.push(req.file.path);
    // const char = '\';
    // newProduct.product_images = req.file.path.replace(/\/\//g, '/');

    // if(req.files !== undefined) {
        // const { files } = req;
        // console.log('_i___');
        if(product_images !== undefined) {
            // console.log('_i___');
            // newProduct.product_images = req.file.path.replace(/\\/g,'/');
            // newProduct.product_images = req.files.product_images[0].path.replace(/\\/g,'/');
            newProduct.product_images = [];
            product_images.forEach(img => newProduct.product_images.push(img.path.replace(/\\/g,'/')));
        }
    // }
    // newProduct.product_images = (req.file.destination + '/' + req.file.filename).replace('./','');
    // console.log('newProduct',newProduct);
    // console.log(req);

    // saving newly created object into db as a new product
    const response = await productModel.create(newProduct);
    // console.log('response',response);
    if(!response) throw new generateErrUtility('Unable to add product!\nPlease try again later...',500);
    res.status(201).json({
        msg: 'Product added successfully!',
        product: response
    });
    // res.sendStatus(201);
});

export const updateProductController = tryCatchUtility(async (req, res) => {
    const { params } = req;

    if(req.body.code !== undefined) {
        const existingCode = await productModel.findOne({ code: req.body.code, _id: { $nin: params.pid } }, { _id: 1 }).lean();
        if(existingCode) throw new generateErrUtility('Product code already exists!',409);
    }
    const updates = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

    if(updates.product_sizes !== undefined)
        updates.product_sizes = updates.product_sizes.split(',');
    if(updates.product_colors !== undefined)
        updates.product_colors = updates.product_colors.split(',');

    const { product_images } = req.files || {};
    if(product_images !== undefined) {
        updates.product_images = [];
        product_images.forEach(img => updates.product_images.push(img.path.replace(/\\/g,'/')));
    }

    // const id = req.params.pid;
    // saving newly created object into db as an update to an existing product document
    // const response = await productModel.findByIdAndUpdate(id).exec();
    const response = await productModel.findByIdAndUpdate(params.pid, updates, { new: true }).lean();
    if(!response) throw new generateErrUtility('Unable to update product!\nPlease try again later...',500);
    res.status(200).json({
        msg: 'Product updated successfully!',
        updatedProduct: response
    });
});

export const deleteProductsController = tryCatchUtility(async (req, res) => {
    const { ids } = req.body;
    /*const response = [];

    // deleting products having above given ids
    for(let id of ids)
        response.push(await productModel.findByIdAndDelete(id));

    let nullCount = 0;*/
    // response.forEach(x => x ? '' /*nothing happens*/ : nullCount++ );

    /*let nullCount = 0;
    for(let id of ids) {
        const { deletedCount } = await productModel.deleteOne({ _id: id }).lean();
        if(!deletedCount) nullCount++;
    }

    if(nullCount) {
        if(nullCount < ids.length ) throw new generateErrUtility(`Deleted ${ids.length - nullCount} products only!`,404);
        else throw new generateErrUtility(`No product deleted!`,404);
    }*/

    let deletedProducts = ids.length;
    for(let id of ids) {
        const { deletedCount } = await productModel.deleteOne({ _id: id }).lean(); // || {};
        if(!deletedCount) deletedProducts--;
    }

    if(deletedProducts && deletedProducts < ids.length) throw new generateErrUtility(`Deleted ${deletedProducts} products only!`,404);
    if(!deletedProducts) throw new generateErrUtility(`No product deleted!`,404);

    // const response = await productModel.findByIdAndRemove(id).exec();
    // if(!response) throw new generateErrUtility('unable to delete',501);
    res.status(200).send('Products deleted successfully!');
});

