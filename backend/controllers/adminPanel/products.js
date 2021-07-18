import productModel from '../../models/product.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getProductsController = tryCatchUtility(async (req, res) => {
    const response = await productModel.find().lean();
    if(!response.length) throw new generateErrUtility('No product found!',404);
    res.status(200).json({ products: response });
});

export const addProductController = tryCatchUtility(async (req, res) => {
    // checking if product code already exists
    const existingCode = await productModel.findOne({ code: req.body.code }, { _id: 1 }).lean();
    if(existingCode) throw new generateErrUtility('Product code already exists!',409);

    const newProduct = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

    newProduct.product_sizes = newProduct.product_sizes.split(',');
    newProduct.product_colors = newProduct.product_colors.split(',');

    // checking if images also sent with product, then adding them into product body
    const { product_images } = req.files || {};
    if(product_images !== undefined) {
        newProduct.product_images = [];
        product_images.forEach(img => newProduct.product_images.push(img.path.replace(/\\/g,'/')));
    }

    // saving new product into product model
    const response = await productModel.create(newProduct);
    if(!response) throw new generateErrUtility('Unable to add product!\nPlease try again later...',500);

    res.status(201).json({
        msg: 'Product added successfully!',
        product: response
    });
});

export const updateProductController = tryCatchUtility(async (req, res) => {
    const { params } = req;

    // checking if product code already exists
    if(req.body.code !== undefined) {
        const existingCode = await productModel.findOne({ code: req.body.code, _id: { $nin: params.pid } }, { _id: 1 }).lean();
        if(existingCode) throw new generateErrUtility('Product code already exists!',409);
    }

    const updates = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

    if(updates.product_sizes !== undefined)
        updates.product_sizes = updates.product_sizes.split(',');
    if(updates.product_colors !== undefined)
        updates.product_colors = updates.product_colors.split(',');

    // checking if images also sent with product, then adding them into product body
    const { product_images } = req.files || {};
    if(product_images !== undefined) {
        updates.product_images = [];
        product_images.forEach(img => updates.product_images.push(img.path.replace(/\\/g,'/')));
    }

    // updating existing product in product model
    const response = await productModel.findByIdAndUpdate(params.pid, updates, { new: true }).lean();
    if(!response) throw new generateErrUtility('Unable to update product!\nPlease try again later...',500);

    res.status(200).json({
        msg: 'Product updated successfully!',
        updatedProduct: response
    });
});

export const deleteProductsController = tryCatchUtility(async (req, res) => {
    const { ids } = req.body;

    // deleting all requested products(whose ids has been sent in []) one by one
    let deletedProducts = ids.length;
    for(let id of ids) {
        const { deletedCount } = await productModel.deleteOne({ _id: id }).lean();
        if(!deletedCount) deletedProducts--;
    }

    if(deletedProducts && deletedProducts < ids.length) throw new generateErrUtility(`Deleted ${deletedProducts} products only!`,404);
    if(!deletedProducts) throw new generateErrUtility(`No product deleted!`,404);

    res.status(200).send('Products deleted successfully!');
});

