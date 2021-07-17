import productModel from '../models/product.js';
import reviewsModel from '../models/review.js';

import { tryCatchUtility } from '../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../utils/errHandling/generateErr.js';

export const getProductController = tryCatchUtility(async (req, res) => {
    // let a = req.params.pcode;
    // console.log(a, typeof a);
    // const product = await productModel.leads.find({ code: a });
    const response = await productModel.findOne({ code: req.params.pcode }).lean();
    // console.log(response);
    if(!response) throw new generateErrUtility('Nothing found!',404);
    res.status(200).json({ product: response });
});

// calculating rating in mongodb using aggregation (optimized in some ways)
export const getProductRatingController = tryCatchUtility(async (req, res) => {
    const { rating:storedRating } = await productModel.findById(req.params.pid).select('rating -_id').lean() || {};
    const { avg:computedRating } = (await reviewsModel.aggregate([
        { $match: { product_id: req.params.pid, rating: { $exists: true } } },
        { $group: { _id: null, sum_of_userRatings: { $sum: '$rating' }, maxRating: { $sum: 5 } } },
        { $project: { _id: 0, avg: { $multiply: [{ $divide: ['$sum_of_userRatings','$maxRating'] }, 5] } } }
    ]))[0] || {};
    // console.log(computedRating);

    if(!computedRating && !storedRating) return res.send('No rating given to this product yet!');
    if(!computedRating && storedRating) return res.json({ productRating: storedRating.toFixed(2) });
    res.status(200).json({
        productRating: storedRating ?
        (computedRating > storedRating ? computedRating : storedRating).toFixed(2) :
        computedRating.toFixed(2)
    });
    // res.sendStatus(200);
});

// calculating rating in server using for loop (less efficient for multiple reasons)
/*export const getProductRatingController0 = tryCatchUtility(async (req, res) => {
    const { rating:storedRating } = await productModel.findById(req.params.pid).select('rating -_id').lean() || {};
    const allRatings = await reviewsModel.find({ product_id: req.params.pid }, { rating: 1, _id: 0 }).lean();
    // const allRatings = await reviewsModel.find({ product_id: req.params.pid }, { rating: 1, _id: 0 }).countDocuments();

    // if(!allRatings.length) return res.send({ productRating: finalRating.toFixed(2) });
    // console.log('storedRating',storedRating, storedRating === undefined, typeof storedRating === 'undefined');
    // let no_of_ratings = 0;
    let maxRating = 0;
    let sum_of_userRatings = 0;
    if(allRatings.length) {
        allRatings.forEach(obj => {
            if(obj.rating !== undefined) {
                // no_of_ratings++;
                maxRating += 5;
                sum_of_userRatings += obj.rating;
                // console.log(obj.rating,sum_of_ratings);
            }
        });
    }

    if(!sum_of_userRatings && !storedRating) return res.send('No rating given to this product yet!');
    // if(!no_of_ratings && storedRating) return res.send({ productRating: storedRating+'' });     // n + '' -> converts no. to string
    if(!sum_of_userRatings && storedRating) return res.json({ productRating: storedRating.toFixed(2) });

    const computedRating = sum_of_userRatings / maxRating * 5;      // '/' has higher precedence than '*' in JS
    // if(!storedRating && sum_of_userRatings) return res.send({ productRating: computedRating.toFixed(2) });
    // if(!storedRating) return res.send({ productRating: computedRating.toFixed(2) });

    // console.log(no_of_ratings,sum_of_ratings);
    // const computedRating = (sum_of_ratings/(no_of_ratings*5)) * 5;
    // console.log(consolidatedRating);
    // const { rating:storedRating } = await productModel.findById(req.params.pid).select('rating -_id').lean();
    // const storedRating = await productModel.findById(req.params.pid).select('rating -_id').lean();
    // console.log('storedRating',storedRating);
    // const finalRating = computedRating > storedRating ? computedRating : storedRating;
    // res.status(200).send({ productRating: Number(finalRating.toFixed(2)) });    // toFixed coverts no. to string and Number converts string to no.
    // res.status(200).send({ productRating: finalRating.toFixed(2) });    // toFixed coverts no. to string and Number converts string to no.
    // res.status(200).send({ productRating: storedRating ? finalRating.toFixed(2) : computedRating.toFixed(2) });
    res.status(200).json({
        productRating: storedRating ?
            (computedRating > storedRating ? computedRating : storedRating).toFixed(2) :
            computedRating.toFixed(2)
    });
    // res.sendStatus(200);
});*/

