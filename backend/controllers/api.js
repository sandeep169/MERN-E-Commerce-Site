import { verifyLoggerController } from './login.js';

import { getAdminHomeController, getUserHomeController, getGuestHomeController } from './home.js';

// admin-panel fns
import { getAdminPanelController  } from './adminPanel/index.js';
import { getUsersController, addUserController, updateUserController, deleteUsersController } from './adminPanel/users.js';
import { getProductsController, addProductController, updateProductController, deleteProductsController } from './adminPanel/products.js';
// import { monthlySales, yearlySales, profit, loss, revenue, etc... } from './companyInsights.js'

// profile fns - admin/user
import { getProfileController, updateProfileController, deleteProfileController } from './profile/index.js';

// common fns - admin/user
import { getCartProductsController, editCartProductController, deleteCartProductController } from './common/cart.js';
import { getProductReviewsController, addReviewToProductController, editUserReviewController, deleteUserReviewController } from './common/reviews.js';
import { getProductRatingController, addRatingToProductController, editUserRatingController, deleteUserRatingController } from './common/ratings.js';
import { getProductController, addProductToCartController, getOrdersController, getReturnsController } from './common/other.js';


// login
export const verifyLoggerApi = verifyLoggerController;


// home - admin/user
// export const validateUserApi = validateUserController;
export const getAdminHomeApi = getAdminHomeController;
export const getUserHomeApi = getUserHomeController;
export const getGuestHomeApi = getGuestHomeController;



// admin-panel
export const getAdminPanelApi = getAdminPanelController;

// opts on users
export const getUsersApi = getUsersController;
export const addUserApi = addUserController;
export const updateUserApi = updateUserController;
export const deleteUsersApi = deleteUsersController;

// opts on products
export const getProductsApi = getProductsController;
export const addProductApi = addProductController;
export const updateProductApi = updateProductController;
export const deleteProductsApi = deleteProductsController;



// profile - admin/user
export const getProfileApi = getProfileController;
export const updateProfileApi = updateProfileController;
export const deleteProfileApi = deleteProfileController;



// common - admin/user
// cart
export const getCartProductsApi = getCartProductsController;
export const editCartProductApi = editCartProductController;
export const deleteCartProductApi = deleteCartProductController;

// reviews
export const getProductReviewsApi = getProductReviewsController;
export const addReviewToProductApi = addReviewToProductController;
export const editUserReviewApi = editUserReviewController;
export const deleteUserReviewApi = deleteUserReviewController;

// ratings
export const getProductRatingApi = getProductRatingController;
export const addRatingToProductApi = addRatingToProductController;
export const editUserRatingApi = editUserRatingController;
export const deleteUserRatingApi = deleteUserRatingController;

// other
export const getProductApi = getProductController;
export const addProductToCartApi = addProductToCartController;
export const getOrdersApi = getOrdersController;
export const getReturnsApi = getReturnsController;
