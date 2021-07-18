import mongoose from 'mongoose';

const productCustomizationSchema = mongoose.Schema({
    id: { type: String, required: true },   // cart_id/order_id

    quantity: { type: Number, required: true },
    size: { type: String, required: true, maxLength: 2 },
    color: { type: String, required: true },

    order_status: String      // successful(after 2 months of delivery date), returned, canceled, delivered, pending,

}, { timestamps: true } );

productCustomizationSchema.index({ id: 1, quantity: 1, size: 1, color: 1 }, { unique: true });

export default mongoose.model('productCustomization',productCustomizationSchema);

