// remainings fns:-

// import userModel from '../../models/user.js';
import productModel from '../../models/product.js';
// import cartModel from '../../models/.js';
// import orderModel from '../../models/.js';
// import returnModel from '../../models/.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';


export const getProductController = tryCatchUtility(async (req, res) => {
    // let a = req.params.pcode;
    // console.log(a, typeof a);
    // const product = await productModel.leads.find({ code: a });
    const product = await productModel.findOne({ code: req.params.pcode });
    // console.log(product);
    if(!product) throw new generateErrUtility('nothing found',404);
    res.status(200).send(product);
});

export const addProductToCartController = async (req, res) => {};

export const getOrdersController = async (req, res) => {};

export const getReturnsController = async (req, res) => {};

