import { tryCatchUtility } from '../../utils/tryCatch.js';
import { generateErrUtility } from '../../utils/generateErr.js';
import productModel from '../../models/Product.js';


export const getProductsController = tryCatchUtility(async (req, res) => {
        // console.log(req.body);
        // const product = await productModel.find((x) => x._id == req.params.id);
        const product = await productModel.find();
        // console.log(product[0]._id);
        if(!product.length) throw new generateErrUtility('no product found',404);
        // res.setHeader('Content-Type', 'application/*');
        return res.status(200).json(product);
});
export const addProductController = async (req, res) => {
    // res.send(req.body);
    // console.log('body',req.body);

    try {
        const newProduct = req.body;
        const response = await productModel.create(newProduct);
        res.status(201).json(response);
    } catch(err) {
        // const err = new Error('Signup failed!..try agin later',500);
        res.status(409).json({message: err.message});
        // return next(err);
    }
};
export const updateProductController = tryCatchUtility(async (req, res) => {
    const id = req.params.pid;
    const response = await productModel.findByIdAndUpdate(id).exec();
    // console.log("response",response);
    if(!response) throw new generateErrUtility('no product found',404);
    return res.status(302).json(response);
});
export const deleteProductsController = tryCatchUtility(async (req, res) => {
    const id = req.params.pid;
    const response = await productModel.findByIdAndRemove(id).exec();
    console.log("response",response);
    // if(!response) throw new generateErrUtility('no product found',404);
    return res.status(302).json(response);
});
