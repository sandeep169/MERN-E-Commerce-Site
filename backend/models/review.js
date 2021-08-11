import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },

    title: { type: String, maxLength: 50 },
    comment: { type: String, maxLength: 250 },
    review_images: [String],

    rating: { type: Number, min: 1, max: 5 }       // rating given by each user(with the review) on the this product

}, { timestamps: true } );

export default mongoose.model('review',reviewSchema);

