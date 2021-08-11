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
import { getCartProductsController, addProductToCartController, editCartProductController, deleteCartProductController } from './common/cart.js';
import { getOrdersController, placeOrderController } from './common/orders.js';
import { getReturnsController, returnProductController } from './common/returns.js';
import { getProductReviewsController, addReviewToProductController, editUserReviewController, deleteUserReviewController } from './common/reviews.js';


// public fns
import { getProductController, getProductRatingController } from './public.js';



// login
export const verifyLoggerApi = verifyLoggerController;


// home - admin/user
export const getAdminHomeApi = getAdminHomeController;
export const getUserHomeApi = getUserHomeController;
export const getGuestHomeApi = getGuestHomeController;


// admin-panel
export const getAdminPanelApi = getAdminPanelController;

// opts. on users
export const getUsersApi = getUsersController;
export const addUserApi = addUserController;
export const updateUserApi = updateUserController;
export const deleteUsersApi = deleteUsersController;

// opts. on products
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
export const addProductToCartApi = addProductToCartController;
export const editCartProductApi = editCartProductController;
export const deleteCartProductApi = deleteCartProductController;

// orders
export const getOrdersApi = getOrdersController;
export const placeOrderApi = placeOrderController;

// returns
export const getReturnsApi = getReturnsController;
export const returnProductApi = returnProductController;

// reviews
export const getProductReviewsApi = getProductReviewsController;
export const addReviewToProductApi = addReviewToProductController;
export const editUserReviewApi = editUserReviewController;
export const deleteUserReviewApi = deleteUserReviewController;


// public
export const getProductApi = getProductController;
export const getProductRatingApi = getProductRatingController;

