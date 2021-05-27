import productModel from '../../models/Product.js';


export const getProductsController = async (req, res) => {
    res.send('successful');    
};
export const addProductController = async (req, res) => {
    res.send(req.body);
    console.log('body',req.body);
};
export const updateProductController = async (req, res) => {};
export const deleteProductsController = async (req, res) => {};

