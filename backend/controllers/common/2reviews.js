import reviewModel from '../../models/review.js';
// import ratingModel from '../../models/review.js';

import { tryCatchUtility } from '../../utils/errHandling/tryCatch.js';
import { generateErrUtility } from '../../utils/errHandling/generateErr.js';

export const getProductReviewsController = tryCatchUtility(async (req, res) => {
    const response = await reviewModel.find({ product_id: req.params.pid }).lean();
    if(!response.length) return res.send('No review on this product!');

    // let nullCount = 0;
    /*for(let id of response) {
        // const { rating } = await ratingModel.findOne({ user_id: id.user_id, product_id: id.product_id }, { _id: 0, rating: 1 }).lean();
        const { rating } = await ratingModel.findOne({ user_id: id.user_id, product_id: id.product_id }).lean();
        // console.log('rating',rating);
        if(rating) response.rating = rating;
    }*/

    res.status(200).json({ reviews: response });
});

export const addReviewToProductController = tryCatchUtility(async (req, res) => {
    // const review = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object
    const { body:newReview, files, user, params } = req;

    // chking if user has already given rating to this product bcz rating can only be given once per user
    if(newReview.rating !== undefined) {
        // const { comment:existingRating } = await reviewModel.find({ user_id: user.userid, product_id: params.pid }).lean();
        const existingReviews = await reviewModel.find({ user_id: user.userid, product_id: params.pid }, { rating: 1, _id: 0 }).lean();
        if(!existingReviews) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
        // console.log(existingReviews, typeof existingReviews); //, typeof existingRating[0], existingRating[0].rating);
        if(existingReviews.length) {
            /*const ratingExist = existingReviews.forEach(review => {
                if(review.rating !== undefined) return true; // res.sendStatus(200); //.send('Rating already given on this product!');
                // else return false;
                // return review.rating !== undefined;
            }); // console.log('2');
            console.log('ratingExist',ratingExist);
            if(ratingExist) return;*/
            const ratingExist = existingReviews.some(review => review.rating !== undefined);
            // console.log(ratingExist);
            if(ratingExist) return res.send('Rating already given on this product!');
        }
        //  console.log('3');
    } // console.log('4');

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
    }); // res.sendStatus(200);
});

export const editUserReviewController = tryCatchUtility(async (req, res) => {
    // const updates = JSON.parse(JSON.stringify(req.body));   // deep copying - it doesn't affect original object
    const { body:updates, files, user, params } = req;

    // chking if user has already given rating to this product bcz rating can only be given once per user
    if(updates.rating !== undefined) {
        const existingReviews = await reviewModel.find({ user_id: user.userid, product_id: params.pid, _id: { $nin: params.rid } }, { rating: 1, _id: 0 }).lean();
        if(!existingReviews) throw new generateErrUtility('Something went wrong!\nPlease try again later...',500);
        if(existingReviews.length) {
            /*existingReviews.forEach(review => {
                if(review.rating !== undefined) return res.send('Rating already given on this product!');
            });*/
            const ratingExist = existingReviews.some(review => review.rating !== undefined);
            if(ratingExist) return res.send('Rating already given on this product!');
        }
    }

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
    // const response = await reviewModel.deleteOne({ _id: req.params.rid }, { deletedCount: 1 }).lean();
    const { deletedCount } = await reviewModel.deleteOne({ _id: req.params.rid }).lean();
    // console.log('response',deletedCount);
    if(!deletedCount) throw new generateErrUtility('Unable to delete review!\nPlease try again later...',404);
    res.status(200).send('Review deleted!');
});

