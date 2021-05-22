import productsModel from '../models/Products.js';


export const addProductsController = async (req, res) => {
    res.send(req.body);
    console.log('body',req.body);
};
export const getProductsController = async (req, res) => {
    res.send('successful');    
};
export const updateProductController = async (req, res) => {};
export const deleteProductController = async (req, res) => {};
