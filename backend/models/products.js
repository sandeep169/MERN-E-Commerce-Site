import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

const productSchema = mongoose.Schema({
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_size: { type: String, required: true },
    product_image: String,
    product_gender: { type: String, required: true },
    product_category: { type: String, required: true },
    product_subCategory: String,
    product_code: String,
    product_stock: { type: Number, required: true },
    product_rating: Number,
    user_id: String, reviews_id: String,
}, { timestamps: true } );

// userSchema.plugin(uniqueValidator);

export default mongoose.model('product',productSchema);

