import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

const orderSchema = mongoose.Schema({
    user_id: { type: String, required: true },              // pk
    product_id: { type: String, required: true },           // pk
    order_no: { type: Number, required: true },

    /*quantity: { type: Number, required: true },
    size: { type: String, required: true, maxLength: 2 },
    color: { type: String, required: true },

    status: { type: String, required: true }      // successful(after 2 months of delivery date), returned, canceled, delivered, pending,*/
}, { timestamps: true } );

// productSchema.plugin(uniqueValidator);
orderSchema.index({ user_id: 1, product_id: 1, order_no: 1 }, { unique: true });

export default mongoose.model('order',orderSchema);

