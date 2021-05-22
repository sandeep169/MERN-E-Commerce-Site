import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

const reviewSchema = mongoose.Schema({
    product_id: { type: String, required: true },
    user_id: { type: String, required: true },
    review: { type: String, required: true },
}, { timestamps: true } );

// userSchema.plugin(uniqueValidator);

export default mongoose.model('review',reviewSchema);

