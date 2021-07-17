import mongoose from 'mongoose';

const ratingSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },

    rating: { type: Number, required: true , min: 1, max: 5 },       // rating given by each user(with the review) on the this product
}, { timestamps: true } );

ratingSchema.createIndex({ user_id: 1, product_id: 1 }, { unique: true });

export default mongoose.model('rating',ratingSchema);

