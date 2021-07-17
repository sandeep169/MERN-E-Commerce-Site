// remaining fns:-

// import userModel from '../../models/user.js';
import productModel from '../../models/product.js';
import cartModel from '../../models/cart.js';
import orderModel from '../../models/order.js';
import returnModel from '../../models/return.js';
import productCustomizationModel from '../../models/productCustomization.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';


/*export const getProductController = tryCatchUtility(async (req, res) => {
    // let a = req.params.pcode;
    // console.log(a, typeof a);
    // const product = await productModel.leads.find({ code: a });
    const response = await productModel.findOne({ code: req.params.pcode }).lean();
    // console.log(response);
    if(!response) throw new generateErrUtility('Nothing found!',404);
    res.status(200).json({ product: response });
});*/

export const addProductToCartController = tryCatchUtility(async (req, res) => {
    /*const cartProduct = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object

    const response = await cartModel.create(cartProduct);
    if(!response) throw new generateErrUtility('Unable to add this product to cart!\nPlease try again later...',500);

    res.status(201).json({
        msg: 'Product added to cart!',
        cartProduct: response
    });*/

    let { body, params, user } = req;
    let response;

    // checking if ids already exist in cart model
    let existingIds = await cartModel.findOne({ user_id: user.userid, product_id: params.pid }).lean();
    // if(existingIds) throw new generateErrUtility('These Ids combination already exists!',409);
    if(!existingIds) {
    // else {
        // adding ids to cart model
        const ids = {
            user_id: user.userid,
            product_id: params.pid
        };
        response = await cartModel.create(ids);
        if(!response) throw new generateErrUtility('Unable to add this product to cart!\nPlease try again later...',500);
    } else response = existingIds;

    // checking if product customization already exists in product customization model
    // body.id = response._id;
    // console.log(body);
    let existingProductCustomization = await productCustomizationModel.findOne({ id: response._id, quantity: body.quantity, size: body.size, color: body.color }).lean();
    // let existingProductCustomization = await productCustomizationModel.findOne(body).lean();
    // console.log(existingProductCustomization);
    // if(existingProductCustomization) throw new generateErrUtility('This product customization already added to cart!',409);
    if(existingProductCustomization) return res.send('Product customization already added to cart!');
    else {
        // adding product customization to product customization model
        // delete body.product_id;
        body.id = response._id;
        // response = null;
        response = await productCustomizationModel.create(body) || null;
        if(!response) throw new generateErrUtility('Unable to add this product to cart!\nPlease try again later...',500);
    }

    res.status(201).json({
        msg: 'Product added to cart!',
        cartProduct: response
    }); // */res.sendStatus(200);
});

// /*export const getOrdersController = tryCatchUtility(async (req, res) => {
//     /*const response = await orderModel.find({ user_id: req.user.userid });
//     if(!response) return res.send('No order placed yet!');
//     res.status(200).json({ orders: response });*/

//     const order_ids = await orderModel.find({ user_id: req.user.userid }).lean();
//     if(!order_ids.length) return res.send('No order placed yet!');

//     const orders = [];
//     let order;
//     let order_no;
//     let nullCount = 0;
//     for(let id of order_ids) {
//         if(order_no !== id.order_no) {
//             if(typeof order !== undefined) orders.push(order);
//             order_no = id.order_no;
//             order = {
//                 order_no: order_no,
//                 products: []
//             };
//         }

//         const response = await productCustomizationModel.find({ id: id._id }).lean();
//         if(response.length)
//             response.forEach(customization => {
//                 customization.product_id = id.product_id;
//                 customization.order_no = order_no;
//                 order.products.push(customization);
//                 // orderedProducts.push(customization);
//             });
//         else nullCount++;

//         /*const y = {
//             order_no: id.order_no,
//             products: [{}]
//         };
//         orderedProducts.push(y);*/
//     }

//     if(nullCount === order_ids.length) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
//     res.status(200).json({ orders: orders });
// });*/

// export const getReturnsController = tryCatchUtility(async (req, res) => {
//     /*const response = await returnModel.find({ user_id: req.user.userid });
//     if(!response) return res.send('Nothing returned yet!');
//     res.status(200).json({ returns: response });*/

//     const return_ids = await returnModel.find({ user_id: req.user.userid }).lean();
//     if(!return_ids.length) return res.send('Nothing returned yet!');

//     const returnedProducts = [];
//     // const response = [];
//     let nullCount = 0;

//     for(let id of return_ids) {
//         let response = await productCustomizationModel.findById(id.productCustomization_id).lean();
//         if(response) {
//             const order = await orderModel.findById(response.id).lean();
//             response.product_id = order.product_id;
//             response.order_no = order.order_no;
//             returnedProducts.push(response);
//         } else nullCount++;
//     }

//     /*if(nullCount) {
//         if(nullCount < return_ids.length) throw new generateErrUtility(`Found on ${return_ids.length - nullCount} products only!`,404);
//         else throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
//     }*/
//     if(nullCount === return_ids.length) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
//     res.status(200).json({ returnedProducts: returnedProducts });
// });

