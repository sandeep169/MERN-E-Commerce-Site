import orderModel from '../../models/order.js';
import productCustomizationModel from '../../models/productCustomization.js';
import returnModel from '../../models/return.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getReturnsController = tryCatchUtility(async (req, res) => {
    // find all returns under current user
    const return_ids = await returnModel.find({ user_id: req.user.userid }).lean();
    if(!return_ids.length) return res.send('Nothing returned yet!');

    const returnedProducts = [];
    let idCount = return_ids.length;

    for(let id of return_ids) {
        // find each return's details
        let response = await productCustomizationModel.findById(id.productCustomization_id).lean();
        if(response) {
            const order = await orderModel.findById(response.id).select('product_id order_no -_id').lean();
            response.product_id = order.product_id;
            response.order_no = order.order_no;
            returnedProducts.push(response);
        } else idCount--;
    }

    if(!idCount) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
    res.status(200).json({ returnedProducts: returnedProducts });
});

export const returnProductController = tryCatchUtility(async (req, res) => {
    const { user, params, body } = req;

    // checking if product already returned/in return process or not
    const existingProductCustomization_id = await returnModel.findOne({ productCustomization_id: params.pcid }, { _id: 1 }).lean();
    if(existingProductCustomization_id) return res.send('This product has already returned or in return process!');

    // checking if product is feasible to return or not
    const { order_status } = await productCustomizationModel.findById(params.pcid).select('order_status -_id').lean() || {};
    if(!order_status) throw new generateErrUtility('Unable to return this product right now!\nPlease try again later...',500);
    if(order_status !== 'delivered') return res.send(`Can't return product with ${order_status} order status!`);

    const newReturn = {
        user_id: user.userid,
        productCustomization_id: params.pcid,
        reason: body.reason,
    };

    // storing product into return model which user is asking to return
    const response = await returnModel.create(newReturn);
    if(!response) throw new generateErrUtility('Unable to return this product right now!\nPlease try again later...',500);

    res.status(201).send('Requested product placed to return!');
});

