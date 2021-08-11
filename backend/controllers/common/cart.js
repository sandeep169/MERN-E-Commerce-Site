import cartModel from '../../models/cart.js';
import productCustomizationModel from '../../models/productCustomization.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getCartProductsController = tryCatchUtility(async (req, res) => {
    const cart_ids = await cartModel.find({ user_id: req.user.userid }, { product_id: 1 }).lean();
    if(!cart_ids.length) return res.send('Empty Cart!');

    let cartProducts = [];
    let idCount = cart_ids.length;
    for(let id of cart_ids) {
        const response = await productCustomizationModel.aggregate([
            { $match: { id: String(id._id) } },
            { $addFields: { product_id: id.product_id } },
        ]);

        if(response.length) cartProducts = cartProducts.concat(response);
        else idCount--;
    }
    if(!idCount) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    res.status(200).json({ cartProducts: cartProducts });
});

export const addProductToCartController = tryCatchUtility(async (req, res) => {
    let { body, params, user } = req;
    let response;

    // checking if ids already exist in cart model
    const existingIds = await cartModel.findOne({ user_id: user.userid, product_id: params.pid }, { _id: 1 }).lean();
    if(!existingIds) {
        // adding ids to cart model
        const ids = {
            user_id: user.userid,
            product_id: params.pid
        };
        response = await cartModel.create(ids);
        if(!response) throw new generateErrUtility('Unable to add this product to cart!\nPlease try again later...',500);
    } else response = existingIds;

    // checking if product customization already exists in product customization model
    const existingProductCustomization = await productCustomizationModel.findOne({ id: response._id, quantity: body.quantity, size: body.size, color: body.color }, { _id: 1 }).lean();
    if(existingProductCustomization) return res.send('Product customization already added to cart!');

    // adding product customization to product customization model
    body.id = response._id;
    response = null;
    response = await productCustomizationModel.create(body);
    if(!response) throw new generateErrUtility('Unable to add this product to cart!\nPlease try again later...',500);

    res.status(201).json({
        msg: 'Product added to cart!',
        cartProduct: response
    });
});

export const editCartProductController = tryCatchUtility(async (req, res) => {
    const { body:updates, params } = req;

    const response = await productCustomizationModel.findByIdAndUpdate(params.pcid, updates, { new: true }).lean();
    if(!response) throw new generateErrUtility('Unable to edit product!\nPlease try again later...',500);

    res.status(200).json({
        msg: 'Product edited!',
        editedProduct: response
    });
});

export const deleteCartProductController = tryCatchUtility(async (req, res) => {
    let response = await productCustomizationModel.findByIdAndDelete(req.params.pcid).lean();
    if(!response) throw new generateErrUtility('Unable to remove product!\nPlease try again later...',404);

    const moreCustomization = await productCustomizationModel.findOne({ id: response.id }).lean();
    if(!moreCustomization) {
        const { deletedCount } = await cartModel.deleteOne({ _id: response.id }).lean();
        if(!deletedCount) throw new generateErrUtility('Unable to remove ids doc from cart model!\nPlease try again later...',500);
    }

    res.status(200).send('Product removed!');
});

