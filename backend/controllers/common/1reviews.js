import reviewModel from '../../models/review.js';
import ratingModel from '../../models/review.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getProductReviewsController = tryCatchUtility(async (req, res) => {
    const response = await reviewModel.find({ product_id: req.params.pid }).lean();
    if(!response.length) return res.send('No review on this product!');

    // let nullCount = 0;
    for(let id of response) {
        // const { rating } = await ratingModel.findOne({ user_id: id.user_id, product_id: id.product_id }, { _id: 0, rating: 1 }).lean();
        const { rating } = await ratingModel.findOne({ user_id: id.user_id, product_id: id.product_id }).lean();
        // console.log('rating',rating);
        if(rating) response.rating = rating;
    }

    res.status(200).send({ reviews: response });
});

export const addReviewToProductController = tryCatchUtility(async (req, res) => {
    // const review = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object
    const { body:newReview, files, user, params } = req;

    newReview.user_id = user.userid;
    newReview.product_id = params.pid;

    /*console.log('files',files,'\n',
        files === undefined,
        files !== undefined,
        files === 'undefined',
        files !== 'undefined','\n',
        typeof files === undefined,
        typeof files !== undefined,
        typeof files === 'undefined',
        typeof files !== 'undefined',
        '\n',params
    );*/

    // if(typeof files !== 'undefined') {    // shud give true
    // if(files !== undefined) {    // shud give true
    if(files) {    // shud give true
        newReview.review_images = [];
        files.review_images.forEach(img => newReview.review_images.push(img.path.replace(/\\/g,'/')));
    }
    // console.log(newReview);

    const response = await reviewModel.create(newReview);
    if(!response) throw new generateErrUtility('Unable to add review to this product!\nPlease try again later...',500);

    res.status(201).json({
        msg: 'Review posted!',
        review: response
    });
});

export const editUserReviewController = tryCatchUtility(async (req, res) => {
    // const updates = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object
    const { body:updates, files, params } = req;

    if(typeof files !== undefined) {
        updates.review_images = [];
        files.review_images.forEach(img => updates.review_images.push(img.path.replace(/\\/g,'/')));
    }

    const response = await reviewModel.findByIdAndUpdate(params.rid, updates, { new: true }).lean();
    if(!response) throw new generateErrUtility('Unable to edit review!\nPlease try again later...',500);

    res.status(200).json({
        msg: 'Review edited!',
        editedReview: response
    });
});

export const deleteUserReviewController = tryCatchUtility(async (req, res) => {
    const { deletedCount } = await reviewModel.deleteOne({ _id: req.params.rid }).lean();
    // console.log('response',deletedCount);
    if(!deletedCount) throw new generateErrUtility('Unable to delete review!\nPlease try again later...',404);
    res.status(200).send('Review deleted!');
});

