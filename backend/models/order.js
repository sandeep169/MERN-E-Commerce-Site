import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

const orderSchema = mongoose.Schema({
    user_id: { type: String, required: true },              // pk
    product_id: { type: String, required: true },           // pk
    quantity: { type: Number, required: true },
    size: { type: String, required: true, maxLength: 2 },
    color: { type: String, required: true },
}, { timestamps: true } );

// productSchema.plugin(uniqueValidator);

export default mongoose.model('order',orderSchema);

