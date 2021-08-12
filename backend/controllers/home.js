import productModel from '../models/product.js';

// import { tryCatchUtility } from '../utils/errHandling/tryCatch.js';
// import { generateErrUtility } from '../utils/errHandling/generateErr.js';

// const common = tryCatchUtility(async (req, res) => {
async function common(req, res) {
    // try {
        const response = await productModel.find().lean(); // .catch // .then(_, err => { console.log(err); });
        res.status(200).json({
            user: (req.user ? req.user.group : req.userRole) || 'guest',
            products: response.length ? response : 'No product available!'
        });
    // } catch (err) {
    //     console.log(err);
    //     // throw new generateErrUtility(err);
    // }
}

export const getAdminHomeController = common;

export const getUserHomeController = common;

export const getGuestHomeController = common;

