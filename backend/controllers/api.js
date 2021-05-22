// import express from 'express';
// import userControllers from './user.js';
import { addUserController, getUserController, updateUserController, deleteUserController } from './user.js';
import { addProductsController, getProductsController, updateProductController, deleteProductController } from './Products.js';

// const app = express();
// const router = express.Router();


export const addUserApi = addUserController;
export const getUserApi = getUserController;
export const updateUserApi = updateUserController;
export const deleteUserApi = deleteUserController;


export const addProductsApi = addProductsController;
export const getProductsApi = getProductsController;
export const updateProductApi = updateProductController;
export const deleteProductApi = deleteProductController;

