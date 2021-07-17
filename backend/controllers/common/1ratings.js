import userModel from '../../models/user.js';
import productModel from '../../models/product.js';     // for product rating
import reviewModel from '../../models/review.js';       // for user reviews & rating

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

// from product model
export const getProductRatingController = tryCatchUtility(async (req, res) => {
    const response = await productModel.findOne({ _id: req.params.pid });

});

// from/to review model
export const addRatingToProductController = async (req, res) => {};
export const editUserRatingController = async (req, res) => {};
export const deleteUserRatingController = async (req, res) => {};
