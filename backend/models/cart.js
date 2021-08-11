import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    product_id: { type: String, required: true }

}, { timestamps: true } );

cartSchema.index({ user_id: 1, product_id: 1 }, { unique: true });

export default mongoose.model('cart',cartSchema);

