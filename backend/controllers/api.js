import { verifyLoggerController, getAdminHomeController, getUserHomeController } from './login.js';

// admin fns
import { getAdminProfileController, updateAdminProfileController, deleteAdminProfileController } from './admin/profile.js';
import { getUsersController, addUserController, updateUserController, deleteUsersController } from './admin/users.js';
import { getProductsController, addProductController, updateProductController, deleteProductsController } from './admin/products.js';
// import { monthlySales, yearlySales, profit, loss, revenue, etc... } from './companyInsights.js'

// user fns
import { getUserProfileController, updateUserProfileController, deleteUserProfileController } from './user/profile.js';
import { getCartProductsController, editCartProductController, deleteCartProductsController } from './user/cart.js';
import { getProductReviewsController, addReviewToProductController, editUserReviewController, deleteUserReviewController } from './user/reviews.js';
import { getProductRatingController, addRatingToProductController, editUserRatingController, deleteUserRatingController } from './user/ratings.js';

// remaining - getAdminPanel, getOrders, getReturns, getProduct, addProductToCart

// login
export const verifyLoggerApi = verifyLoggerController;
export const getAdminHomeApi = getAdminHomeController;
export const getUserHomeApi = getUserHomeController;

// admin
export const getAdminProfileApi = getAdminProfileController;
export const updateAdminProfileApi = updateAdminProfileController;
export const deleteAdminProfileApi = deleteAdminProfileController;

export const getUsersApi = getUsersController;
export const addUserApi = addUserController;
export const updateUserApi = updateUserController;
export const deleteUsersApi = deleteUsersController;

export const getProductsApi = getProductsController;
export const addProductApi = addProductController;
export const updateProductApi = updateProductController;
export const deleteProductsApi = deleteProductsController;

// user
export const getUserProfileApi = getUserProfileController;
export const updateUserProfileApi = updateUserProfileController;
export const deleteUserProfileApi = deleteUserProfileController;

export const getCartProductsApi = getCartProductsController;
export const editCartProductApi = editCartProductController;
export const deleteCartProductsApi = deleteCartProductsController;

export const getProductReviewsApi = getProductReviewsController;
export const addReviewToProductApi = addReviewToProductController;
export const editUserReviewApi = editUserReviewController;
export const deleteUserReviewApi = deleteUserReviewController;

export const getProductRatingApi = getProductRatingController;
export const addRatingToProductApi = addRatingToProductController;
export const editUserRatingApi = editUserRatingController;
export const deleteUserRatingApi = deleteUserRatingController;

