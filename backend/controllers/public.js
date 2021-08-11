import productModel from '../models/product.js';
import reviewsModel from '../models/review.js';

import { tryCatchUtility } from '../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../utils/errHandling/generateErr.js';

export const getProductController = tryCatchUtility(async (req, res) => {
    const response = await productModel.findOne({ code: req.params.pcode }).lean();
    if(!response) throw new generateErrUtility('Nothing found!',404);
    res.status(200).json({ product: response });
});

export const getProductRatingController = tryCatchUtility(async (req, res) => {
    const { rating:storedRating } = await productModel.findById(req.params.pid).select('rating -_id').lean() || {};
    const { avg:computedRating } = (await reviewsModel.aggregate([
        { $match: { product_id: req.params.pid, rating: { $exists: true } } },
        { $group: { _id: null, sum_of_userRatings: { $sum: '$rating' }, maxRating: { $sum: 5 } } },
        { $project: { _id: 0, avg: { $multiply: [{ $divide: ['$sum_of_userRatings','$maxRating'] }, 5] } } }
    ]))[0] || {};

    if(!computedRating && !storedRating) return res.send('No rating given to this product yet!');
    if(!computedRating && storedRating) return res.json({ productRating: storedRating.toFixed(2) });
    res.status(200).json({
        productRating: storedRating ?
        (computedRating > storedRating ? computedRating : storedRating).toFixed(2) :
        computedRating.toFixed(2)
    });
});

