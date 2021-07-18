import reviewModel from '../../models/review.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getProductReviewsController = tryCatchUtility(async (req, res) => {
    const response = await reviewModel.find({ product_id: req.params.pid }).lean();
    if(!response.length) return res.send('No review on this product!');
    res.status(200).json({ reviews: response });
});

export const addReviewToProductController = tryCatchUtility(async (req, res) => {
    const newReview = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object
    const { user, params, files } = req;    // shell copying - affect original object

    // checking if user has already given rating to this product bcz rating can only be given once per user
    if(newReview.rating !== undefined) {
        const existingReviews = await reviewModel.find({ user_id: user.userid, product_id: params.pid }, { rating: 1, _id: 0 }).lean();
        if(existingReviews.length) {
            const ratingExist = existingReviews.some(review => review.rating !== undefined);
            if(ratingExist) return res.send('Rating already given on this product!');
        }
    }

    newReview.user_id = user.userid;
    newReview.product_id = params.pid;

    // checking if images also sent with review, then adding them into review body
    if(files) {
        newReview.review_images = [];
        files.review_images.forEach(img => newReview.review_images.push(img.path.replace(/\\/g,'/')));
    }

    const response = await reviewModel.create(newReview);
    if(!response) throw new generateErrUtility('Unable to add review to this product!\nPlease try again later...',500);

    res.status(201).json({
        msg: 'Review posted!',
        review: response
    });
});

export const editUserReviewController = tryCatchUtility(async (req, res) => {
    const { body:updates, files, user, params } = req;

    // checking if user has already given rating to this product bcz rating can only be given once per user
    if(updates.rating !== undefined) {
        const existingReviews = await reviewModel.find({ user_id: user.userid, product_id: updates.product_id, _id: { $nin: params.rid } }, { rating: 1, _id: 0 }).lean();
        if(existingReviews.length) {
            const ratingExist = existingReviews.some(review => review.rating !== undefined);
            if(ratingExist) return res.send('Rating already given on this product!');
        }
    }

    delete updates.product_id;      // product_id was sent just to get the existing reviews of current user on this product

    // checking if images also sent with review, then adding them into review body
    if(files) {
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
    if(!deletedCount) throw new generateErrUtility('Unable to delete review!\nPlease try again later...',404);
    res.status(200).send('Review deleted!');
});

