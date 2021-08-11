import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    order_no: { type: Number, required: true }

}, { timestamps: true } );

orderSchema.index({ user_id: 1, product_id: 1, order_no: 1 }, { unique: true });

export default mongoose.model('order',orderSchema);

