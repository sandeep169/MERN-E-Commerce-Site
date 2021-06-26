import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

const reviewSchema = mongoose.Schema({
    user_id: { type: String, required: true },              // pk
    product_id: { type: String, required: true },           // pk
    comment: { type: String, required: true, maxLength: 250 },
    // review_images: [{
        // data: Buffer,
        // contentType: String
    // }],
    review_images: [String],
    rating: { type: Number, min: 1, max: 5 },       // rating given by each user(with the review) on the this product
}, { timestamps: true } );

// userSchema.plugin(uniqueValidator);

export default mongoose.model('review',reviewSchema);

