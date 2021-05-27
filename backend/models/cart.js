import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

const cartSchema = mongoose.Schema({
    user_id: { type: String, required: true },              // pk
    product_id: { type: String, required: true },           // pk
    // product_name: { type: String, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true, maxLength: 2 },
    color: { type: String, required: true },
    // product_gender: { type: String, required: true },
    // category: { type: String, required: true },
    // price: { type: Number, required: true },
}, { timestamps: true } );

// productSchema.plugin(uniqueValidator);

export default mongoose.model('cart',cartSchema);

